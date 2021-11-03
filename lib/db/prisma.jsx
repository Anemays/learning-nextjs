import { PrismaClient } from '@prisma/client';
import fs from 'fs';

let prisma;

// If .env does not exist, copy .sample-env
if (!fs.existsSync('.env')) {
    var rs = fs.createReadStream('.sample-env');
    rs.on("error", function (err, fd) {
        console.log("createReadStream - Error - Can't read from .sample-env file, please create a sample env file with the name '.sample-env'")
    })
        .pipe(fs.createWriteStream('.env', { flags: "wx" }))
        .on("error", function (err, fd) {
            console.log("createWriteStream - Error - %s", err.code);
        })
        .on("finish", function () {
            console.log(".ENV file copied from sample");
        })
}

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
