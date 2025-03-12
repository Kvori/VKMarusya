import { FC, ReactNode } from "react"
import './index.scss'

interface FormFieldProps {
    children: ReactNode,
}

export const FormField: FC<FormFieldProps> = ({
    children,
}) => {
    return (
        <>
            {children}
        </>
    )
}