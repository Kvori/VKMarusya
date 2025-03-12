import { FC, useEffect, useState } from "react"
import { MovieList } from "../../api/movieGets"
import { Link } from "react-router-dom";
import './index.scss'
import { useMutation } from "@tanstack/react-query";
import { deleteMovieToFavorite, queryClient } from "../../api";
import { LoaderMovieList } from "./loader";

interface MovieListView {
    movieList: MovieList,
    DeleteFlag?: boolean,
    isPending?: boolean,
    numberingFlag?: boolean
}

export const MovieListView: FC<MovieListView> = ({ movieList, DeleteFlag = false, isPending = false, numberingFlag = false }) => {
    const [movieId, setMovieId] = useState()

    const deleteMovieMutation = useMutation({
        mutationFn: () => deleteMovieToFavorite(movieId),
        mutationKey: ["favorites", `${movieId}`],
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["favorites"] })
        }
    }, queryClient)

    useEffect(() => {
        movieId && deleteMovieMutation.mutate()
    }, [movieId])

    return (
        <ul className='movie-list'>
            {movieList.map((movie, index) => {
                let handleBtnDeleteMovie;
                DeleteFlag && (handleBtnDeleteMovie = () => setMovieId(movie.id))

                return (
                    <li key={movie.id} className={`movie-list__item${DeleteFlag ? ' favorites-style' : ''}`}>
                        {DeleteFlag && <button onClick={handleBtnDeleteMovie} className="movie-list__item__btn-delete">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.99873 5.5865L11.9485 0.636719L13.3627 2.05093L8.41293 7.0007L13.3627 11.9504L11.9485 13.3646L6.99873 8.4149L2.04899 13.3646L0.634766 11.9504L5.58453 7.0007L0.634766 2.05093L2.04899 0.636719L6.99873 5.5865Z" fill="black" />
                            </svg>
                        </button>}
                        <Link to={`/movie/${movie.id}`} >
                            <div className="movie-list__item__img-container">
                                {numberingFlag && <span className="movie-list__item__position">{index + 1}</span>}
                                <img className='movie-list__item__img-container__img' src={movie.posterUrl ? movie.posterUrl : '/no-image.jpg'} alt="" />
                            </div>
                        </Link>
                    </li>
                )
            })}
            {isPending && <LoaderMovieList />}
        </ul>
    )
} 