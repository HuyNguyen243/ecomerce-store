import React, { useRef, useState} from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { headTitles } from './../../../redux/actions/index';

const Search = ({handleSubmit}) => {
  const [searchEntry, setSearchEntry] = useState("");
  const [isShow, setIsShow] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const searchInput = useRef(null)

  // update search text state
  const updateSearchInput = e => {
    setSearchEntry(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
    searchInput.current.focus()
    if (!isShow) {
      setIsShow(true)
    }else {
      e.currentTarget.reset();
      if(searchEntry === '') {
        setIsShow(false)
        return 
      }
      let params = `/products/?keyword=${searchEntry}`;
      history.push(params)
      dispatch(headTitles(t("productDetail.searchResults")))
    }
  }

  return (
    <div>
      <form className={`app-search txt-left ${isShow ? '' : 'hide-search' }`} onSubmit={e => search(e)}>
        <img style={{cursor: 'pointer'}} onClick={e => history.push('/') } src="/images/Logo-coca.png" className="form-title" alt="logo" />
        <span className={isShow ? "add-border": ""}>
        <input ref={searchInput }  className={`app-input `} type="text" placeholder={isShow ? t("header.search_text") : ""} onChange={updateSearchInput} />
        <button  type="submit" className={`btn search-btn `}><i className={`material-icons + ${isShow ? "add-padding": ""}`}>search</i></button>
        </span >
      </form>
    </div>
  );
}

export default Search;
