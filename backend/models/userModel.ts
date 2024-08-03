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
            console.log(email, username, passwordEncrypted, verify_email, code_password_reset);
            console.log("create");
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

    static async updatePassword(email: string, password: string) {
        const client = await pool.connect()
        try {
            const passwordEncrypted = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
            await client.query('UPDATE Users SET password = $1 WHERE email = $2', [passwordEncrypted, email])
        } finally {
            client.release()
        }
    }

    static async login(email: string, password: string) {
        const client = await pool.connect()
        try {
            const {rows} = await client.query('SELECT * FROM Users WHERE email = $1', [email])
            const user = rows[0]
            if (!user) throw new ErrorMiddleware(404, "User not found")
            if (!bcrypt.compareSync(password, user.password)) throw new ErrorMiddleware(401, "Invalid password")
            if (!user.verify_email) throw new ErrorMiddleware(401, "Email not verified")
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

    static async updateNotification(userId: string, notification: string) {
        const client = await pool.connect()
        try {
            if (notification === undefined) return
            await client.query('UPDATE Users SET notification = $1 WHERE id = $2', [notification, userId])
        } finally {
            client.release()
        }
    }
}
