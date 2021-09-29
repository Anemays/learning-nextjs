import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handler(req, res) {
    if (req.method === "POST") {
        const { title, excerpt } = req.body;

        const createPost = await prisma.post.create({
            data: {
                title,
                excerpt,
            },
        })

        if (createPost) {
            return res.status(201).send("");
        }

        return res.status(403).send("");
    }
    return res.status(404).send("");

}

export default handler;
