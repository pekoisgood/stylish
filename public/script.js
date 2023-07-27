import getProductList from "./views/productList.js";
import campaignList from "./views/campaignList.js";
import showError from "./views/showError.js";

const url = `https://api.appworks-school.tw/api/1.0/`;
// productListAPI = "https://api.appworks-school.tw/api/1.0/products/women?paging=1"

// searchAPI = "https://api.appworks-school.tw/api/1.0/products/search?keyword=洋裝&paging=1"

// campaogns API = "https://api.appworks-school.tw/api/1.0/marketing/campaigns"

const menuButtons = document.querySelectorAll(".menu-button");
const searchIconMobile = document.querySelector(".search-icon-mobile");
const searchIconWrapper = document.querySelector(".search-wrapper-mobile");
const searchInputs = document.querySelectorAll("#search-wrapper input");
const searches = document.querySelectorAll("#search-icon");
const cartIconNumber = document.getElementById("cart-icon-number");
const cartIconNumberMobile = document.getElementById("cart-icon-number-mobile");

const campaignContainer = document.querySelector(".carousel-container");

const productsContainer = document.querySelector(".products-container");

let endpoint = "";

let nextPage;

// let timerId = null;
let lastFetchTime = 0;

// url endpoint
function getEndpoint() {
  if (window.location.search) {
    const paramString = decodeURI(window.location.search);
    const searchParams = new URLSearchParams(paramString);
    if (searchParams.has("keyword")) {
      endpoint = `products/search?keyword=${searchParams.get("keyword")}`;
    } else if (searchParams.has("category")) {
      endpoint = `products/${searchParams.get("category")}`;
    } else {
      endpoint = "";
    }
  } else {
    // initial loading endpoint
    endpoint = "products/all";
  }
  return endpoint;
}

// loading animation
function loadingAnimate() {
  productsContainer.innerHTML = `
    <div class="full-width">
      <img src="./assets/images/loading.gif" />
    </div>
  `;
}

// fetching API for products and prodct's details

async function getProduct(url) {
  try {
    loadingAnimate();
    const res = await fetch(url);
    const data = await res.json();
    nextPage = await data.next_paging;
    productsContainer.innerHTML = "";
    getProductList(data);
    // productList = getProductList(data);
    if (!data.data.length > 0) {
      productsContainer.innerHTML = `<div class="full-width">No product found</div>`;
    }
  } catch (error) {
    console.log("Error fetching data", error);
    showError(error);
  }
}

// AJAX for each product categories
function bindMenuButtons() {
  menuButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      loadingAnimate();
      let queryString = btn.value;
      await getProduct(url + "products/" + queryString);
      window.history.pushState(
        null,
        null,
        `?category=${btn.value}${nextPage ? `&paging=${nextPage - 1}` : ""}`
      );
    });
  });
}

// get product when clicking back and foreward page without reloading
function bindPopstate() {
  window.addEventListener("popstate", (e) => {
    e.preventDefault();
    getProduct(url + getEndpoint());
  });
}

// search feature
function handleSearch() {
  searches.forEach((search) =>
    search.addEventListener("click", (e) => {
      e.preventDefault();
      [...searchInputs].forEach(async (searchInput) => {
        if (searchInput.value) {
          const searchAPI =
            url + `products/search?keyword=${searchInput.value}`;
          await getProduct(searchAPI);
          window.history.pushState(
            null,
            null,
            `?${searchInput.name}=${searchInput.value}`
          );
          searchInput.value = "";
        }
      });
      searchIconWrapper.style.display = "none";
    })
  );

  // search feature for mobile device
  searchIconMobile.addEventListener("click", (e) => {
    // prevent bubbling
    e.stopPropagation();
    searchIconWrapper.style.display = "flex";
  });

  searchIconWrapper.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // click elsewhere to hide the search-field in mobile
  document.querySelector("body").addEventListener("click", () => {
    searchIconWrapper.style.display = "none";
  });
}

