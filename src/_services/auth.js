var Auth = {

  init: (botId, userId) => {
    sessionStorage.setItem("bot_id", botId);
    sessionStorage.setItem("user_id", userId);
  },

  isAuth: () => {
    return sessionStorage.getItem("token") ? true : false;
  },

  set: (data) => {
    sessionStorage.setItem("token", data.token);
  },

  get: () => {
    return {
      user_id: sessionStorage.getItem("user_id"),
      bot_id: sessionStorage.getItem("bot_id"),
      token: sessionStorage.getItem("token"),
    };
  }
};

export default Auth;
