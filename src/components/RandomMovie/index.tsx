import { useQuery } from "@tanstack/react-query";
import { getRandomMovie } from "../../api/movieGets";
import { queryClient } from "../../api/queryClient";
import "./index.scss";
import { ErrorPage } from "../../pages/ErrorPage";
import { AboutMovie, Loader } from "..";


export const RandomMovie = () => {
    const randomMovie = useQuery({
        queryFn: () => getRandomMovie(),
        queryKey: ["random-movie"],
    }, queryClient)

    switch (randomMovie.status) {
        case "pending":
            return <Loader />

        case "error":
            return <ErrorPage />

        case "success":
            return <AboutMovie movie={randomMovie.data} mainPageStatus={true} />
    }
}
