const productBoxes = document.querySelector("#product-boxes");
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

const getApiData = async (url) => {
  const promise = await axiosInstance.get(url);
  return promise.data;
};

const renderCards = (data) => {
  return `  <div class="product-card">
              <div class="product-img">
                <img src=${data?.image}>
                <div class="position-el">
                  <button>Hot</button>
                </div>
                <div class="position-img">
                  <img src=${data?.hoverImg} alt="" />
                </div>
                <div class="pos-icon">
                <i class="ri-heart-line"></i>
                <i class="ri-donut-chart-fill"></i>
                <i class="ri-eye-line"></i>
                </div>
              </div>
              <div class="product-body">
                <h2 class="title">${data?.title}</h2>
                <h3 class="name">${data?.name}</h3>
                <div class="stars">
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                </div>
                <p class="desc">
              ${data?.desc}
                </p>
                <div class="price">
                        <span class="new-price">${data?.price[0]["new-price"]}</span>
                  <span class="old-price">${data?.price[0]["old-price"]}</span>
                </div>
                <button class="addtocard">Add to card</button>
                <span><i class="ri-arrow-go-forward-fill"></i>Add Compare</span>
              </div>
            </div>`;
};

const addToCart = document.querySelectorAll(".addtocard");
const count = document.querySelector(".count-pr");
let productCount = 0;

getApiData("products").then((data) => {
  data?.forEach((cards) => {
    productBoxes.innerHTML += renderCards(cards);
  });

  const addToCart = document.querySelectorAll(".addtocard");
  addToCart.forEach((btn) => {
    btn.addEventListener("click", () => {
      localStorage.setItem("product", "count");
      productCount++;
      count.innerHTML = productCount;
    });
  });
});

const cartbtn = document.querySelector(".ri-shopping-cart-2-line");
const yourProducts = document.querySelector(".add-to-cart");
const close = document.querySelector(".close");

cartbtn.addEventListener("click", () => {
  yourProducts.style.display = "flex";
  yourProducts.classList.add("transformCard");
});
close.addEventListener("click", () => {
  yourProducts.style.display = "none";
});

const loading = document.querySelector(".loading");

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    loading.style.display = "none";
  }, 2000);
});

const modeBtn = document.querySelector("#dark-mode");
const moonBtn = document.querySelector(".ri-moon-line");
const sunBtn = document.querySelector(".ri-sun-line");

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("darkItems");
  localStorage.setItem("Mode", "Dark");

  if (document.body.classList.contains("darkItems")) {
    sunBtn.style.display = "flex";
    moonBtn.style.display = "none";
  } else {
    sunBtn.style.display = "none";
    moonBtn.style.display = "flex";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("Mode") === "Dark") {
    document.body.classList.toggle("darkItems");
  }
});
