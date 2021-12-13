import React, { useEffect } from "react";
import Slider from './../home/Slider';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategoriesByParentId } from './../../../redux/actions/index';
import Header from "./../header/Header";


const ListCategory = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.isLoading);
  const categories = useSelector(state => state.categories);
  const getCategoriesCallback = React.useCallback(() => {
    dispatch(getCategoriesByParentId(id))
}, [dispatch, id]);

  useEffect(() => {
    if(!categories.isLoaded) {
      getCategoriesCallback()
    }
  }, [getCategoriesCallback, categories]);

  return (
    <div>
      <Header
        hasNavigation={true}
        title="Danh sách sản phẩm"
        
      />
      <div className="main_container">
        {
          isLoading
          ? <div className="overlay-spinner"></div>
          : 
            <>
              {
                categories?.data?.length > 0
                && categories?.data?.map((category, index) => {
                  return (
                    <Slider key={index} categoryId={category._id} data={category.products} title={category.name} />
                  );
                })
              }
            </>
        }
      </div>
    </div>
  );
};

export default ListCategory;
