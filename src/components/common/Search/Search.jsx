import React, { useState, useRef, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import s from './Search.module.scss';
import { setSearchValue } from "../../../redux/slices/filterSlice";
import debounce from 'lodash.debounce';

function Search() {
    const [inputValue, setInputValue] = useState("");
    const searchValue = useSelector(state => state.filter.searchValue);
    const dispatch = useDispatch();
    const inputRef = useRef();

    const updateSearchValue = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str.trim()));
        }, 800),
        []
    );

    const onChangeInput = (e) => {
        updateSearchValue(e.target.value);
        setInputValue(e.target.value);
    }

    const onClearInput = () => {
        updateSearchValue("");
        setInputValue("");
        inputRef.current.focus();
    }

    return (
        <div className={s.root}>
            <svg className={s.searchIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title /><g id="search"><path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" /></g></svg>
            <input className={s.searchInput}
                ref={inputRef}
                type="text"
                placeholder='Search pizza...'
                value={inputValue}
                onChange={onChangeInput}
            />
            {
                searchValue &&
                <svg className={s.deleteIcon}
                    onClick={onClearInput}
                    viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M8,0C7.448,0,7,0.448,7,1H0v2h1v11c0,1.105,0.895,2,2,2h10c1.105,0,2-0.895,2-2V3h1V1H9C9,0.448,8.552,0,8,0z M4,14H3V5h1  V14z M7,14H6V5h1V14z M10,14H9V5h1V14z M13,14h-1V5h1V14z" />
                </svg>

            }
        </div>
    );
}

export default Search;