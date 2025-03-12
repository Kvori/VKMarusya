import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import './App.scss'
import { getFavoritesMovies, profileFetch, queryClient } from './api'
import { setFavorites, setProfile } from './store/slices'
import { Layout } from './components'
import { GenrePage, ErrorPage, GenresPage, MainPage, MoviePage, ProfilePage } from './pages'

function App() {
  const meQuery = useQuery({
    queryFn: () => profileFetch(),
    queryKey: ["profile"],
    retry: 0,
  }, queryClient)

  const favoritesQuery = useQuery({
    queryFn: () => getFavoritesMovies(),
    queryKey: ["favorites"],
    retry: 0,
  }, queryClient)

  const dispatch = useDispatch();

  favoritesQuery.status === "success" ? dispatch(setFavorites(favoritesQuery.data)) : dispatch(setFavorites(null))
  meQuery.status === "success" ? dispatch(setProfile(meQuery.data)) : dispatch(setProfile(null))

  if (meQuery.status !== "pending") {
    return (
      <BrowserRouter future={{ v7_startTransition: true }}>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='*' element={<ErrorPage />} />
            <Route index path='' element={<MainPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/movie/:movieId' element={<MoviePage />} />
            <Route path='/genres' element={<GenresPage />} />
            <Route path='/genres/:genreName' element={<GenrePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
