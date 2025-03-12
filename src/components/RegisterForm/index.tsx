import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField } from "../FormField"
import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../../api/authFetch"
import { queryClient } from "../../api/queryClient"
import { Button } from ".."

interface RegisterFormProps {
    setRegisterSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

export const RegisterForm = ({ setRegisterSuccess }: RegisterFormProps) => {
    const RegisterScheme = z.object({
        email: z.string().min(1).email(),
        password: z.string().min(1),
        confirmPassword: z.string().min(1),
        name: z.string().min(1),
        surname: z.string().min(1)
    })
        .refine((data) => data.password === data.confirmPassword, {
            path: ["confirmPassword"],
        });

    type RegisterForm = z.infer<typeof RegisterScheme>

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterForm>({
        resolver: zodResolver(RegisterScheme)
    })

    const registerMutation = useMutation({
        mutationFn: ({ email, name, surname, password }: RegisterForm) => registerUser({ email, name, surname, password }),
        onSuccess() {
            setRegisterSuccess(true)
        }
    }, queryClient)

    const errorFilter = (error: Error) => {
        if (typeof (error.message) === 'object' && JSON.parse(error.message).error === "User already exists") {
            return <span className="auth-form__error">Пользователь с таким email уже существует</span>
        } else {
            if (error.message === 'Not Found') {
                return <span className="auth-form__error">Сервер не отвечает</span>
            } else {
                return <span className="auth-form__error">{error.message}</span>
            }
        }
    }

    return (
        <form className="auth-form" onSubmit={handleSubmit(({ email, name, surname, password }) => {
            registerMutation.mutate({ email: email, name: name, surname: surname, password: password, confirmPassword: password })
        })}>
            <FormField errorMessage={errors.email?.message}>
                <label className="auth-form__label">
                    <input className={`auth-form__input ${errors.email && `invalid`}`} type="text" placeholder="Электронная почта"
                        {...register('email')}
                    />
                    <svg className={`auth-form__svg ${errors.email && `invalid`}`} width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z" fill="black" fill-opacity="0.4" />
                    </svg>
                </label>
            </FormField>
            <FormField errorMessage={errors.name?.message}>
                <label className="auth-form__label">
                    <input className={`auth-form__input ${errors.name && `invalid`}`} type="text" placeholder="Имя"
                        {...register('name')}
                    />
                    <svg className={`auth-form__svg ${errors.name && `invalid`}`} width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 21.75C0 17.3317 3.58172 13.75 8 13.75C12.4183 13.75 16 17.3317 16 21.75H14C14 18.4363 11.3137 15.75 8 15.75C4.68629 15.75 2 18.4363 2 21.75H0ZM8 12.75C4.685 12.75 2 10.065 2 6.75C2 3.435 4.685 0.75 8 0.75C11.315 0.75 14 3.435 14 6.75C14 10.065 11.315 12.75 8 12.75ZM8 10.75C10.21 10.75 12 8.96 12 6.75C12 4.54 10.21 2.75 8 2.75C5.79 2.75 4 4.54 4 6.75C4 8.96 5.79 10.75 8 10.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                </label>
            </FormField >
            <FormField errorMessage={errors.surname?.message}>
                <label className="auth-form__label">
                    <input className={`auth-form__input ${errors.surname && `invalid`}`} type="text" placeholder="Фамилия"
                        {...register('surname')}
                    />
                    <svg className={`auth-form__svg ${errors.surname && `invalid`}`} width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 21.75C0 17.3317 3.58172 13.75 8 13.75C12.4183 13.75 16 17.3317 16 21.75H14C14 18.4363 11.3137 15.75 8 15.75C4.68629 15.75 2 18.4363 2 21.75H0ZM8 12.75C4.685 12.75 2 10.065 2 6.75C2 3.435 4.685 0.75 8 0.75C11.315 0.75 14 3.435 14 6.75C14 10.065 11.315 12.75 8 12.75ZM8 10.75C10.21 10.75 12 8.96 12 6.75C12 4.54 10.21 2.75 8 2.75C5.79 2.75 4 4.54 4 6.75C4 8.96 5.79 10.75 8 10.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                </label>
            </FormField >
            <FormField errorMessage={errors.password?.message}>
                <label className="auth-form__label">
                    <input className={`auth-form__input ${errors.password && `invalid`}`} type="password" placeholder="Пароль"
                        {...register('password')}
                    />
                    <svg className={`auth-form__svg ${errors.password && `invalid`}`} width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.917 7.75C11.441 10.5877 8.973 12.75 6 12.75C2.68629 12.75 0 10.0637 0 6.75C0 3.43629 2.68629 0.75 6 0.75C8.973 0.75 11.441 2.91229 11.917 5.75H22V7.75H20V11.75H18V7.75H16V11.75H14V7.75H11.917ZM6 10.75C8.20914 10.75 10 8.9591 10 6.75C10 4.54086 8.20914 2.75 6 2.75C3.79086 2.75 2 4.54086 2 6.75C2 8.9591 3.79086 10.75 6 10.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                </label>
            </FormField >
            <FormField errorMessage={errors.confirmPassword?.message}>
                <label className="auth-form__label">
                    <input className={`auth-form__input ${errors.confirmPassword && `invalid`}`} type="password" placeholder="Подтвердите пароль"
                        {...register('confirmPassword')}
                    />
                    <svg className={`auth-form__svg ${errors.confirmPassword && `invalid`}`} width="22" height="13" viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.917 7.75C11.441 10.5877 8.973 12.75 6 12.75C2.68629 12.75 0 10.0637 0 6.75C0 3.43629 2.68629 0.75 6 0.75C8.973 0.75 11.441 2.91229 11.917 5.75H22V7.75H20V11.75H18V7.75H16V11.75H14V7.75H11.917ZM6 10.75C8.20914 10.75 10 8.9591 10 6.75C10 4.54086 8.20914 2.75 6 2.75C3.79086 2.75 2 4.54086 2 6.75C2 8.9591 3.79086 10.75 6 10.75Z" fill="black" fill-opacity="0.4" />
                    </svg>
                </label>
            </FormField >
            {registerMutation.error && errorFilter(registerMutation.error)}
            <Button className="auth-form__btn-submit primary-btn" type="submit" isLoading={registerMutation.isPending} > Создать аккаунт</Button >
        </form >
    )
}