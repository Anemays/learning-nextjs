import prisma from '../../lib/db/prisma';

async function handler(req, res) {
    if (req.method === "GET") {
        const data = await prisma.post.findMany();
        console.log(data)

        if (data) {
            return res.status(201).json(data);
        }

        return res.status(403).send("");
    }
    return res.status(404).send("");

}

export default handler;
