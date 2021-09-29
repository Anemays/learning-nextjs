import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function handler(req, res) {
    if (req.method === "POST") {
        const { id } = req.body;
        
        const deletePost = await prisma.post.delete({
            where: {
                id,
            },
        })

        if (deletePost) {
            return res.status(201).send("");
        }

        return res.status(403).send("");
    }
    return res.status(404).send("");

}

export default handler;
