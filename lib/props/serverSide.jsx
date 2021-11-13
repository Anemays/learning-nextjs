import fs from 'fs';
import { checkENV } from '../config/env';
import prisma from '../db/prisma';
import { connection, _query, _execute, fixDates } from '../db/mysql';

export function getSSP() {
    const fun = async ({ }) => {
        let { rows, fields, error } = await _execute('SHOW TABLES');
        rows = fixDates(rows);

        await prisma.$disconnect();
        return {
            props: {
                rows
            }
        };
    }

    checkENV(fs);

    return fun;
}
