let elForm = document.querySelector(".js-form");
let elNameInput = document.querySelector(".js-name");
let elDescInput = document.querySelector(".js-desc");
let elFileInput = document.querySelector(".js-file");
let elPriceInput = document.querySelector(".js-price");
let elList = document.querySelector(".js-list");

const localData = localStorage.getItem("token");
console.log(localData);

if (!localData) {
  location.replace("login.html");
}

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
                      <button data-todo-id=${product.id} class="btn product-edit btn-warning"><img src="./images/edit.svg" alt="edit"> Edit</a>
                          <button data-todo-id=${product.id} class="btn product-delete btn-danger">
                              <img src="./images/x-square.svg" alt="x">
                              Delete</a>
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

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault(elForm);

  const formData = new FormData();
  formData.append("product_name", elNameInput.value);
  formData.append("product_desc", elDescInput.value);
  formData.append("product_img", elFileInput.files[0]);
  formData.append("product_price", elPriceInput.value);

  fetch("http://10.10.0.224:5000/product", {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
      Authorization: localData,
    },
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getProducts();
      }
      renderProduct(data, elList);
    })
    .catch((err) => console.log(err));
});

const deleteProduct = (product_id) => {
  fetch(`http://10.10.0.224:5000/product/${product_id}`, {
    method: "DELETE",
    headers: {
      Authorization: localData,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        getProducts();
      }
    })
    .catch((err) => console.log(err));
};

// const edit = (product_id) => {
//   const formData = new FormData();
//   formData.append("product_name", elNameInput.value);
//   formData.append("product_desc", elDescInput.value);
//   formData.append("product_img", elFileInput.files[0]);
//   formData.append("product_price", elPriceInput.value);

//   fetch(`http://10.10.0.224:5000/product/${product_id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       token: localData,
//     },
//     body: formData,
//   });
// };

elList.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (evt.target.matches(".product-delete")) {
    const productId = evt.target.dataset.todoId;
    deleteProduct(productId);
  }
  //   if (evt.target.matches(".product-edit")) {
  //     document.edit.classList.add("modalbtn");
  //     const productId = evt.target.dataset.todoId;
  //     edit(productId);
  //   }
});
