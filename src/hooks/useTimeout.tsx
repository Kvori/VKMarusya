import { useEffect, useState } from "react"

export const useTimeout = (value: any, delay: number) => {
    const [timeoutValue, setTimeoutValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setTimeoutValue(value)
        }, delay);
        return () => {
            clearTimeout(handler);
        }
    }, [value])

    return timeoutValue;
}