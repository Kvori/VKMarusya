import './index.scss'
import { MovieTopInfo } from '../MovieTopInfo';
import { MovieList } from '../../api/movieGets';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface DropdownListSearchProps {
    movieList: MovieList | null
    setSearch: React.Dispatch<React.SetStateAction<string>>
    setMovieList: React.Dispatch<React.SetStateAction<null>>
    dropdownActive: boolean
}

export const DropdownListSearch: FC<DropdownListSearchProps> = ({ movieList, setSearch, setMovieList, dropdownActive }) => {
    const handleDropdownLink = () => {
        setSearch('')
        setMovieList(null)
    }

    const handleBody = () => {
        setSearch('')
        setMovieList(null)
    }

    useEffect(() => {
        if (dropdownActive) document.querySelector('body')?.addEventListener('click', handleBody)
        return () => {
            document.querySelector('body')?.removeEventListener('click', handleBody)
        }
    }, [dropdownActive])

    if (movieList === null) return <></>

    if (dropdownActive) {
        return (
            <div className="drop-down">
                <ul className="drop-down__list">
                    {movieList.length > 0 ? movieList.map((item) => {
                        return (
                            <li key={item.id} className="drop-down__list__item">
                                <Link className="drop-down__list__item__link" to={`/movie/${item.id}`} onClick={handleDropdownLink}>
                                    <img className="drop-down__list__item__img" src={item.posterUrl} alt="" />
                                    <MovieTopInfo movie={item} />
                                    <h5 className="drop-down__list__item__title">{item.title}</h5>
                                </Link>
                            </li>
                        )
                    }) : <div className='no-search'>По данному запросу ничего не найдено</div>}
                </ul>
            </div>
        )
    } else {
        return <></>
    }
}