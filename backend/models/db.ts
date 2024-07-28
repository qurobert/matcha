import {Pool} from 'pg';

const pool = new Pool({
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD || 'root',
		host: 'postgres',
		port: 5432,
		database: process.env.DB_NAME || 'mydatabase'
})

export default pool;