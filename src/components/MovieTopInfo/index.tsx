import { MovieProps } from '..';
import './index.scss';

export const MovieTopInfo = ({ movie }: MovieProps) => {
    let raitingSting = movie.tmdbRating.toString();
    let genresSting = '';
    let raitingStyle = 'red';

    const runtimeHours = (movie.runtime / 60).toString().slice(0, 1);
    const runtimeMinutes = (movie.runtime - Number(runtimeHours) * 60);
    
    genresSting = movie.genres[0]

    if (movie.tmdbRating >= 8) {
        raitingStyle = 'gold'
    }

    if (movie.tmdbRating >= 6.5 && movie.tmdbRating < 8) {
        raitingStyle = 'green'
    }

    if (movie.tmdbRating >= 5 && movie.tmdbRating < 6.5) {
        raitingStyle = 'grey'
    }
    
    if (raitingSting.length < 3) {
        raitingSting = raitingSting + '.0'
    } else {
        raitingSting = raitingSting.slice(0, 3)
    }
    
    return (
        <ul className="about-movie__card__left__top" >
            <li className={`about-movie__card__left__top__item raiting ${raitingStyle}`}>
                <svg className="raiting-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z" fill="white" />
                </svg>
                {raitingSting}</li>
            <li className="about-movie__card__left__top__item date">{movie.releaseYear}</li>
            <li className="about-movie__card__left__top__item genre">{genresSting}</li>
            <li className="about-movie__card__left__top__item runtime">{`${runtimeHours} ч ${runtimeMinutes} мин`}</li>
        </ul >
    )
}