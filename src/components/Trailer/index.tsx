import { useEffect } from 'react'
import './index.scss'

export interface TrailerProps {
    trailerModalState: boolean
    setTrailerModalState: React.Dispatch<React.SetStateAction<boolean>>
    movieLink: string
}

export const Trailer = ({ trailerModalState, setTrailerModalState, movieLink }: TrailerProps) => {
    const handleBtnTrailerClose = () => {
        setTrailerModalState(false)        
    }

    useEffect(() => {
        document.querySelector('body')?.removeAttribute('style', 'overflow:visible')
        if (trailerModalState) document.querySelector('body')?.setAttribute('style', 'overflow:hidden') 
    }, [trailerModalState])

    return (<>
        {trailerModalState &&
            <div className='trailer-modal' onClick={handleBtnTrailerClose}>
                <div className='trailer-modal__box' >
                    <iframe className="trailer-frame" src={`https://www.youtube.com/embed/${movieLink}?rel=0&showinfo=0`} title="YouTube video player" frameborder="1" start="12" allowFullScreen></iframe>
                    <button className='trailer-modal__btn-close' onClick={handleBtnTrailerClose}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5859 10L0.792969 2.20706L2.20718 0.792847L10.0001 8.5857L17.793 0.792847L19.2072 2.20706L11.4143 10L19.2072 17.7928L17.793 19.2071L10.0001 11.4142L2.20718 19.2071L0.792969 17.7928L8.5859 10Z" fill="black" />
                        </svg>
                    </button>
                </div>
            </div>
        }
    </>)
}