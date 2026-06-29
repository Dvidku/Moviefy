const TOKEN = process.env.TOKEN
const BASE = process.env.BASE

interface paramProps {
    params: {
        titulo: string
    }
}

async function fetchMovie(titulo: string) {
    // 1. Usamos el endpoint de búsqueda y codificamos el título por si tiene espacios
    const res = await fetch(`${BASE}/search/movie?query=${encodeURIComponent(titulo)}&language=es-ES`, {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
            accept: "application/json",
        },
    });

    // 2. CORRECCIÓN: Agregamos await y los paréntesis ()
    const data = await res.json(); 
    
    // 3. Retornamos la primera película de la lista de resultados
    return data.results ? data.results[0] : null;
}

export default async function DetallePelicula({ params }: paramProps) {
    const { titulo } = params

    const apiMovie = await fetchMovie(titulo);

    if (!apiMovie) {
        return (
            <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                <h1 className="text-3xl font-bold">Película no encontrada</h1>
            </main>
        );
    }

    const movie = {
        title: apiMovie.title,
        // Extraemos solo el año de la fecha (ej: "2014-11-05" -> "2014")
        release_date: apiMovie.release_date ? apiMovie.release_date.split("-")[0] : "N/A", 
        genres: ["Acción", "Drama"], // (TMDB search devuelve IDs, no los nombres directamente)
        rating: apiMovie.vote_average || 0,
        overview: apiMovie.overview || "No hay sinopsis disponible.",
        // Concatenamos la base de TMDB con la ruta de la imagen
        backdrop_url: `https://image.tmdb.org/t/p/original${apiMovie.backdrop_path}`, 
        poster_url: `https://image.tmdb.org/t/p/w500${apiMovie.poster_path}`,
        duration: "N/A" // El endpoint de búsqueda no devuelve la duración
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white relative pb-12">

            {/* SECCIÓN 1: Fondo gigante difuminado */}
            <div className="absolute top-0 left-0 w-full h-[50vh] overflow-hidden z-0">
                <img
                    src={movie.backdrop_url}
                    alt=""
                    className="w-full h-full object-cover opacity-20 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            </div>

            {/* SECCIÓN 2: Contenedor de Información */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 flex flex-col md:flex-row gap-8 items-start">

                {/* Columna Izquierda: El Póster Nítido */}
                <div className="w-full md:w-64 flex-shrink-0 shadow-2xl rounded-xl overflow-hidden border border-zinc-800">
                    <img
                        src={movie.poster_url}
                        alt={movie.title}
                        className="w-full h-auto object-cover"
                    />
                </div>

                {/* Columna Derecha: Los Textos */}
                <div className="flex-1">
                    {/* Título y Año */}
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        {movie.title} <span className="text-zinc-500 font-normal">({movie.release_date})</span>
                    </h1>

                    {/* Metadata: Duración, Puntuación y Géneros */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-zinc-400">
                        <span className="bg-zinc-800 text-yellow-400 font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                            ⭐ {movie.rating.toFixed(1)}
                        </span>
                        <span>•</span>
                        <span>{movie.duration}</span>
                        <span>•</span>
                        <div className="flex gap-2">
                            {movie.genres.map((genre) => (
                                <span key={genre} className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded-full text-xs">
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sinopsis */}
                    <div className="mt-8">
                        <h2 className="text-xl font-bold text-zinc-200 mb-3">Sinopsis</h2>
                        <p className="text-zinc-400 leading-relaxed max-w-3xl text-base md:text-lg">
                            {movie.overview}
                        </p>
                    </div>

                    {/* Botones de Acción */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-zinc-950 font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2 shadow-lg shadow-yellow-400/10">
                            ▶️ Reproducir Tráiler
                        </button>
                        <button className="bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-6 py-3 rounded-lg transition-colors border border-zinc-700">
                            ❤️ Añadir a Favoritos
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}