// infinite scroll
async function loadProduct(url) {
  const nextPageAPI = url + `?paging=${nextPage}`;
  // fetch next_page's product
  try {
    const res = await fetch(nextPageAPI);
    const data = await res.json();
    if (nextPage !== data.next_paging) {
      nextPage = await data.next_paging;
      getProductList(data);
    }
  } catch (error) {
    console.log("Error fetching more data", error);
    showError(error);
  }
}

function bindScrollEvent() {
  window.addEventListener("scroll", async () => {
    const innerHeight = window.innerHeight;
    const bottom = document.body.getBoundingClientRect().bottom;

    if (innerHeight + 100 > bottom) {
      // prevent loading multiple times in 1 second

      let now = Date.now();
      if (now - lastFetchTime >= 1000) {
        if (nextPage) {
          loadProduct(url + getEndpoint());
        }
      }
      lastFetchTime = Date.now();

      // if (!timerId)
      //   timerId = setTimeout(async () => {
      //     nextPage ? await loadProduct(url + getEndpoint()) : "";
      //     timerId = null;
      //   }, 1000);
    }
  });
}

async function getCampaign() {
  try {
    const res = await fetch(url + "marketing/campaigns");
    const data = await res.json();
    campaignList(data);
    campaignSlideEffect();
  } catch (error) {
    console.log("Error fetching campaign", error);
    showError(error);
  }
}

// Campaign slide effect
function campaignSlideEffect() {
  const campaigns = document.querySelectorAll(".carousel-img-wrapper");
  const dots = document.querySelectorAll(".carousel-dot");

  let currentIndex = 0;
  let nIntervalId;

  function progressInterval() {
    // check if an interval has already been set up
    if (!nIntervalId) {
      nIntervalId = setInterval(progress, 5000);
    }
  }

  function stopProgress() {
    clearInterval(nIntervalId);
    // release intervalID from the varible
    nIntervalId = null;
  }

  // start interval
  progressInterval();
  // initial loading campaign
  progress();

  function progress() {
    campaigns.forEach((campaign, index) => {
      // campaign.style.transition = "all ease-in";
      if (currentIndex === index) {
        campaign.classList.remove("carousel--not-active");
        campaign.classList.add("carousel--active");
      } else {
        campaign.classList.remove("carousel--active");
        campaign.classList.add("carousel--not-active");
      }
    });

    dots.forEach((dot, index) => {
      if (currentIndex === index) {
        dot.classList.add("active-dot");
      } else {
        dot.classList.remove("active-dot");
      }
    });

    currentIndex + 1 < campaigns.length ? currentIndex++ : (currentIndex = 0);
  }

  // clicking on dot to that campaign
  dots.forEach((dot, index) => {
    dot.onclick = () => {
      currentIndex = index;
      stopProgress();
      progressInterval();
      progress();
    };
  });

  // hover to stop the interval
  campaignContainer.addEventListener("mouseover", () => stopProgress());

  // restart timer when cursor moves away
  campaignContainer.addEventListener("mouseout", () => progressInterval());
}

// active button
function bindActiveButton() {
  for (let i = 0; i < menuButtons.length; i++) {
    menuButtons[i].addEventListener("click", function () {
      const current = document.getElementsByClassName("active");
      [...current].forEach((btn) => {
        btn.className = btn.className.replace(" active", "");
      });
      this.className += " active";
    });
  }
}

// update cart icon number
function updateCartIcon() {
  const cart = JSON.parse(window.localStorage.getItem("cart"));

  if (cart) {
    cartIconNumber.innerText = cart.length;
    cartIconNumberMobile.innerText = cart.length;
  }
}

function main() {
  // initial load
  getCampaign();
  getProduct(url + getEndpoint());
  bindActiveButton();
  bindMenuButtons();
  bindPopstate();
  handleSearch();
  bindScrollEvent();
  updateCartIcon();
}

main();
