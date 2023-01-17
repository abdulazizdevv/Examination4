let elForm = document.querySelector(".js-form");
let elNameInput = document.querySelector(".js-name");
let elPhoneInput = document.querySelector(".js-phone");
let elEmailInput = document.querySelector(".js-email");
let elPasswordInput = document.querySelector(".js-password");
let elEye = document.getElementById("eye");

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

  fetch("http://10.10.0.224:5000/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: elNameInput.value,
      phone: elPhoneInput.value,
      email: elEmailInput.value,
      password: elPasswordInput.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        location.replace("main.html");
      }
    })
    .catch((err) => console.log(err));
});
