var AlertHelper = {
  show: function (message) {
    var x = document.getElementById("myModal");
    x.className = "show";
    var text = document.getElementById("text");
    text.innerText = message;
    x.className = x.className.replace("hide", "show");
  },
  hide: function () {
    var x = document.getElementById("myModal");
    x.className = "hide";
    x.className = x.className.replace("show", "hide");
  },
  hidePromotion: function () {
    var x = document.getElementById("promotion");
    x.className = "hide";
    x.className = x.className.replace("show", "hide");
  },
  inputPromotion: function () {
    var x = document.getElementById("promotion");
    x.className = "show";
    x.className = x.className.replace("hide", "show");
  },
};

export default AlertHelper;
