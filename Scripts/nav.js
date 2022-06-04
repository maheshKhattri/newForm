const btn_toggle = document.querySelector(".btn-toggle");
const sidebar = document.querySelector(".sidebar");
const logo = document.querySelector(".logo");
const wrapper = document.querySelector(".wrapper");
const logo_name = document.querySelector(".logo-name");
btn_toggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  if (sidebar.classList.contains("active")) {
    logo.setAttribute("style", "display:flex");
    logo_name.setAttribute("style", "display:block");
    wrapper.setAttribute("style", "left:240px;width:clac(100%-240px)");
    return;
  }
  logo.setAttribute("style", "display:none");
  wrapper.setAttribute("style", "left:80px");
});
if (window.location.href.indexOf("success-login") > -1) {
  localStorage.setItem("isLogged", "true");
}
document.getElementById("logout").addEventListener("click", () => {
  localStorage.clear();
  // localStorage.setItem("isLogged",false)
  window.location.href = "./../public/login.html";
});
if (localStorage.getItem("isLogged") == "false") {
  localStorage.clear();
  window.location.href = "./../public/login.html";
  
}

// document.getElementById("form").addEventListener("click", () => {
//   window.location.href = "./form.html";
// })

//   }else{
//     localStorage.setItem("isLogged",true)
//   }
