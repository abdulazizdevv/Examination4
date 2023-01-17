let elForm = document.querySelector("form");
let elEmailInput = document.querySelector(".js-email");
let elPasswordInput = document.querySelector(".js-password");
let elEye = document.getElementById("eye");
console.log(elEye);
elEye.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (elPasswordInput.type === "password") {
    elPasswordInput.type = "text";
  } else {
    elPasswordInput.type = "password";
  }
});

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  fetch("http://10.10.0.224:5000/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.replace("main.html");
      }
    });
});
