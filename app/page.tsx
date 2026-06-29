import MovieRow from "../components/MovieRow"

const TOKEN = process.env.TOKEN
const BASE = "https://api.themoviedb.org/3"

async function fetchMovies(endpoint: string) {
  const res = await fetch(`${BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      accept: "application/json",
    },
    next: { revalidate: 3600 },
  })
  const data = await res.json()
  return data.results
}

export default async function Home() {
  const [trending, popular, topRated, action] = await Promise.all([
    fetchMovies("/trending/movie/day?language=es-ES"),
    fetchMovies("/movie/popular?language=es-ES"),
    fetchMovies("/movie/top_rated?language=es-ES"),
    fetchMovies("/discover/movie?with_genres=28&language=es-ES"),
  ])

  return (
    <main className="min-h-screen bg-zinc-950 py-10">
      <h1 className="text-white text-4xl font-bold px-6 mb-10">🎬 CineShelf</h1>
      <MovieRow title="🔥 Tendencias hoy" movies={trending} />
      <MovieRow title="📈 Populares" movies={popular} />
      <MovieRow title="⭐ Mejor Valoradas" movies={topRated} />
      <MovieRow title="💥 Acción" movies={action} />
    </main>
  )
}