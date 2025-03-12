import { Link } from 'react-router-dom'
import './index.scss'
import { useQuery } from '@tanstack/react-query'
import { genreFetch } from '../../api/genreFetch'
import { queryClient } from '../../api/queryClient'

export const GenresPage = () => {
    const giveGenres = useQuery({
        queryFn: () => genreFetch(),
        queryKey: ["genres"]
    }, queryClient)

    return (
        <section className='genres'>
            <div className="container">
                <h1 className='genres__title title-offset'>Жанры фильмов</h1>
                <ul className='genres__list'>
                    {giveGenres.data && giveGenres.data.map((item) => {
                        return (
                            <li key={item} style={{ backgroundImage: `url(./${item}.jpg)`, backgroundColor: 'grey' }} className='genres__list__item' >
                                <Link className='genres__list__item__link' to={`/genres/${item}`} >
                                    <span className='genres__list__item__link__span'>{item.toLocaleUpperCase().slice(0, 1) + item.toLocaleLowerCase().slice(1)}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )

}