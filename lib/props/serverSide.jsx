import fs from 'fs';
import { checkENV } from '../config/env';
import prisma from '../db/prisma';

export function getSSP() {
    const fun = async ({ }) => {
        await prisma.$disconnect();
        return {
            props: {

            }
        };
    }

    checkENV(fs);

    return fun;
}
