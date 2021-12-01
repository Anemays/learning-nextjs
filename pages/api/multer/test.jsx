

async function handler(req, res) {
    if (req.method === "POST") {
        //const { file } = req.body;
        console.log(req.body)

        if (true) {
            return res.status(201).json(req.body);
        }

        return res.status(403).send("");
    }
    return res.status(404).send("");

}

export default handler;
