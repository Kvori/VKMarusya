import { useNavigate, useParams } from 'react-router-dom'
import './index.scss'
import { getMovieListGenre } from '../../api/movieGets';
import { ErrorPage } from '../ErrorPage';
import { MovieListView } from '../../components/MovieListView';
import { useEffect, useState } from 'react';
import { Button } from '../../components';

export const GenrePage = () => {
    const { genreName } = useParams();
    if (!genreName) return <ErrorPage />

    const title = genreName.toLocaleUpperCase().slice(0, 1) + genreName.toLocaleLowerCase().slice(1)

    const navigate = useNavigate()
    const handleBtnBack = () => {
        navigate('/genres')
    }

    const [fetching, setFetching] = useState(true)
    const [movieList, setMovieList] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [moreBtnFlag, setMoreBtnFlag] = useState(false)

    const handleBtnAdd = () => setFetching(true)

    useEffect(() => {
        if (fetching) {
            getMovieListGenre(genreName, pageCount)
                .then(response => {
                    setMovieList([...movieList, ...response])
                    setPageCount(prevState => prevState + 1)
                    response.length > 9 ? setMoreBtnFlag(true) : setMoreBtnFlag(false)
                })
                .finally(() => setFetching(false))
        }
    }, [fetching])

    return (
        <section className='genre' >
            <div className="container">
                <h1 className='genre__title title-offset'>
                    <button className='genre__title__btn-back' onClick={handleBtnBack}>
                        <svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.04701 11.0012L13.2967 19.2507L10.9397 21.6077L0.333008 11.0012L10.9397 0.394531L13.2967 2.75155L5.04701 11.0012Z" fill="white" />
                        </svg>
                    </button>
                    {title}</h1>
                <MovieListView movieList={movieList} isPending={fetching} />
                {moreBtnFlag &&
                    <div className="genre__btn-add-box">
                        <Button className='genre__btn-add primary-btn' onClick={handleBtnAdd} isLoading={fetching}>Показать ещё</Button>
                    </div>}
            </div>
        </section>
    )

}