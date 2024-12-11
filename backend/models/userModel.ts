import bcrypt from "bcryptjs";
import pool from "./db.ts";
import AuthController from "../controllers/authController.js";
import ErrorMiddleware from "../middlewares/errorMiddleware.js";

export default class UserModel {

    static async findOneByEmail(email: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT * FROM Users WHERE email = $1', [email])
            return rows[0]
        } finally {
            client.release()
        }
    }
    static async getRandomUsers(limit: number, user_id: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT * FROM Users WHERE id != $1 ORDER BY RANDOM() LIMIT $2', [user_id, limit])
            return rows
        } finally {
            client.release()
        }
    }

    static async getAllUsers() {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT * FROM Users')
            return rows
        } finally {
            client.release()
        }
    }

    static async getMatchingUsersForUser(userId: string, filteredUserIds: string[], gender: string, interestedIn: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query(`
            SELECT * FROM Users
            WHERE
                id != $1
                AND id NOT IN (SELECT unnest($2::int[]))
                AND first_name IS NOT NULL
                AND (
                    interested_in = 'both'
                    OR interested_in = $3
                )
                AND (
                    $4 = 'both'
                    OR gender = $4
                )
            `, [userId, filteredUserIds, gender, interestedIn]);
            return rows
        } finally {
            client.release()
        }
    }

    static async findOneByUsername(username: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT * FROM Users WHERE username = $1', [username])
            return rows[0]
        } finally {
            client.release()
        }
    }

    static async findById(id: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT * FROM Users WHERE id = $1', [id])
            return rows[0]
        } finally {
            client.release()
        }
    }

    static async create(email: string, username: string, password: string) {
        const client = await pool.connect()
        try {
            const passwordEncrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            const verify_email = false
            const code_password_reset = null
            const {rows} = await client.query('INSERT INTO Users(email, username, password, verify_email, code_password_reset) VALUES($1, $2, $3, $4, $5) RETURNING *', [email, username, passwordEncrypted, verify_email, code_password_reset])
            return rows[0]
        } finally {
            client.release()
        }
    }

    static async validate_email(email: string) {
        const client = await pool.connect()
        try {
            await client.query('UPDATE Users SET verify_email = true WHERE email = $1', [email])
        } finally {
            client.release()
        }
    }

    static async updatePasswordCode(email: string, code: string) {
        const client = await pool.connect()
        try {
            await client.query('UPDATE Users SET code_password_reset = $1 WHERE email = $2', [code, email])
        } finally {
            client.release()
        }
    }

    static async updatePassword(id: string, password: string) {
        const client = await pool.connect()
        try {
            const passwordEncrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            await client.query('UPDATE Users SET password = $1 WHERE id = $2', [passwordEncrypted, id])
        } finally {
            client.release()
        }
    }

    static async login(username: string, password: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT * FROM Users WHERE username = $1', [username])
            const user = rows[0]
            if (!user) throw new ErrorMiddleware(404, "Auth not found")
            if (!bcrypt.compareSync(password, user.password)) throw new ErrorMiddleware(401, "Invalid password")
            return user
        } finally {
            client.release()
        }
    }

    static async updateEmail(userId: string, email: string) {
        const client = await pool.connect()
        try {
            if (!email) throw new ErrorMiddleware(400, "Email is required")
            const userExist = await UserModel.findOneByEmail(email)
            if (userExist) throw new ErrorMiddleware(400, "Email already in use")
            await client.query('UPDATE Users SET email = $1, verify_email = false WHERE id = $2', [email, userId])
            await AuthController.sendEmailLink(email)
        } finally {
            client.release()
        }
    }

    static async updateUsername(userId: string, username: string) {
        const client = await pool.connect()
        try {
            if (!username) throw new ErrorMiddleware(400, "Username is required")
            const userExist = await UserModel.findOneByUsername(username)
            if (userExist) throw new ErrorMiddleware(400, "Username already in use")
            await client.query('UPDATE Users SET username = $1 WHERE id = $2', [username, userId])
        } finally {
            client.release()
        }
    }

    static async updatePictures(userId: string, pictures: string[] | null) {
        const client = await pool.connect()
        try {
            await client.query('UPDATE Users SET pictures = $1 WHERE id = $2', [pictures, userId])
        } finally {
            client.release()
        }
    }

    static async getPictures(userId: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT pictures FROM Users WHERE id = $1', [userId])
            return rows[0].pictures
        } finally {
            client.release()
        }
    }

    static async updateProfileOrPreferences(userId: string, profile_or_preference: Profile | Preferences) {
        const client = await pool.connect()
        try {
            const setClauses: string[] = [];
            const values: any[] = [];

            Object.entries(profile_or_preference).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    setClauses.push(`${key} = $${setClauses.length + 1}`);
                    values.push(value);
                }
            })
            if (setClauses.length === 0) return;

            const query = `UPDATE Users SET ${setClauses.join(', ')} WHERE id = $${values.length + 1}`;
            values.push(userId);
            await client.query(query, values);
        } finally {
            client.release()
        }
    }

    static async setStatusConnection(userId: string, online: boolean) {
        const client = await pool.connect()
        try {
            if (online)
                await client.query('UPDATE Users SET is_online = $1, last_connection = NOW() WHERE id = $2', [online, userId])
            else
            {
                await client.query('UPDATE Users SET is_online = $1, last_connection = NOW() WHERE id = $2', [online, userId])
            }
        } finally {
            client.release()
        }
    }

    static async createFakeUser(user: User) {
        const client = await pool.connect()
        try {
            const query = `INSERT INTO Users(${Object.keys(user).join(', ')}) VALUES(${Object.keys(user).map((_, i) => `$${i + 1}`).join(', ')})`
            await client.query(query, Object.values(user))
        } finally {
            client.release()
        }
    }
}
