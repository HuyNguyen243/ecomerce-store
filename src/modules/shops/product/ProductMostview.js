import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getIdMosview } from './../../../redux/actions/index';
import Header from "./../header/Header";
import List from "../List";


const ProductMostview = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const mostview = useSelector(state => state.mostview);
  const headerTitles = useSelector(state => state.headerTitles);

  const getMostviewCallback = React.useCallback(() => {
    let params = '';
    let fullUrl = window.location.href;
    let url = new URL(fullUrl);
    let categoryId = url.searchParams.get("category_id");
    let keyword = url.searchParams.get("keyword");

    if(keyword){
      params = '&keyword='+ keyword
    }

    if(categoryId) {
      params = '&category_id='+categoryId
    }
    dispatch(getIdMosview(params))
}, [dispatch]);

  useEffect(() => {
    getMostviewCallback()
  }, [getMostviewCallback]);
  const DataMostView = ()=>{
    if(mostview.data.length > 0){
            return(
               <>
               <List data={mostview.data}/>
               </>
            )
    }
  }
  return (
    <div>
      <Header
        hasNavigation={true}
        title={headerTitles}
        
      />
      <div className="main_container fix-images">
        {
          isLoading
          ? <div className="overlay-spinner"></div>
          : 
            <>
                {DataMostView()}
            </>
        }
      </div>
    </div>
  );
};

export default ProductMostview;
