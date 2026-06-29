

import MovieCard from "./MovieCard";


interface Movie {
    title: string
    id: number
    poster_path: string
    vote_average: number
}


interface Props {
    title: string
    movies: Movie[]
}

export default function MovieRow({ title, movies }: Props) {

    return (
        <section className="mb-10">
            <h2 className="text-white text-xl font-semibold mb-4 px-6">{title}</h2>
            <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide">
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        poster_path={movie.poster_path}
                        rating={movie.vote_average}
                    />
                ))}
            </div>
        </section>
    )

}

