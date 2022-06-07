import clientPromise from "../lib/mongodb";
import { useState, useEffect } from 'react'
import Link from "next/link";


export default function Home({ movies }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    setMovie(movies);
  }, [movies]);

  console.log(movie);
  return <>{movie ? (<div>
    {movie.map(m => {
      return (
        <Link href={`/movie/${m._id}`} key={m._id}>{m.title}</Link>
      )
    })}
  </div>) : (<div>Loading</div>)}</>;
}

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = client.db("myFirstDatabase");

  let movies = await db.collection("movies").find({}).toArray();
  movies = JSON.parse(JSON.stringify(movies));

  return {
    props: { movies },
  };
}