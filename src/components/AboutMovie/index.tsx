import './index.scss'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Movie, queryClient } from '../../api';
import { Button, MovieTopInfo, Trailer, LikeButton } from '..';

export interface MovieProps {
    movie: Movie,
    mainPageStatus?: boolean
}

export const AboutMovie = ({ movie, mainPageStatus = false }: MovieProps) => {
    const navigate = useNavigate()

    const handleAboutFilmBtn = () => {
        navigate(`/movie/${movie.id}`)
    }

    const handleBtnUpdateMovie = () => {
        queryClient.invalidateQueries({ queryKey: ["random-movie"] })
    }

    const [trailerModalState, setTrailerModalState] = useState(false)
    const handleBtnTrailerOpen = () => {
        setTrailerModalState(true)
    }
    const movieLink = movie.trailerUrl.split("watch?v=")[1]

    return (
        <section className="about-movie">
            <Trailer trailerModalState={trailerModalState} setTrailerModalState={setTrailerModalState} movieLink={movieLink} />
            <div className="container">
                <div className="about-movie__card">
                    <div className="about-movie__card__left">
                        <MovieTopInfo movie={movie} />
                        <h2 className="about-movie__card__left__title">{movie.title}</h2>
                        <p className="about-movie__card__left__plot">{movie.plot}</p>
                        <div className={`about-movie__card__left__btns card-btns ${mainPageStatus ? 'main-page-style-card-btns' : ''}`}>
                            <Button children={'Трейлер'} className={"card-btns__item size-style-high primary-btn"} onClick={handleBtnTrailerOpen} />
                            <div className={`secondary-btn-box ${mainPageStatus ? 'main-page-style-secondary-btn-box' : ''}`}>
                                {mainPageStatus && <Button children={"О фильме"} className={"card-btns__item size-style-high secondary-btn about-btn"} onClick={handleAboutFilmBtn} />}
                                <LikeButton movieId={movie.id} />
                                {mainPageStatus && <button className="card-btns__item size-style-small secondary-btn btn-refresh" onClick={handleBtnUpdateMovie}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z" fill="white" />
                                    </svg>
                                </button>}
                            </div>
                        </div>
                    </div>
                    <img src={movie.posterUrl ? movie.posterUrl : '/no-image.jpg'} alt="" className="about-movie__card__poster" />
                </div>
            </div>
        </section>
    )
}