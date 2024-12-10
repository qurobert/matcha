// @ts-ignore
import pool from "./db.ts";
import type {NotificationType} from "../types/enumNotificationType.ts";
import {io} from "../index.ts";

export default class NotificationModel {
	static async getNotifications(user_id: string) {
		const queryText = `SELECT * FROM notifications WHERE user_id = $1 AND target_user_id NOT IN (
        SELECT target_user_id
        FROM user_actions
        WHERE user_id = $1
          AND action_type = 'block'
    );`
		return await NotificationModel.executeQuery(queryText, [user_id])
	}

	static async createNotification(user_id: string, target_user_id: string, notification_type: NotificationType) {
		const queryTextIsBlock = `SELECT * FROM user_actions WHERE user_id = $1 AND target_user_id = $2 AND action_type = 'block';`
		const isBlock = await NotificationModel.executeQuery(queryTextIsBlock, [user_id, target_user_id])
		if (isBlock.length > 0) return;
		const queryText = `INSERT INTO Notifications (user_id, target_user_id, notification_type)
            VALUES ($1, $2, $3) RETURNING *;`
		const res =  await NotificationModel.executeQuery(queryText, [user_id, target_user_id, notification_type])
		io.emit(`notification_${user_id}`, {user_id, notification_type})
		return res;
	}

	static async markAllAsRead(user_id: string) {
		const queryText = `UPDATE Notifications
            SET is_read = TRUE
            WHERE user_id = $1 AND is_read = FALSE;`
		return await NotificationModel.executeQuery(queryText, [user_id])
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