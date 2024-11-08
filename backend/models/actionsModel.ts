import type {ActionType} from "../types/enumActionType.ts";
import pool from "./db.ts";

export default class ActionsModel {

	static async createInteraction(user_id: string, target_user_id: string, action_type: ActionType) {
		const queryText = `
			INSERT INTO useractions (user_id, target_user_id, action_type)
			VALUES ($1, $2, $3)
			ON CONFLICT (user_id, target_user_id, action_type)
			DO NOTHING;`
		await ActionsModel.executeQuery(queryText, [user_id, target_user_id, action_type])
	}

	static async deleteInteractionIfExist(user_id: string, target_user_id: string, action_type: ActionType) {
		const queryText = `
			DELETE FROM useractions
			WHERE user_id = $1
				AND target_user_id = $2
				AND action_type = $3;`
		await ActionsModel.executeQuery(queryText, [user_id, target_user_id, action_type])
	}

	static async getInteractions(user_id: string) {
		const queryText = `
					SELECT * FROM useractions
					WHERE user_id = $1
					OR target_user_id = $1;
			`;
		return await ActionsModel.executeQuery(queryText, [user_id])
	}

	static async getTargetInteraction(user_id: string, target_user_id: string) {
		const queryText = `SELECT * FROM useractions
            WHERE (user_id = $1 AND target_user_id = $2)
            OR (user_id = $2 AND target_user_id = $1);`
		return await ActionsModel.executeQuery(queryText, [user_id, target_user_id])
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