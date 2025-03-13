import "./index.scss"

interface RegisterSuccessFormProps {
    setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>,
    setFormState: React.Dispatch<React.SetStateAction<string>>
}

export const RegisterSuccessForm = ({ setRegisterSuccess, setFormState }: RegisterSuccessFormProps) => {
    const handleBtnLogin = () => {
        setFormState('')
        setRegisterSuccess(false)
    }
    return (
        <div className="register-success-form">
            <h3 className="register-success-form__title">Регистрация завершена</h3>
            <p className="register-success-form__dscr">Используйте вашу электронную почту для входа</p>
            <button className="register-success-form__btn primary-btn" onClick={handleBtnLogin}>Войти</button>
        </div>
    )
}