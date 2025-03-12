import { useNavigate } from "react-router-dom";
import { logout } from "../../api/authFetch";
import { MainPage } from "../../pages/MainPage";
import './index.scss'
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../api/queryClient";
import { profilePropsItem } from "..";

export const ProfileData = ({ profile }: profilePropsItem) => {
    const navigate = useNavigate();
    if (profile) {
        const profileInitials = profile.name.toLocaleUpperCase().slice(0, 1) + profile.surname.toLocaleUpperCase().slice(0, 1);
        const naming = profile.name.toLocaleUpperCase().slice(0, 1) + profile.name.toLocaleLowerCase().slice(1) + " " + profile.surname.toLocaleUpperCase().slice(0, 1) +
            profile.surname.toLocaleLowerCase().slice(1);

        const logoutMutation = useMutation({
            mutationFn: () => logout(),
            mutationKey: ["logout"],
            onSuccess() {
                queryClient.invalidateQueries({ queryKey: ["profile"] })
                navigate('/')
            }
        }, queryClient);

        const handleLogout = () => {
            logoutMutation.mutate();
        }

        return (
            <div className="profile-data">
                <ul className="profile-data__list">
                    <li className="profile-data__list__item">
                        <div className="profile-data__left">
                            <span className="profile-data__list__item__icon initials">{profileInitials}</span>
                        </div>
                        <div className="profile-data__right">
                            <span className="profile-data__list__item__label">Имя Фамилия</span>
                            <span className="profile-data__list__item__naming">{naming}</span>
                        </div>
                    </li>
                    <li className="profile-data__list__item">
                        <div className="profile-data__left">
                            <span className="profile-data__list__item__icon">
                                <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z" fill="white" />
                                </svg>
                            </span>
                        </div>
                        <div className="profile-data__right">
                            <span className="profile-data__list__item__label">Электронная почта</span>
                            <span className="profile-data__list__item__naming">{profile.email}</span>
                        </div>
                    </li>
                </ul>
                <button className="profile-data__btn-logout primary-btn" onClick={handleLogout}>Выйти из аккаунта</button>
            </div>
        )
    } else {
        <MainPage />
    }
}