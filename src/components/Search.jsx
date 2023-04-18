import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

import { sneakersSelector, setSearchValue } from "../redux/sneakers/sneakersSlice";


export const Search = () => {

    const {searchValue} = useSelector(sneakersSelector);
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const onChangeValue = (e) => dispatch(setSearchValue(e.target.value));
    const onClickClear = () => {
        dispatch(setSearchValue(''));
        inputRef.current?.focus();
    }    

    return (
        <div className="d-flex justify-between mb-40 align-center flex-wrap">
        <h1 >{searchValue ? `Search by request: "${searchValue}"` : 'All sneakers'}</h1>
        <div className="search-block d-flex">
            <img src="img/search.svg" alt="Search" />
            {searchValue && <img onClick={onClickClear} className="clear removeBtn" src="img/btn-remove.svg" alt="cleare" />}
            <input 
            ref={inputRef}
            value={searchValue}
            name={searchValue} 
            onChange={onChangeValue}
            placeholder="Search..." type="text" />
        </div>
        </div>
    )
}
