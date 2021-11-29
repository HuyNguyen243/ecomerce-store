var SnackbarHelper = {
  show: function (message, time = 3000) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerText = message;
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, time);
  },
};

export default SnackbarHelper;
