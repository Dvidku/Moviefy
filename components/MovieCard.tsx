

interface Props {
    key :number
    title: string
    poster_path: string | null
    rating: number
}

export default function MovieCard({ title, poster_path: img, rating }: Props) {

    const img_url = img
        ? `https://image.tmdb.org/t/p/w300${img}`
        : "/no-poster.png"


    return (

        <div className="flex-shrink-0 w-40 cursor-pointer group">
            <div className="relative overflow-hidden rounded-lg">
                <img src={img_url}
                    alt="title"
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">
                    ⭐ {rating.toFixed(1)}
                </div>
            </div>
            <p className="mt-2 text-sm text-white truncate">{title}</p>
        </div>
    )
}