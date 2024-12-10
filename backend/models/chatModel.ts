import pool from "./db.ts";

export default class ChatModel {
	static async createMessage(user_id: string, target_user_id: string, message: string) {
		const queryText = `
			INSERT INTO user_messages (user_id, target_user_id, message)
			VALUES ($1, $2, $3);`
		await ChatModel.executeQuery(queryText, [user_id, target_user_id, message]);
	}

	static async getMessages(user_id: string, target_user_id: string,) {
		const queryText = `
			SELECT * FROM user_messages
			WHERE user_id = $1
			AND target_user_id = $2
			OR user_id = $2
			AND target_user_id = $1
			;`
		return await ChatModel.executeQuery(queryText, [user_id, target_user_id]);
	}

	static async executeQuery(queryText: string, values?: string[]) {
		const client = await pool.connect();
		try {
			const result = await client.query(queryText, values);
			return result.rows;
		} finally {
			client.release();
		}
	}
}
