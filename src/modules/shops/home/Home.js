import React, { useEffect } from "react";
import Slider from './Slider';
import LeftNav from "./../aside/LeftNav";
import Offer from "./Offer";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { getInitData } from './../../../redux/actions/index';

const Home = ({ params, showDetail, showLeftNav, getListData, showNavigation, addToCart }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.isLoading);
  const generalData = useSelector(state => state.generalData);
  const { t } = useTranslation();
  const getGeneralDataCallback = React.useCallback(() => {
    dispatch(getInitData())
}, [dispatch]);

  useEffect(() => {
    if(!generalData.isLoaded) {
      getGeneralDataCallback()
    }
  }, [getGeneralDataCallback, generalData]);
  return (
    <div className="main_container fix-image">
      <Offer data={generalData?.data?.banners}/>
      {
        isLoading
        ? <div className="overlay-spinner"></div>
        : 
          <>
            {
              generalData?.data?.productByPromotion?.length > 0
              && <Slider type={'products'} addToCart={addToCart} data={generalData?.data?.productByPromotion} getListData={getListData} title={(t("home.titlePromoted"))} showDetail={showDetail} />
            }
            {
              generalData?.data?.productByCategory?.length > 0
              && generalData?.data?.productByCategory.map((category, index) => {
                return (
                  <Slider key={index} type={'categories'} categoryId={category._id} addToCart={addToCart} getListData={getListData} data={category.products} title={category.name} showDetail={showDetail} />
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
