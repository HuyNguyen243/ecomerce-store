var UrlParamHelper = {
  prepare: () => {
    // let params = UrlParamHelper.getParams();
    // if (params.botId === null || params.userId === null) {
    //   UrlParamHelper.notFound();
    // }
    // let paramsData = JSON.stringify(params);
    // sessionStorage.setItem("urlParams", paramsData);
  },

  getParams: () => {
    let fullUrl = window.location.href;
    let url = new URL(fullUrl);
    let botId = url.searchParams.get("botId");
    let userId = url.searchParams.get("userId");
    let productId = url.searchParams.get("productId");
    let urlParams = {
      botId: botId,
      userId: userId,
      productId: productId,
    };
    return urlParams;
  },

  get: () => {
    let params = sessionStorage.getItem("urlParams");
    return JSON.parse(params);
  },

  setToken: (token) => {
    sessionStorage.setItem(UrlParamHelper.get().botId +"_module_token", token);
  },

  getToken: () => {
    return sessionStorage.getItem(UrlParamHelper.get().botId +"_module_token");
  },

  setIsProBot: (isProBot) => {
    sessionStorage.setItem(UrlParamHelper.get().botId +"_is_pro_bot", isProBot);
  },

  isProBot: () => {
    let isPro = sessionStorage.getItem(UrlParamHelper.get().botId +"_is_pro_bot");
    return isPro === 'true' ? true : false;
  },

  notFound: () => {
    window.location.href = "/not-found";
  },
};

export default UrlParamHelper;
