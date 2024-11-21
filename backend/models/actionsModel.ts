import type {ActionType} from "../types/enumActionType.ts";
import pool from "./db.ts";
import {generateId} from "../helpers/generateId.ts";

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

	static async getMatches(user_id: string) {
		const queryText = `SELECT i1.target_user_id AS matched_user_id
			 FROM useractions AS i1
								JOIN useractions AS i2
										 ON i1.user_id = i2.target_user_id
												 AND i1.target_user_id = i2.user_id
			 WHERE i1.user_id = $1
				 AND i1.action_type = 'like'
				 AND i2.action_type = 'like';
		`
		const matches = await ActionsModel.executeQuery(queryText, [user_id])
		return matches.map((match: {matched_user_id: number}) => {
			return {
				id: generateId(),
				user_id,
				target_user_id: match.matched_user_id,
				action_type: "match",
			}
		})
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