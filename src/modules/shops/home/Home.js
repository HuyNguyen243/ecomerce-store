import React, { useEffect, useContext, useState } from "react";
import Slider from './Slider';
import LeftNav from "./../aside/LeftNav";
import Loader from "./../../../_components/_loader.component";
// import Blankpage from "./../../../_components/_blankpage.component";
import { ShopContext } from "./../../../contexts/ShopContext";
import UrlParamHelper  from './../../../_helpers/param';

const Home = ({ params, showDetail, showLeftNav, getListData, showNavigation, addToCart }) => {
  const { mostViews, productByCategories, loading, getGeneralData, login } = useContext(ShopContext);
  let isHomeLoaded = false;
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    doLogin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function doLogin() {
    let formData = UrlParamHelper.getParams();
    var data = new FormData();
    data.append('botId', formData.botId);
    data.append('userId', formData.userId);
    const response = await login(data);
    if (response) {
      UrlParamHelper.setToken(response.data.token)
      UrlParamHelper.setIsProBot(response.data.is_pro)
      setIsLogin(true)
      getGeneralData(params);
    }else {
      // UrlParamHelper.notFound()
    }
  }

  let mostViewProducts;

  if (mostViews.length > 0) {
    mostViewProducts = <Slider categoryId={'mostView'} addToCart={addToCart} data={mostViews} getListData={getListData} title="Sản phẩm nổi bật" showDetail={showDetail} />
  } else {
    // mostViewProducts = <Blankpage message="Không tìm thấy" />;
  }

  let productList;
  if (productByCategories.length > 0) {
    isHomeLoaded = true;
    productList = productByCategories.map((category, index) => {
      if (category.products.length > 0) {
        return (
          <Slider key={index} categoryId={category._id} addToCart={addToCart} getListData={getListData} data={category.products} title={category.name} showDetail={showDetail} />
        );
      }
      return '';
    });
  }

  return (
    <div className="main_container">
      {isLogin ? 
        <div>
          {loading && !isHomeLoaded ? <Loader /> : mostViewProducts}
          {productList}
          <LeftNav menu={productByCategories} showLeftNav={showLeftNav} getListData={getListData} showNavigation={showNavigation} />
        </div> : <div className="overlay-spinner"></div>
      }
    </div>
  );
};

export default Home;
