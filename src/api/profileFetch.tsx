import { BASE_URL } from "./urlConfig"

export interface ProfileProps {
    email: string,
    favorites: string[],
    name: string,
    surname: string,
}

export const profileFetch = (): Promise<ProfileProps> => {
    return fetch(`${BASE_URL}/profile`, {
        credentials: "include"
    }).then(res => res.json())
}