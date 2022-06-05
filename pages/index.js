
export default function Home({ movies }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    setMovie(movies);
  }, [movies]);

  console.log(movie);
  return <div>HI</div>;
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