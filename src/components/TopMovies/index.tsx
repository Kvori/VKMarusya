import { useQuery } from "@tanstack/react-query"
import { getTopMovies } from "../../api/movieGets"
import { queryClient } from "../../api/queryClient"
import "./index.scss"
import { MovieListView } from ".."

export const TopMovies = () => {
    const topMovies = useQuery({
        queryFn: () => getTopMovies(),
        queryKey: ["top-movie"]
    }, queryClient)

    switch (topMovies.status) {
        case "pending":
            return;

        case "error":
            return;

        case "success":
            return (
                <section className="top-movies">
                    <div className="container">
                        <h2 className="top-movies__title">Топ 10 фильмов</h2>
                        <MovieListView movieList={topMovies.data} numberingFlag={true} />
                    </div>
                </section>
            )
    }
}