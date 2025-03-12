import { FC, HTMLAttributes } from 'react'
import { Loader } from '../Loader'
import './index.scss'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean,
    isDisabled?: boolean,
    kind?: 'primary' | 'secondary',
    type?: 'submit' | 'reset' | 'button'
}

export const Button: FC<ButtonProps> = ({
    isLoading,
    isDisabled = isLoading,
    className,
    children,
    type,
    ...props
}) => {
    return (
        <button
            disabled={isDisabled}
            type={type}
            className={`btn-default ${className}`}
            {...props}
        >
            {isLoading ? <Loader /> : children}
        </button>
    )
}