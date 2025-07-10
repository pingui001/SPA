const routes = {
  "/": "./users.html",
  "/users": "./users.html",
  "/newuser": "./newuser.html",
  "/about": "./about.html",
  "/login": "./login.html"
};

let counter = 0

function isAuth(){
 const result = localStorage.getItem("Auth") || null
 const resultBool = result === "true"
 return resultBool;
}



document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    navigate(e.target.getAttribute("href"));
  }
});

async function navigate(pathname) {

if (!isAuth()){
  pathname = "/login";
}

  const route = routes[pathname];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  history.pushState({}, "", pathname);

  if (pathname === "/about") setupCounter();
  if (pathname === "/login") setupLoginForm();
}

function setupLoginForm (){
const userAuth = "admin"
const passAuth = "1234"

  const form = document.getElementById("login-spa")

  form.addEventListener("submit", (e)=> {
    e.preventDefault()

  const user = document.getElementById("user").value
  const pass = document.getElementById("password").value

if (user === userAuth && pass === passAuth){
  localStorage.setItem("Auth", "true")
  navigate("/users")
} else {
  alert("usuario o contraseña son incorrectos")
}
  
  })
}

  const buttonCloseSession = document.getElementById("close-sesion");
  buttonCloseSession.addEventListener("click", ()=>{
    localStorage.setItem("Auth", "false");
    navigate("/login");

  })


window.addEventListener("popstate", () =>
  navigate(location.pathname)
);



/*const form = document.getElementById(login-spa)
form.addEventListener("submit", (e)=> {
  console.log(e)
  e.preventDefault()
  console.log("submit")
})
*/