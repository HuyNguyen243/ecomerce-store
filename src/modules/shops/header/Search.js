import React, {useState} from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from "react-redux";
import { headTitles } from './../../../redux/actions/index';

const Search = ({handleSubmit}) => {
  const [searchEntry, setSearchEntry] = useState("");
  const [isShow, setIsShow] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()

  // update search text state
  const updateSearchInput = e => {
    setSearchEntry(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();
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
      dispatch(headTitles("kết quả tìm kiếm"))
    }
  }

  return (
    <div>
      
      <form className={`app-search txt-left ${isShow ? '' : 'hide-search' }`} onSubmit={e => search(e)}>
        <img  src="/images/Logo-coca.png" className="form-title" alt="logo" />
        <span className={isShow ? "add-border": ""}>
        <input className={`app-input ${isShow? "show" : "hide" }`} type="text" placeholder="Tìm sản phẩm ..." onChange={updateSearchInput} />
        <button type="submit" className={`btn search-btn `}><i className={`material-icons + ${isShow ? "add-padding": ""}`}>search</i></button>
        </span >
      </form>
    </div>
  );
}

export default Search;
