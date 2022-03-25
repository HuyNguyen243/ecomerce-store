import React, { createContext, useState } from "react";
import axios from "axios";
import { apiUrl, requestHeader } from "./../_config/api.config";
import UrlParamHelper from "./../_helpers/param";
import CartHelper from "./../_helpers/cart";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [mostViews, setMostViews] = useState([]);
  const [productByCategories, setProductByCategories] = useState([]);
  const [orderByUserId, setOrderByUserId] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const [hasMoreOrder, setHasMoreOrder] = useState(true);
  const [pageOrder, setPageOrder] = useState(1);

  async function login(formData) {
    try {
      const response = await axios.post(`${apiUrl}login`, formData);
      return response.data;
    } catch (error) {
      return false;
    }
  }

  const getGeneralData = (params) => {
    setLoading(true);
    axios
      .get(
        `${apiUrl}bots/${UrlParamHelper.get().botId
        }?token=${UrlParamHelper.getToken()}`,
        requestHeader
      )
      .then((response) => {
        setMostViews(response.data.data.mostViews.data);
        setProductByCategories(response.data.data.productByCategory);
        setLoading(false);
      })
      .catch((error) => { });
  };

  const getList = (params) => {
    setLoading(true);
    setHasMore(true);
    setPage(1);
    axios
      .get(
        `${apiUrl}bots/${UrlParamHelper.get().botId}/products${params}`,
        requestHeader
      )
      .then((response) => {
        let list = response.data.data.data;
        setProducts(list);
        if (response.data.data.last_page === 1) {
          setHasMore(false);
        }
        setLoading(false);
      })
      .catch((error) => { });
  };

  const getListMore = (params) => {
    setPage(page + 1);
    axios
      .get(
        `${apiUrl}bots/${UrlParamHelper.get().botId}/products${params}`,
        requestHeader
      )
      .then((response) => {
        setProducts(products.concat(response.data.data.data));
        if (response.data.data.current_page === response.data.data.last_page) {
          setHasMore(false);
        }
      })
      .catch((error) => { });
  };

  const getById = (id) => {
    setLoading(true);
    axios
      .get(
        `${apiUrl}bots/${UrlParamHelper.get().botId}/products/${id}`,
        requestHeader
      )
      .then((response) => {
        setProduct(response.data.data);
        setLoading(false);
      })
      .catch((error) => { });
  };

  const getListOrders = (params) => {
    setLoading(true);
    setHasMoreOrder(true);
    setPageOrder(1);
    axios
      .get(
        `${apiUrl}bots/${UrlParamHelper.get().botId}/orders/user-orders/${UrlParamHelper.get().userId
        }?token=${UrlParamHelper.getToken()}&${params}`,
        requestHeader
      )
      .then((response) => {
        setOrderByUserId(response.data.data.data);
        if (response.data.data.last_page === 1) {
          setHasMoreOrder(false);
        }
        setLoading(false);
      })
      .catch((error) => { });
  };

  const getListOrdersMore = (params) => {
    setPageOrder(pageOrder + 1);
    axios
      .get(
        `${apiUrl}bots/${UrlParamHelper.get().botId}/orders/user-orders/${UrlParamHelper.get().userId
        }?token=${UrlParamHelper.getToken()}&${params}`,
        requestHeader
      )
      .then((response) => {
        setOrderByUserId(orderByUserId.concat(response.data.data.data));
        if (response.data.data.current_page === response.data.data.last_page) {
          setHasMoreOrder(false);
        }
      })
      .catch((error) => { });
  };

  async function submitOrder(formData) {
    try {
      const response = await axios.post(
        `${apiUrl}bots/${UrlParamHelper.get().botId
        }/orders?token=${UrlParamHelper.getToken()}`,
        formData
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async function applyPromotion(code) {
    try {
      const response = await axios.get(
        `${apiUrl}bots/${UrlParamHelper.get().botId
        }/carts/${CartHelper.getCartId()}/apply-promotion/${code}?token=${UrlParamHelper.getToken()}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }

  async function getUserInfo() {
    try {
      const response = await axios.get(
        `${apiUrl}bots/${UrlParamHelper.get().botId}/users/${UrlParamHelper.get().userId
        }?token=${UrlParamHelper.getToken()}`
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }

  async function submitUserInfo(formData) {
    try {
      formData.append("userId", UrlParamHelper.get().userId);
      const response = await axios.post(
        `${apiUrl}bots/${UrlParamHelper.get().botId
        }/users?token=${UrlParamHelper.getToken()}`,
        formData
      );
      return response.data;
    } catch (error) {
      return false;
    }
  }

  return (
    <ShopContext.Provider
      value={{
        getListMore,
        page,
        setPage,
        hasMore,
        pageOrder,
        hasMoreOrder,
        setPageOrder,
        getListOrdersMore,
        applyPromotion,
        products,
        product,
        loading,
        orderByUserId,
        getList,
        getById,
        submitOrder,
        getListOrders,
        mostViews,
        productByCategories,
        getGeneralData,
        login,
        getUserInfo,
        submitUserInfo,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
