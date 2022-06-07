// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../lib/mongodb"

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("myFirstDatabase");

    if (req.method === 'POST') {
        try {
            console.log(req.body)
            // console.log(req.params)
            const bodyObject = JSON.parse(req.body);

            const movie = await db.collection("movies").findOne(bodyObject)
            console.log(movie)

            if (movie == undefined || movie == null || movie == {}) {
                res.json({ ok: false })
            } else {
                res.json({ ok: true, movie })
            }
        } catch (error) {
            console.log(error)
        }
    }
}