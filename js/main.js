let elForm = document.querySelector(".js-form");
let elNameInput = document.querySelector(".js-name");
let elDescInput = document.querySelector(".js-desc");
let elFileInput = document.querySelector(".js-file");
let elPriceInput = document.querySelector(".js-price");
let elList = document.querySelector(".js-list");

const logout = document.querySelector(".js-logOut");
const localData = localStorage.getItem("token");
console.log(localData);

if (!localData) {
  location.replace("login.html");
}

logout.addEventListener("click", (evt) => {
  localStorage.removeItem("token");
  location.reload();
});
const renderProduct = (array, node) => {
  node.innerHTML = "";
  array.forEach((product) => {
    node.innerHTML += `
          <div class="card mt-5 shadow" style="width: 18rem;">
              <img src="http://10.10.0.224:5000/${product.product_img}" class="card-img-top" alt="cars">
              <div class="card-body">
                  <h5 class="card-title">${product.product_name}</h5>
                  <h5>${product.product_price}</h5>
                  <p class="card-text">${product.product_desc}</p>
                  <div class="d-flex justify-content-around">
                  </div>
              </div>
          `;
  });
};

async function getProducts() {
  const res = await fetch("http://10.10.0.224:5000/product", {
    headers: {
      Authorization: localData,
    },
  });
  const data = await res.json();
  console.log(data);
  renderProduct(data, elList);
}

getProducts();
