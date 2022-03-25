import UrlParamHelper from "./param";
import axios from "axios";
import { apiUrl } from "./../_config/api.config";

var CartHelper = {
  key_storage: () => {
    return (
      "order_" +
      UrlParamHelper.getParams().botId +
      "_" +
      UrlParamHelper.getParams().userId
    );
  },

  key_storage_cartid: () => {
    return (
      "cart_" +
      UrlParamHelper.getParams().botId +
      "_" +
      UrlParamHelper.getParams().userId
    );
  },
  key_storage_promotion: () => {
    return (
      "priceAfterPromotion" +
      UrlParamHelper.getParams().botId +
      "_" +
      UrlParamHelper.getParams().userId
    );
  },

  add: (item) => {
    let items = CartHelper.get();
    if (items) {
      let hasDuplicate = false;
      for (let index = 0; index < items.length; index++) {
        if (items[index].id === item.id) {
          items[index].quantity += item.quantity;
          hasDuplicate = true;
          break;
        }
      }
      if (!hasDuplicate) {
        items.push(item);
      }
    } else {
      items = Array(item);
    }
    CartHelper.save(items);
    CartHelper.saveCartAPI(items);
  },

  save: (item) => {
    localStorage.setItem(CartHelper.key_storage(), JSON.stringify(item));
    CartHelper.removePromotion();
  },

  savePromotion: (Promotion) => {
    window.sessionStorage.setItem(
      CartHelper.key_storage_promotion(),
      JSON.stringify(Promotion)
    );
  },

  saveCartId: (cartid) => {
    localStorage.setItem(CartHelper.key_storage_cartid(), cartid);
  },

  update: (index, item) => {
    let items = CartHelper.get();
    items[index].quantity += index.quantity;
    CartHelper.save(items);
    CartHelper.saveCartAPI(items);
  },

  getCartAPI: () => {
    return axios
      .get(
        `${apiUrl}bots/${UrlParamHelper.get().botId}/carts/user/${
          UrlParamHelper.get().userId
        }?token=${UrlParamHelper.getToken()}`
      )
  },

  saveCartAPI: (items) => {
    var formData = new FormData();
    formData.append("products", JSON.stringify(items));
    formData.append("userId", UrlParamHelper.get().userId);
    try {
      axios.post(
        `${apiUrl}bots/${
          UrlParamHelper.get().botId
        }/carts?token=${UrlParamHelper.getToken()}`,
        formData
      );
    } catch (error) {
      return false;
    }
  },

  getCartId: () => {
    return localStorage.getItem(CartHelper.key_storage_cartid());
  },

  getPromotion: () => {
    let promotion = window.sessionStorage.getItem(
      CartHelper.key_storage_promotion()
    );
    if (promotion !== null) {
      promotion = JSON.parse(promotion);
    }
    return promotion;
  },
  removePromotion: () => {
    window.sessionStorage.setItem(
      CartHelper.key_storage_promotion(),
      JSON.stringify({
        priceReduce: 0,
        priceAfterPromotion: 0,
        promotion: {
          title: "",
        },
      })
    );
  },

  get: () => {
    let storage = [];
    let items = localStorage.getItem(CartHelper.key_storage());
    if (items === "undefined") {
      CartHelper.save([]);
    }
    items = localStorage.getItem(CartHelper.key_storage());
    items = JSON.parse(items);
    if (items) {
      storage = items;
    }
    return storage;
  },

  remove: (index) => {
    let items = CartHelper.get();
    items.splice(index, 1);
    CartHelper.save(items);
  },

  empty: () => {
    localStorage.removeItem(CartHelper.key_storage_cartid());
    localStorage.removeItem(CartHelper.key_storage());
  },

  getTotal: () => {
    let items = CartHelper.get();
    let total = 0;
    if (items.length > 0) {
      items.forEach((item) => {
        total += item.quantity;
      });
    }
    return total;
  },
};

export default CartHelper;
