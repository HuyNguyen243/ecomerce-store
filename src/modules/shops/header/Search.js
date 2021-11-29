import React, {useState} from 'react';


const Search = ({handleSubmit}) => {
  const [searchEntry, setSearchEntry] = useState("");
  const [isShow, setIsShow] = useState(false);

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
      let params = `?keyword=${searchEntry}`;
      handleSubmit(params, 'Kết quả tìm kiếm')
    }
  }

  return (
    <div>
      
      <form className={`app-search txt-left ${isShow ? '' : 'hide-search' }`} onSubmit={e => search(e)}>
        <span className="form-title">Cửa hàng</span>
        <input className="app-input" type="text" placeholder="Tìm sản phẩm ..." onChange={updateSearchInput} />
        <button type="submit" className="btn search-btn"><i className="material-icons">search</i></button>
      </form>
    </div>
  );
}

export default Search;
