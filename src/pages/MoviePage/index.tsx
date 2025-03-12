import { useParams } from 'react-router-dom'
import { getMovie } from '../../api/movieGets'
import './index.scss'
import { AboutMovie } from '../../components/AboutMovie'
import { useQuery } from '@tanstack/react-query'
import { queryClient } from '../../api/queryClient'
import { DscrMovie } from '../../components/DescriptionMovie'
import { ErrorPage } from '../ErrorPage'
import { Loader } from '../../components/Loader'

export const MoviePage = () => {
    const { movieId } = useParams()

    const movie = useQuery({
        queryFn: () => getMovie(movieId),
        queryKey: ["movie", `${movieId}`]
    }, queryClient)

    switch (movie.status) {
        case 'success':
            return (
                <>
                    <AboutMovie movie={movie.data} />
                    <DscrMovie movie={movie.data} />
                </>
            )
        case 'error':
            return <ErrorPage />
        case 'pending':
            return <Loader />
    }

}