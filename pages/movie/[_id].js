import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// import clientPromise from "../../lib/mongodb"

const Id = () => {
    const [movieOne, setMovieOne] = useState()
    const router = useRouter()
    console.log(router.query)
    const { _id } = router.query
    console.log(_id)



    useEffect(() => {
        async function getMovie(id) {
            console.log(`we get id in getMovie!!!`)
            console.log(id)
            const res = await fetch("/api/hello", {
                method: "POST",
                body: JSON.stringify({
                    _id: id
                }),
            })

            const data = await res.json();
            console.log(data)

            const { ok, movie } = data

            if (ok === true) {
                setMovieOne(movie)
            }
        }


        getMovie(_id)
    })

    return (
        <div>
            <h1>bla</h1>
            {movieOne ? (<div>
                {movieOne.title}
            </div>) : (
                <div>
                    loading
                </div>
            )}
        </div>
    )
}

export default Id;

// export async function getServerSideProps(context) {
//     const client = await clientPromise;

//     const db = client.db("myFirstDatabase");

//     let movie = await db.collection("movies").findOne({ _id: id }).toArray();
//     movie = JSON.parse(JSON.stringify(movie));

//     return {
//         props: { movie },
//     };
// }