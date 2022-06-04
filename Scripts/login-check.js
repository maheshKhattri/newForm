
  if (window.location.href.indexOf("success-login") > -1) {
    localStorage.setItem("isLoggedIn", "true");
  }
  document.getElementById("logout").addEventListener("click", () => {
    localStorage.clear();
    // localStorage.setItem("isLoggedIn", "false");
    window.location.href = "./../public/login.html";
  })
  if (localStorage.getItem("isLoggedIn") == "false") {
    localStorage.clear();
    window.location.href = "./../public/login.html";
   
  }
 