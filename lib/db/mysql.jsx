import mysql from 'mysql2/promise'

export const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export function fixDates(rows) {
    if (Array.isArray(rows)) {
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const keys = Object.keys(row);
            keys.forEach(key => {
                const value = row[key];
                if (value instanceof Date) {
                    rows[i][key] = value.toLocaleDateString("en-US");
                }
            });
        }
    }
    return rows;
}

export async function _query({ query, values }) {
    try {
        const [rows, fields] = await (await connection).query(query, values);
        return { rows, fields };
    } catch (error) {
        return { error };
    }
}

export async function _execute(query) {
    try {
        const [rows, fields] = await (await connection).execute(query);
        return { rows, fields };
    } catch (error) {
        return { error };
    }
}
