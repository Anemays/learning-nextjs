import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handler(req, res) {
    if (req.method === "POST") {
        const { id, title, excerpt } = req.body;

        const updatePost = await prisma.post.update({
            where: {
                id,
            },
            data: {
                title,
                excerpt,
            },
        })

        if (updatePost) {
            return res.status(201).send("");
        }

        return res.status(403).send("");
    }
    return res.status(404).send("");

}

export default handler;
