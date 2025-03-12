import "./index.scss";
import {  useState } from "react";
import { LoginForm } from "../LoginForm";
import { modalState } from "../../api/selectors";
import { useDispatch } from "react-redux";
import { modalLoginState } from "../../store/slices";
import { RegisterForm, RegisterSuccessForm } from "..";

interface AuthModal {
    active: boolean;
    setActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthModal = () => {
    const [formState, setFormState] = useState("");
    const [registerSuccess, setRegisterSuccess] = useState(true);
    const dispatch = useDispatch();

    const handleBtnRegister = () => {
        formState === "register" ? setFormState("") : setFormState("register")
    }

    const handleCloseBtn = () => {
        dispatch(modalLoginState())
        setRegisterSuccess(true)
        setFormState("")
    }

    if (modalState()) {
        return (
            <div className={`modal-bg`}>
                <div className="auth-modal">
                    <button className="auth-modal__close-btn" onClick={handleCloseBtn}>
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5859 9.25L0.792969 1.45706L2.20718 0.0428467L10.0001 7.8357L17.793 0.0428467L19.2072 1.45706L11.4143 9.25L19.2072 17.0428L17.793 18.4571L10.0001 10.6642L2.20718 18.4571L0.792969 17.0428L8.5859 9.25Z" fill="black" />
                        </svg>
                    </button>
                    <img className="auth-modal__logo" src="/auth-logo.svg" alt="" />
                    {registerSuccess
                        ? (<>
                            {formState === "register"
                                ? <RegisterForm setRegisterSuccess={setRegisterSuccess} />
                                : <LoginForm />}
                            <button className="auth-modal__btn-register" onClick={handleBtnRegister}>{(formState === "register" ? 'У меня есть пароль' : 'Регистрация')}</button>
                        </>)
                        : <RegisterSuccessForm setFormState={setFormState} setRegisterSuccess={setRegisterSuccess} />}
                </div>
            </div>
        )
    } else {
        return <></>
    }
}