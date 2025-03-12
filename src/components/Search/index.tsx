import { DropdownListSearch } from "../SearchDropdownList"
import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useTimeout } from "../../hooks/useTimeout"
import { getMovieListTitle } from "../../api/movieGets"

export const Search = () => {
    const searchRef = useRef(null);
    const [search, setSearch] = useState('');
    const [movieList, setMovieList] = useState(null);
    const title = (useTimeout(search, 500))
    const [dropdownActive, setDropdownActive] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch(e.target.value)
    }

    const handleSearchClear = () => {
        setDropdownActive(false)
        setSearch('')
        setMovieList(null)
    }

    useEffect(() => {
        if (search.length > 0) {
            getMovieListTitle(title).then(results => {
                setMovieList(results);
                setDropdownActive(true)
            });
        } else {
            setMovieList(null);
            setDropdownActive(false)
        }
    },
        [title]
    );

    const handleBtnOpenSearch = () => {
        setSearchOpen(true)
    }

    const handleOpenSearchBg = () => {
        if (searchOpen) {
            setSearchOpen(false)
            setDropdownActive(false)
        }   
    }

    useEffect(() => {
        if (searchOpen && searchRef) {
            searchRef.current.focus()
        }
    }, [searchOpen])

    return (
        <div className={`${searchOpen ? 'open-search-bg' : ''}`} onClick={handleOpenSearchBg}>
            <button className={`btn-search-mobile ${searchOpen ? 'open-search-btn-hidden' : ''}`} onClick={handleBtnOpenSearch}>
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="white" />
                </svg>
            </button>
            <input ref={searchRef} type="text" placeholder="Поиск" className={`search-input ${searchOpen ? 'open-search-input' : ''}`} value={search} onChange={handleChangeInputValue} onClick={(e) => { e.stopPropagation() }} />
            <DropdownListSearch movieList={movieList} setSearch={setSearch} setMovieList={setMovieList} dropdownActive={dropdownActive} setDropdownActive={setDropdownActive} />
            {dropdownActive && <button onClick={handleSearchClear} className={`search-input__btn-clear btn-active `}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.99873 5.5865L11.9485 0.636719L13.3627 2.05093L8.41293 7.0007L13.3627 11.9504L11.9485 13.3646L6.99873 8.4149L2.04899 13.3646L0.634766 11.9504L5.58453 7.0007L0.634766 2.05093L2.04899 0.636719L6.99873 5.5865Z" fill="white" fill-opacity="0.5" />
                </svg>
            </button>}
        </div>
    )
}
