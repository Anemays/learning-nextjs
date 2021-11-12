import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'Production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;

/*
The production check is done because in development,
npm run dev clears the Node.js cache at runtime,
and this causes a new PrismaClient initialization each
time due to hot reloading, so we’d not solve the problem.
*/
