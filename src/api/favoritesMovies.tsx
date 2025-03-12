import { MovieList } from "./movieGets"
import { BASE_URL, defaultConfig } from "./urlConfig"

export const getFavoritesMovies = () => fetch(`${BASE_URL}/favorites`, {
   method: 'GET',
   headers: defaultConfig.headers,
   credentials: "include"
}).then(res => res.json())

export const addMovieToFavorite = (id: string): Promise<MovieList> => {
    return fetch(`${BASE_URL}/favorites`, {
        method: 'POST',
        headers: defaultConfig.headers,
        body: JSON.stringify({ id: id }),
        credentials: "include",
    }).then(res => res.json())
}

export const deleteMovieToFavorite = (id: string): Promise<MovieList> => {
    return fetch(`${BASE_URL}/favorites/${id}`, {
        method: 'DELETE',
        headers: defaultConfig.headers,
        credentials: "include",
    }).then(res => res.json())
}