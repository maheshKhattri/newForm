
  if (window.location.href.indexOf("success-login") > -1) {
    localStorage.setItem("isLoggedIn", "true");
  }
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "./../public/login.html";
  })
  if (localStorage.getItem("isLoggedIn") == "false") {
    window.location.href = "./../public/login.html";
  }
 