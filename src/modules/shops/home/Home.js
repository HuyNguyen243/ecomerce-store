import React, { useEffect } from "react";
import Slider from './Slider';
import LeftNav from "./../aside/LeftNav";
import Offer from "./Offer";

import { useSelector, useDispatch } from "react-redux";
import { getInitData } from './../../../redux/actions/index';

const Home = ({ params, showDetail, showLeftNav, getListData, showNavigation, addToCart }) => {

  const dispatch = useDispatch();

  const isLoading = useSelector(state => state.isLoading);
  const generalData = useSelector(state => state.generalData);

  const getGeneralDataCallback = React.useCallback(() => {
    dispatch(getInitData())
}, [dispatch]);

  useEffect(() => {
    if(!generalData.isLoaded) {
      getGeneralDataCallback()
    }
  }, [getGeneralDataCallback, generalData]);

  return (
    <div className="main_container">
      {Offer()}
      {
        isLoading
        ? <div className="overlay-spinner"></div>
        : 
          <>
            {
              generalData?.data?.productByPromotion?.length > 0
              && <Slider categoryId={'mostView'} addToCart={addToCart} data={generalData?.data?.productByPromotion} getListData={getListData} title="Sản phẩm đang khuyến mãi" showDetail={showDetail} />
            }
            {
              generalData?.data?.productByCategory?.length > 0
              && generalData?.data?.productByCategory.map((category, index) => {
                return (
                  <Slider key={index} categoryId={category._id} addToCart={addToCart} getListData={getListData} data={category.products} title={category.name} showDetail={showDetail} />
                );
              })
            }
            <LeftNav menu={[]} showLeftNav={showLeftNav} getListData={getListData} showNavigation={showNavigation} />
          </>
      }
    </div>
  );
};

export default Home;
