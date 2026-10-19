/* =====================================================
   MESHKART — FRONTEND APPLICATION
===================================================== */

"use strict";


/* =====================================================
   CONFIGURATION
===================================================== */

const CONFIG = {
  API_BASE_URL: "https://meshkart-backend.onrender.com",

  MAX_PRODUCTS: 5000,

  STORAGE: {
    PRODUCTS: "meshkart_products_v1",
    CART: "meshkart_cart_v1",
    ORDERS: "meshkart_orders_v1",
    WISHLIST: "meshkart_wishlist_v1"
  }
};


/* =====================================================
   DEFAULT CATEGORIES
===================================================== */

const DEFAULT_CATEGORIES = [

  {
    name: "Women Fashion",
    icon: "👗"
  },

  {
    name: "Men Fashion",
    icon: "👔"
  },

  {
    name: "Home & Living",
    icon: "🛋️"
  },

  {
    name: "Electronics",
    icon: "🎧"
  },

  {
    name: "Beauty",
    icon: "🧴"
  },

  {
    name: "Footwear",
    icon: "👟"
  },

  {
    name: "Kids",
    icon: "🧸"
  },

  {
    name: "Kitchen Essentials",
    icon: "🍳"
  },

  {
    name: "Bags & Luggage",
    icon: "👜"
  },

  {
    name: "Sports & Fitness",
    icon: "🏋️"
  },

  {
    name: "Jewellery",
    icon: "💍"
  },

  {
    name: "Automotive",
    icon: "🚗"
  }

];


/* =====================================================
   SAMPLE PRODUCTS

   These are demonstration products.
   Replace their details with your own.
===================================================== */

const SAMPLE_PRODUCTS = [

  {
    id: "MK1001",
    name: "Stylish Women's Kurti",
    brand: "MeshKart Collection",
    category: "Women Fashion",
    price: 499,
    originalPrice: 999,
    stock: 25,
    image: "",
    images: [],
    description:
      "A versatile everyday kurti. Add your own product description, fabric details and care instructions here.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Pink", "Purple", "Black"],
    specifications: {
      Material: "Add material",
      Pattern: "Add pattern",
      Fit: "Regular"
    },
    featured: true
  },

  {
    id: "MK1002",
    name: "Classic Men's Casual Shirt",
    brand: "MeshKart Collection",
    category: "Men Fashion",
    price: 599,
    originalPrice: 1199,
    stock: 20,
    image: "",
    images: [],
    description:
      "A casual shirt suitable for everyday wear. Replace this sample description with your own details.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "White", "Black"],
    specifications: {
      Material: "Add material",
      Sleeve: "Full sleeve",
      Fit: "Regular"
    },
    featured: true
  },

  {
    id: "MK1003",
    name: "Everyday Running Shoes",
    brand: "MeshKart Collection",
    category: "Footwear",
    price: 799,
    originalPrice: 1499,
    stock: 30,
    image: "",
    images: [],
    description:
      "Comfortable everyday footwear. Enter the actual product material, size guide and care details.",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["Black", "White"],
    specifications: {
      Material: "Add material",
      Sole: "Add sole details",
      Closure: "Lace-up"
    },
    featured: true
  },

  {
    id: "MK1004",
    name: "Modern Home Decor Lamp",
    brand: "MeshKart Home",
    category: "Home & Living",
    price: 699,
    originalPrice: 1299,
    stock: 15,
    image: "",
    images: [],
    description:
      "A decorative lamp for modern living spaces. Add dimensions, wattage and material details.",
    sizes: [],
    colors: ["White", "Gold"],
    specifications: {
      Material: "Add material",
      Power: "Add power details"
    },
    featured: true
  },

  {
    id: "MK1005",
    name: "Wireless Headphones",
    brand: "MeshKart Electronics",
    category: "Electronics",
    price: 999,
    originalPrice: 1799,
    stock: 18,
    image: "",
    images: [],
    description:
      "Wireless headphones. Add actual battery life, connectivity, compatibility and warranty information.",
    sizes: [],
    colors: ["Black", "White"],
    specifications: {
      Connectivity: "Add connectivity",
      Battery: "Add battery details",
      Warranty: "Add warranty"
    },
    featured: true
  },

  {
    id: "MK1006",
    name: "Kids Everyday T-Shirt",
    brand: "MeshKart Kids",
    category: "Kids",
    price: 249,
    originalPrice: 499,
    stock: 40,
    image: "",
    images: [],
    description:
      "An everyday kids' T-shirt. Add fabric, age group, size and washing instructions.",
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    colors: ["Yellow", "Blue", "Pink"],
    specifications: {
      Material: "Add material",
      AgeGroup: "Add age group"
    },
    featured: true
  },

  {
    id: "MK1007",
    name: "Premium Travel Backpack",
    brand: "MeshKart Accessories",
    category: "Bags & Luggage",
    price: 649,
    originalPrice: 1299,
    stock: 12,
    image: "",
    images: [],
    description:
      "A versatile travel backpack. Add capacity, dimensions, material and compartment details.",
    sizes: [],
    colors: ["Black", "Blue"],
    specifications: {
      Capacity: "Add capacity",
      Material: "Add material"
    },
    featured: true
  },

  {
    id: "MK1008",
    name: "Kitchen Storage Container Set",
    brand: "MeshKart Home",
    category: "Kitchen Essentials",
    price: 399,
    originalPrice: 799,
    stock: 22,
    image: "",
    images: [],
    description:
      "A kitchen storage set. Add the number of containers, capacities and food-contact material details.",
    sizes: [],
    colors: ["Transparent"],
    specifications: {
      Material: "Add material",
      Pieces: "Add number of pieces"
    },
    featured: true
  }

];


/* =====================================================
   STORAGE HELPERS
===================================================== */

function readStorage(key, fallback = []) {

  try {

    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);

  } catch (error) {

    console.error("Storage read error:", error);

    return fallback;

  }

}


function writeStorage(key, value) {

  try {

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

    return true;

  } catch (error) {

    console.error("Storage write error:", error);

    showToast(
      "Could not save data. Browser storage may be full.",
      "error"
    );

    return false;

  }

}


/* =====================================================
   INITIAL STATE
===================================================== */

let products = readStorage(
  CONFIG.STORAGE.PRODUCTS,
  null
);

if (!Array.isArray(products)) {

  products = SAMPLE_PRODUCTS.map(product => ({
    ...product
  }));

  writeStorage(
    CONFIG.STORAGE.PRODUCTS,
    products
  );

}

let cart = readStorage(
  CONFIG.STORAGE.CART,
  []
);

let orders = readStorage(
  CONFIG.STORAGE.ORDERS,
  []
);

let wishlist = readStorage(
  CONFIG.STORAGE.WISHLIST,
  []
);

let currentPage = "home";

let currentProductId = null;

let currentSearch = "";

let currentCategory = "All";

let currentQuantity = 1;

let selectedSize = "";

let selectedColor = "";

let productPageLimit = 20;

let editingProductId = null;

let adminLoggedIn = false;


/* =====================================================
   HELPERS
===================================================== */

function $(selector) {
  return document.querySelector(selector);
}


function $all(selector) {
  return [...document.querySelectorAll(selector)];
}


function escapeHTML(value) {

  return String(value ?? "").replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );

}


function safeImageURL(value) {

  if (!value) {
    return "";
  }

  try {

    const url = new URL(value);

    if (
      url.protocol === "https:" ||
      url.protocol === "http:"
    ) {
      return url.href;
    }

  } catch (error) {

    return "";

  }

  return "";

}


function formatPrice(value) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2
    }
  ).format(Number(value) || 0);

}


function discountPercentage(product) {

  const price = Number(product.price);

  const original = Number(product.originalPrice);

  if (
    !original ||
    original <= price ||
    original <= 0
  ) {
    return 0;
  }

  return Math.round(
    ((original - price) / original) * 100
  );

}


function generateId(prefix = "MK") {

  return (
    prefix +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  );

}


function showToast(message, type = "") {

  const container = $("#toastContainer");

  if (!container) {
    return;
  }

  const toast = document.createElement("div");

  toast.className = `toast ${type}`;

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {

    toast.remove();

  }, 3500);

}

// ======================================================
// MESHKART - LOAD PRODUCTS FROM NEON DATABASE
// ======================================================

async function loadProductsFromBackend() {
  try {
    const apiBase = CONFIG.API_BASE_URL;

    if (!apiBase) {
      console.warn("MeshKart API URL is not configured.");
      return;
    }

    let allProducts = [];
    let offset = 0;
    const limit = 100;

    while (true) {
      const response = await fetch(
        `${apiBase}/api/products?limit=${limit}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error(`Products API returned ${response.status}`);
      }

      const result = await response.json();

      if (!result.success || !Array.isArray(result.products)) {
        throw new Error("Invalid products API response.");
      }

      allProducts.push(...result.products);

      if (result.products.length < limit) {
        break;
      }

      offset += limit;
    }

    // Convert backend fields into the format used by the storefront.
    const backendProducts = allProducts.map(product => ({
      id: String(product.id),
      name: product.name || "",
      brand: product.brand || "MeshKart Collection",
      category: product.category || "",
      description: product.description || "",
      price: Number(product.price || 0),
      originalPrice: Number(
        product.original_price ?? product.price ?? 0
      ),
      stock: Number(product.stock || 0),
      image: product.image_url || "",
      images: Array.isArray(product.images) ? product.images : [],
      sizes: Array.isArray(product.sizes) ? product.sizes : [],
      colors: Array.isArray(product.colors) ? product.colors : [],
      specifications: product.specifications || {},
      featured: product.featured === true
    }));

    // Keep existing demo products; backend products replace matching IDs.
    const backendIds = new Set(
      backendProducts.map(product => String(product.id))
    );

    const demoProducts = SAMPLE_PRODUCTS.filter(
      product => !backendIds.has(String(product.id))
    );

    products = [...backendProducts, ...demoProducts];

    writeStorage(CONFIG.STORAGE.PRODUCTS, products);

    // Refresh the storefront using the latest database data.
    renderHomeCategories();
    renderAllCategories();
    renderProducts();
    updateCartCount();

    console.log(
      `MeshKart: loaded ${backendProducts.length} products from backend.`
    );
  } catch (error) {
    console.error("Could not load products from backend:", error);
    showToast(
      "Latest products could not be loaded. Showing saved products.",
      "error"
    );
  }
}
function persistProducts() {

  return writeStorage(
    CONFIG.STORAGE.PRODUCTS,
    products
  );

}


function persistCart() {

  return writeStorage(
    CONFIG.STORAGE.CART,
    cart
  );

}


function persistOrders() {

  return writeStorage(
    CONFIG.STORAGE.ORDERS,
    orders
  );

}


function persistWishlist() {

  return writeStorage(
    CONFIG.STORAGE.WISHLIST,
    wishlist
  );

}


/* =====================================================
   NAVIGATION
===================================================== */

const PAGE_IDS = {

  home: "homePage",

  categories: "categoriesPage",

  product: "productPage",

  cart: "cartPage",

  checkout: "checkoutPage",

  confirmation: "confirmationPage",

  orders: "ordersPage",

  tracking: "trackingPage",

  account: "accountPage",

  admin: "adminPage"

};

function showPage(pageName, options = {}) {

if (!PAGE_IDS[pageName]) {
pageName = "home";
}

// CUSTOMER LOGIN CHECK
// Real Google authentication will be connected next.
const customerToken = localStorage.getItem("meshkart_customer_token");

if (
["checkout", "orders"].includes(pageName) &&
!customerToken &&
!options.allowEmpty
) {

// Remember the page the customer wanted to open.
sessionStorage.setItem(
  "meshkart_pending_page",
  pageName
);

showToast(
  "Please sign in with Google to continue.",
  "error"
);

pageName = "account";

}

if (
pageName === "checkout" &&
cart.length === 0 &&
!options.allowEmpty
) {

showToast(
  "Your cart is empty. Select a product first.",
  "error"
);

pageName = "home";

}

currentPage = pageName;

$all(".page").forEach(page => {
page.classList.remove("active");
});

const page = $("#" + PAGE_IDS[pageName]);

if (page) {
page.classList.add("active");
}

closeMobileMenu();

if (pageName === "home") {
renderProducts();
}

if (pageName === "categories") {
renderAllCategories();
}

if (pageName === "cart") {
renderCart();
}

if (pageName === "checkout") {
renderCheckoutSummary();
}
if (pageName === "orders") {
loadCustomerOrders();
}

if (pageName === "admin" && adminLoggedIn) {
renderAdminDashboard();
}

window.scrollTo({
top: 0,
behavior: "smooth"
});

}



function navigateFromElement(element) {

  const pageName = element.dataset.page;

  if (!pageName) {
    return;
  }

  showPage(pageName);

}


document.addEventListener("click", event => {

  const pageButton = event.target.closest("[data-page]");

  if (pageButton) {

    event.preventDefault();

    navigateFromElement(pageButton);

  }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenu = $("#mobileMenu");

const mobileMenuBackdrop = $("#mobileMenuBackdrop");


function openMobileMenu() {

  mobileMenu.classList.add("open");

  mobileMenuBackdrop.classList.add("open");

  document.body.style.overflow = "hidden";

}


function closeMobileMenu() {

  mobileMenu.classList.remove("open");

  mobileMenuBackdrop.classList.remove("open");

  document.body.style.overflow = "";

}


$("#menuToggle").addEventListener(
  "click",
  openMobileMenu
);


$("#closeMobileMenu").addEventListener(
  "click",
  closeMobileMenu
);


mobileMenuBackdrop.addEventListener(
  "click",
  closeMobileMenu
);


/* =====================================================
   CATEGORY NAVIGATION
===================================================== */

function selectCategory(category) {

  currentCategory = category;

  currentSearch = "";

  $("#searchInput").value = "";

  $("#productsHeading").textContent =
    category === "All"
      ? "Trending Products"
      : category;

  showPage("home");

  renderProducts();

  $("#productsSection").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


$("#categoryNavigation").addEventListener(
  "click",
  event => {

    const button = event.target.closest(
      "[data-category]"
    );

    if (!button) {
      return;
    }

    const category = button.dataset.category;

    if (category === "More") {

      showPage("categories");

      return;

    }

    selectCategory(category);

  }
);


/* =====================================================
   CATEGORY GRID
===================================================== */

function getCategoryList() {

  const availableCategories = products
    .map(product => product.category)
    .filter(Boolean);

  return [
    ...new Set([
      ...DEFAULT_CATEGORIES.map(item => item.name),
      ...availableCategories
    ])
  ];

}


function categoryIcon(category) {

  const item = DEFAULT_CATEGORIES.find(
    item => item.name === category
  );

  return item ? item.icon : "🛍️";

}


function categoryImage(category) {

  const categoryProduct = products.find(
    product =>
      product.category === category &&
      safeImageURL(product.image)
  );

  return categoryProduct
    ? safeImageURL(categoryProduct.image)
    : "";

}


function renderCategoryCards(container) {

  if (!container) {
    return;
  }

  const categories = getCategoryList();

  container.innerHTML = categories.map(category => {

    const image = categoryImage(category);

    const visual = image

      ? `
        <div class="category-visual">
          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(category)}"
            loading="lazy"
          >
        </div>
      `

      : `
        <div class="category-visual">
          ${categoryIcon(category)}
        </div>
      `;

    return `

      <button
        class="category-card"
        data-select-category="${escapeHTML(category)}"
      >

        ${visual}

        <strong>${escapeHTML(category)}</strong>

      </button>

    `;

  }).join("");

}


function renderAllCategories() {

  renderCategoryCards(
    $("#allCategoriesGrid")
  );

}


function renderHomeCategories() {

  renderCategoryCards(
    $("#categoryGrid")
  );

}


document.addEventListener("click", event => {

  const categoryButton = event.target.closest(
    "[data-select-category]"
  );

  if (!categoryButton) {
    return;
  }

  selectCategory(
    categoryButton.dataset.selectCategory
  );

});


/* =====================================================
   PRODUCT FILTERING
===================================================== */

function getFilteredProducts() {

  const search = currentSearch
    .trim()
    .toLowerCase();

  return products.filter(product => {

    const matchesCategory =
      currentCategory === "All" ||
      product.category === currentCategory;

    const searchableText = [

      product.name,

      product.brand,

      product.category,

      product.description,

      product.id

    ].join(" ").toLowerCase();

    const matchesSearch =
      !search ||
      searchableText.includes(search);

    return matchesCategory && matchesSearch;

  });

}


/* =====================================================
   PRODUCT IMAGE HELPERS
===================================================== */

function productImageMarkup(product, className = "") {

  const image = safeImageURL(product.image);

  if (image) {

    return `

      <img
        class="${className}"
        src="${escapeHTML(image)}"
        alt="${escapeHTML(product.name)}"
        loading="lazy"
      >

    `;

  }

  return `

    <div class="product-image-placeholder ${className}">

      <span>＋</span>

      <span>Product Image</span>

    </div>

  `;

}


/* =====================================================
   PRODUCT CARD
===================================================== */

function createProductCard(product) {

  const discount = discountPercentage(product);

  const isWishlisted = wishlist.includes(product.id);

  return `

    <article class="product-card">

      <div
        class="product-card-image"
        data-open-product="${escapeHTML(product.id)}"
      >

        ${productImageMarkup(product)}

        ${
          discount > 0

            ? `
              <span class="product-badge">
                ${discount}% OFF
              </span>
            `

            : ""
        }

        <button
          class="wishlist-button ${isWishlisted ? "active" : ""}"
          data-wishlist="${escapeHTML(product.id)}"
          aria-label="Add to wishlist"
          type="button"
        >
          ${isWishlisted ? "♥" : "♡"}
        </button>

      </div>

      <div class="product-card-content">

        <p class="product-card-category">
          ${escapeHTML(product.category)}
        </p>

        <h3
          class="product-card-name"
          data-open-product="${escapeHTML(product.id)}"
        >
          ${escapeHTML(product.name)}
        </h3>

        <div class="product-price-row">

          <strong class="product-price">
            ${formatPrice(product.price)}
          </strong>

          ${
            Number(product.originalPrice) > Number(product.price)

              ? `
                <del class="product-original-price">
                  ${formatPrice(product.originalPrice)}
                </del>
              `

              : ""
          }

        </div>

        ${
          discount > 0

            ? `
              <p class="product-discount">
                ${discount}% OFF
              </p>
            `

            : ""
        }

        <p class="product-delivery-note">
          ${
            Number(product.stock) > 0
              ? "Available to order"
              : "Currently out of stock"
          }
        </p>

      </div>

      <div class="product-card-footer">

        <button
          class="product-quick-button"
          data-open-product="${escapeHTML(product.id)}"
        >
          View Product →
        </button>

      </div>

    </article>

  `;

}


/* =====================================================
   RENDER PRODUCTS
===================================================== */

function renderProducts() {

  const filtered = getFilteredProducts();

  const visible = filtered.slice(
    0,
    productPageLimit
  );

  $("#productGrid").innerHTML = visible
    .map(createProductCard)
    .join("");

  $("#productTotal").textContent =
    `${filtered.length.toLocaleString("en-IN")} products`;

  $("#emptyProducts").classList.toggle(
    "hidden",
    filtered.length > 0
  );

  $("#loadMoreWrapper").classList.toggle(
    "hidden",
    filtered.length <= visible.length
  );

  $("#productsHeading").textContent =

    currentSearch

      ? `Search Results`

      : currentCategory === "All"

        ? "Trending Products"

        : currentCategory;

}


$("#loadMoreButton").addEventListener(
  "click",
  () => {

    productPageLimit += 20;

    renderProducts();

  }
);


$("#shopNowButton").addEventListener(
  "click",
  () => {

    $("#productsSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


$("#exploreMoreButton").addEventListener(
  "click",
  () => {

    currentCategory = "All";

    currentSearch = "";

    showPage("home");

    $("#productsSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


$("#clearSearchButton").addEventListener(
  "click",
  () => {

    currentSearch = "";

    currentCategory = "All";

    $("#searchInput").value = "";

    productPageLimit = 20;

    renderProducts();

  }
);


/* =====================================================
   SEARCH
===================================================== */

$("#searchForm").addEventListener(
  "submit",
  event => {

    event.preventDefault();

    currentSearch = $("#searchInput").value.trim();

    currentCategory = "All";

    productPageLimit = 20;

    showPage("home");

    renderProducts();

    $("#productsSection").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


/* =====================================================
   OPEN PRODUCT
===================================================== */

document.addEventListener("click", event => {

  const productButton = event.target.closest(
    "[data-open-product]"
  );

  if (!productButton) {
    return;
  }

  const id = productButton.dataset.openProduct;

  openProduct(id);

});


function openProduct(productId) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) {

    showToast(
      "This product could not be found.",
      "error"
    );

    return;

  }

  currentProductId = product.id;

  currentQuantity = 1;

  selectedSize = "";

  selectedColor = "";

  renderProductDetails(product);

  showPage("product");

}


/* =====================================================
   PRODUCT DETAILS
===================================================== */

function renderProductDetails(product) {

  const discount = discountPercentage(product);

  $("#productBreadcrumbs").textContent =
    `Home / ${product.category} / ${product.name}`;

  $("#detailBrand").textContent =
    product.brand || "MeshKart Collection";

  $("#detailName").textContent =
    product.name;

  $("#detailRating").textContent =
    "Product details";

  $("#detailPrice").textContent =
    formatPrice(product.price);

  $("#detailOriginalPrice").textContent =
    Number(product.originalPrice) > Number(product.price)

      ? formatPrice(product.originalPrice)

      : "";

  $("#detailDiscount").textContent =
    discount > 0
      ? `${discount}% OFF`
      : "";

  $("#detailDiscount").classList.toggle(
    "hidden",
    discount === 0
  );

  $("#detailDescription").textContent =
    product.description || "No description added yet.";

  $("#detailQuantity").textContent =
    currentQuantity;

  $("#detailStock").textContent =
    Number(product.stock) > 0
      ? `${product.stock} available`
      : "Out of stock";

  $("#deliveryEstimate").textContent =
    "Delivery estimate will be confirmed by the order system.";

  renderProductGallery(product);

  renderOptionGroup(
    "sizeGroup",
    "sizeOptions",
    product.sizes || [],
    "size"
  );

  renderOptionGroup(
    "colorGroup",
    "colorOptions",
    product.colors || [],
    "color"
  );

  renderSpecifications(product);

  renderRelatedProducts(product);

  updateProductButtons(product);

}


function renderProductGallery(product) {

  const images = [
    product.image,
    ...(product.images || [])
  ]
    .map(safeImageURL)
    .filter(Boolean);

  const main = $("#productMainImage");

  const thumbnails = $("#productThumbnails");

  if (images.length === 0) {

    main.innerHTML = `

      <span class="image-placeholder-symbol">＋</span>

      <span>Product Image</span>

    `;

    thumbnails.innerHTML = "";

    return;

  }

  main.innerHTML = `

    <img
      src="${escapeHTML(images[0])}"
      alt="${escapeHTML(product.name)}"
    >

  `;

  thumbnails.innerHTML = images.map((image, index) => `

    <button
      class="product-thumbnail ${index === 0 ? "active" : ""}"
      data-gallery-image="${escapeHTML(image)}"
      aria-label="View product image ${index + 1}"
    >

      <img
        src="${escapeHTML(image)}"
        alt=""
        loading="lazy"
      >

    </button>

  `).join("");

}


document.addEventListener("click", event => {

  const thumbnail = event.target.closest(
    "[data-gallery-image]"
  );

  if (!thumbnail) {
    return;
  }

  const image = thumbnail.dataset.galleryImage;

  $("#productMainImage").innerHTML = `

    <img
      src="${escapeHTML(image)}"
      alt="Product image"
    >

  `;

  $all(".product-thumbnail").forEach(button => {

    button.classList.toggle(
      "active",
      button === thumbnail
    );

  });

});


function renderOptionGroup(
  groupId,
  optionsId,
  values,
  type
) {

  const group = $("#" + groupId);

  const container = $("#" + optionsId);

  group.classList.toggle(
    "hidden",
    values.length === 0
  );

  if (values.length === 0) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = values.map(value => {

    const active =

      type === "size"

        ? selectedSize === value

        : selectedColor === value;

    if (type === "color") {

      const colorMap = {
        Pink: "#f39abd",
        Purple: "#8e57cf",
        Black: "#272727",
        White: "#ffffff",
        Blue: "#4787da",
        Red: "#d94757",
        Yellow: "#f4cf47",
        Green: "#3da975",
        Gold: "#c5a14b",
        Brown: "#94644a"
      };

      const color = colorMap[value] || "#e4d7e5";

      return `

        <button
          class="option-button color-option ${active ? "active" : ""}"
          data-select-color="${escapeHTML(value)}"
          title="${escapeHTML(value)}"
          aria-label="${escapeHTML(value)}"
          style="background:${color}"
        ></button>

      `;

    }

    return `

      <button
        class="option-button ${active ? "active" : ""}"
        data-select-size="${escapeHTML(value)}"
      >

        ${escapeHTML(value)}

      </button>

    `;

  }).join("");

}


document.addEventListener("click", event => {

  const sizeButton = event.target.closest(
    "[data-select-size]"
  );

  if (sizeButton) {

    selectedSize = sizeButton.dataset.selectSize;

    const product = products.find(
      item => item.id === currentProductId
    );

    if (product) {
      renderProductDetails(product);
    }

    return;

  }

  const colorButton = event.target.closest(
    "[data-select-color]"
  );

  if (colorButton) {

    selectedColor = colorButton.dataset.selectColor;

    const product = products.find(
      item => item.id === currentProductId
    );

    if (product) {
      renderProductDetails(product);
    }

  }

});


function renderSpecifications(product) {

  const container = $("#productSpecifications");

  const specifications = product.specifications || {};

  const entries = Object.entries(specifications);

  if (entries.length === 0) {

    container.innerHTML = `
      <p class="field-note">
        No specifications added yet.
      </p>
    `;

    return;

  }

  container.innerHTML = entries.map(([key, value]) => `

    <div class="specification-row">

      <span>${escapeHTML(key)}</span>

      <strong>${escapeHTML(value)}</strong>

    </div>

  `).join("");

}


function renderRelatedProducts(product) {

  const related = products

    .filter(item =>

      item.id !== product.id &&

      item.category === product.category

    )

    .slice(0, 5);

  $("#relatedProductGrid").innerHTML =
    related.map(createProductCard).join("");

}


function updateProductButtons(product) {

  const unavailable =
    Number(product.stock) <= 0;

  $("#addToCartButton").disabled =
    unavailable;

  $("#buyNowButton").disabled =
    unavailable;

  $("#addToCartButton").textContent =
    unavailable ? "Out of Stock" : "Add to Cart";

  $("#buyNowButton").textContent =
    unavailable ? "Unavailable" : "Buy Now";

}


/* =====================================================
   QUANTITY
===================================================== */

$("#quantityMinus").addEventListener(
  "click",
  () => {

    currentQuantity = Math.max(
      1,
      currentQuantity - 1
    );

    $("#detailQuantity").textContent =
      currentQuantity;

  }
);


$("#quantityPlus").addEventListener(
  "click",
  () => {

    const product = products.find(
      item => item.id === currentProductId
    );

    if (!product) {
      return;
    }

    if (currentQuantity >= Number(product.stock)) {

      showToast(
        "You cannot select more than the available stock.",
        "error"
      );

      return;

    }

    currentQuantity++;

    $("#detailQuantity").textContent =
      currentQuantity;

  }
);


/* =====================================================
   WISHLIST
===================================================== */

document.addEventListener("click", event => {

  const button = event.target.closest(
    "[data-wishlist]"
  );

  if (!button) {
    return;
  }

  const id = button.dataset.wishlist;

  if (wishlist.includes(id)) {

    wishlist = wishlist.filter(
      item => item !== id
    );

    showToast("Removed from wishlist.");

  } else {

    wishlist.push(id);

    showToast("Added to wishlist.", "success");

  }

  persistWishlist();

  renderProducts();

});


/* =====================================================
   CART
===================================================== */

function getCartQuantity(productId) {

  const item = cart.find(
    item => item.productId === productId
  );

  return item ? Number(item.quantity) : 0;

}


function addToCart(productId, quantity = 1) {

  const product = products.find(
    item => item.id === productId
  );

  if (!product) {
    showToast("Product not found.", "error");
    return false;
  }

  const existing = cart.find(
    item => item.productId === productId
  );

  const current = existing
    ? Number(existing.quantity)
    : 0;

  const requested = current + Number(quantity);

  if (requested > Number(product.stock)) {

    showToast(
      "Requested quantity is not available.",
      "error"
    );

    return false;

  }

  if (existing) {

    existing.quantity = requested;

  } else {

    cart.push({

      productId,

      quantity: Number(quantity),

      size: selectedSize,

      color: selectedColor

    });

  }

  if (!persistCart()) {
    return false;
  }

  updateCartCount();

  showToast(
    "Product added to your cart.",
    "success"
  );

  return true;

}


$("#addToCartButton").addEventListener(
  "click",
  () => {

    if (!currentProductId) {
      return;
    }

    const success = addToCart(
      currentProductId,
      currentQuantity
    );

    if (success) {
      renderProductDetails(
        products.find(item => item.id === currentProductId)
      );
    }

  }
);


$("#buyNowButton").addEventListener(
  "click",
  () => {

    if (!currentProductId) {
      return;
    }

    const success = addToCart(
      currentProductId,
      currentQuantity
    );

    if (success) {
      showPage("checkout");
    }

  }
);


function updateCartCount() {

  const total = cart.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  $("#cartCount").textContent =
    total > 99 ? "99+" : total;

}


function getCartItemsDetailed() {

  return cart.map(item => {

    const product = products.find(
      product => product.id === item.productId
    );

    if (!product) {
      return null;
    }

    return {
      ...item,
      product
    };

  }).filter(Boolean);

}


function getCartSubtotal() {

  return getCartItemsDetailed().reduce(
    (sum, item) => {

      return sum +
        Number(item.product.price) *
        Number(item.quantity);

    },
    0
  );

}


function renderCart() {

  const container = $("#cartItems");

  const items = getCartItemsDetailed();

  if (items.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-state-icon">🛒</div>

        <h3>Your cart is empty</h3>

        <p>Add some products to start shopping.</p>

        <button
          class="primary-button"
          data-page="home"
        >
          Explore Products
        </button>

      </div>

    `;

    $("#cartSummary").innerHTML = "";

    return;

  }

  container.innerHTML = items.map(item => `

    <article class="cart-item">

      <div class="cart-item-image">

        ${productImageMarkup(item.product)}

      </div>

      <div class="cart-item-info">

        <h3>${escapeHTML(item.product.name)}</h3>

        <p>
          ${
            item.size
              ? `Size: ${escapeHTML(item.size)}`
              : ""
          }

          ${
            item.color
              ? ` ${escapeHTML(item.color)}`
              : ""
          }
        </p>

        <div class="cart-item-price">
          ${formatPrice(item.product.price)}
        </div>

        <div class="cart-item-actions">

          <div class="cart-quantity-control">

            <button
              data-cart-action="decrease"
              data-cart-product="${escapeHTML(item.productId)}"
            >−</button>

            <span>${item.quantity}</span>

            <button
              data-cart-action="increase"
              data-cart-product="${escapeHTML(item.productId)}"
            >+</button>

          </div>

          <button
            class="remove-cart-button"
            data-cart-action="remove"
            data-cart-product="${escapeHTML(item.productId)}"
          >
            Remove
          </button>

        </div>

      </div>

    </article>

  `).join("");

  const subtotal = getCartSubtotal();

  $("#cartSummary").innerHTML = `

    <h2>Order Summary</h2>

    <div class="summary-row">
      <span>Items</span>
      <strong>${items.reduce((sum, item) => sum + item.quantity, 0)}</strong>
    </div>

    <div class="summary-row">
      <span>Subtotal</span>
      <strong>${formatPrice(subtotal)}</strong>
    </div>

    <div class="summary-row">
      <span>Delivery</span>
      <strong>Calculated later</strong>
    </div>

    <div class="summary-total-row">
      <span>Total</span>
      <strong>${formatPrice(subtotal)}</strong>
    </div>

    <p class="summary-note">
      Final charges will be confirmed before the order is placed.
    </p>

    <button
      class="primary-button"
      data-page="checkout"
    >
      Continue to Checkout →
    </button>

  `;

}


document.addEventListener("click", event => {

  const button = event.target.closest(
    "[data-cart-action]"
  );

  if (!button) {
    return;
  }

  const id = button.dataset.cartProduct;

  const action = button.dataset.cartAction;

  const item = cart.find(
    item => item.productId === id
  );

  const product = products.find(
    product => product.id === id
  );

  if (!item) {
    return;
  }

  if (action === "remove") {

    cart = cart.filter(
      item => item.productId !== id
    );

  }

  if (action === "decrease") {

    item.quantity--;

    if (item.quantity <= 0) {

      cart = cart.filter(
        item => item.productId !== id
      );

    }

  }

  if (action === "increase") {

    if (
      product &&
      item.quantity < Number(product.stock)
    ) {

      item.quantity++;

    } else {

      showToast(
        "Available stock limit reached.",
        "error"
      );

    }

  }

  persistCart();

  updateCartCount();

  renderCart();

});


/* =====================================================
   CHECKOUT
===================================================== */

function renderCheckoutSummary() {

  const items = getCartItemsDetailed();

  $("#checkoutItems").innerHTML =
    items.map(item => `

      <div class="checkout-item">

        <div class="checkout-item-image">

          ${productImageMarkup(item.product)}

        </div>

        <div class="checkout-item-info">

          <strong>
            ${escapeHTML(item.product.name)}
          </strong>

          <small>
            Quantity: ${item.quantity}
          </small>

        </div>

        <strong class="checkout-item-price">
          ${formatPrice(
            Number(item.product.price) *
            Number(item.quantity)
          )}
        </strong>

      </div>

    `).join("");

  $("#checkoutTotal").textContent =
    formatPrice(getCartSubtotal());

}


 /* =====================================================
   PLACE ORDER — BACKEND + NEON DATABASE
===================================================== */

$("#addressForm").addEventListener("submit", async event => {

  event.preventDefault();

  const form = event.currentTarget;

  // 1. Check customer authentication
  const customerToken = localStorage.getItem(
    "meshkart_customer_token"
  );

  if (!customerToken) {

    sessionStorage.setItem(
      "meshkart_pending_page",
      "checkout"
    );

    showToast(
      "Please sign in with Google before placing your order.",
      "error"
    );

    showPage("account");
    return;
  }

  // 2. Validate form
  if (!form.reportValidity()) {
    return;
  }

  // 3. Check cart
  if (cart.length === 0) {

    showToast("Your cart is empty.", "error");
    showPage("home");
    return;
  }

  // 4. Get current cart items
  const cartItems = getCartItemsDetailed();

  if (!cartItems.length) {

    showToast(
      "Unable to read your cart. Please refresh and try again.",
      "error"
    );

    return;
  }

  // 5. Only allow actual numeric database product IDs
  const invalidProduct = cartItems.some(item => {

    const id = String(item.product.id ?? "");

    return !/^[1-9]\d*$/.test(id);

  });

  if (invalidProduct) {

    showToast(
      "Some cart products are demo products. Remove them and add products from the live catalogue.",
      "error"
    );

    return;
  }

  // 6. Validate quantities
  const invalidQuantity = cartItems.some(item => {

    const quantity = Number(item.quantity);

    return (
      !Number.isInteger(quantity) ||
      quantity < 1
    );

  });

  if (invalidQuantity) {

    showToast(
      "One or more product quantities are invalid.",
      "error"
    );

    return;
  }

  // 7. Collect customer details
  const formData = new FormData(form);

  const customer = {

    name: String(
      formData.get("customerName") || ""
    ).trim(),

    phone: String(
      formData.get("customerPhone") || ""
    ).trim(),

    email: String(
      formData.get("customerEmail") || ""
    ).trim(),

    pincode: String(
      formData.get("pincode") || ""
    ).trim(),

    state: String(
      formData.get("state") || ""
    ).trim(),

    city: String(
      formData.get("city") || ""
    ).trim(),

    address: String(
      formData.get("address") || ""
    ).trim(),

    landmark: String(
      formData.get("landmark") || ""
    ).trim(),

    payment: "cod"

  };

  // 8. Prevent accidental repeated submissions
  const submitButton = form.querySelector(
    'button[type="submit"]'
  );

  const originalButtonText = submitButton
    ? submitButton.textContent
    : "";

  if (submitButton) {

    if (submitButton.disabled) {
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Placing order...";

  }

  try {

    // 9. Send order to the real backend
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/api/orders`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${customerToken}`
        },

        body: JSON.stringify({

          customer,

          items: cartItems.map(item => ({

            productId: String(item.product.id),
            quantity: Number(item.quantity)

          }))

        })

      }
    );

    const result = await response.json().catch(() => ({}));

    // 10. Handle backend errors
    if (!response.ok || !result.order) {

      throw new Error(
        result.message ||
        result.error ||
        "The server could not place your order."
      );

    }

    const savedOrder = result.order;

    // 11. Create a frontend-compatible order from server data
    const order = {

      id: String(
        savedOrder.orderNumber ||
        savedOrder.order_number ||
        savedOrder.id
      ),

      databaseId: savedOrder.id,

      orderNumber:
        savedOrder.orderNumber ||
        savedOrder.order_number ||
        String(savedOrder.id),

      createdAt:
        savedOrder.createdAt ||
        savedOrder.created_at ||
        new Date().toISOString(),

      customer,

      items: (savedOrder.items || []).map(item => {

        const product = products.find(
          product =>
            String(product.id) === String(item.productId)
        );

        return {

          productId: item.productId,

          name: item.name,

          price: Number(item.price),

          quantity: Number(item.quantity),

          image: product
            ? safeImageURL(product.image)
            : "",

          size: "",
          color: ""

        };

      }),

      subtotal: Number(savedOrder.subtotal || 0),

      deliveryCharge: Number(
        savedOrder.deliveryCharge || 0
      ),

      totalAmount: Number(
        savedOrder.totalAmount ??
        savedOrder.total_amount ??
        savedOrder.subtotal ??
        0
      ),

      status:
        savedOrder.status ||
        "ORDER_PLACED",

      paymentMethod:
        savedOrder.paymentMethod ||
        "COD",

      paymentStatus:
        savedOrder.paymentStatus ||
        "PENDING",

      tracking: {

        confirmedAt: null,
        shippedAt: null,
        deliveredAt: null,
        estimatedDelivery: null

      }

    };

    // 12. Update local order cache only after server success
    orders.unshift(order);

    if (!persistOrders()) {

      // The database order already exists.
      // Do not tell the customer that order creation failed.
      console.error(
        "Order was saved on the server, but local caching failed."
      );

    }

    // 13. Update local product stock for display only
    cartItems.forEach(item => {

      const product = products.find(
        product =>
          String(product.id) === String(item.product.id)
      );

      if (product) {

        product.stock = Math.max(
          0,
          Number(product.stock) -
          Number(item.quantity)
        );

      }

    });

    persistProducts();

    // 14. Clear cart after successful server response
    cart = [];

    persistCart();

    updateCartCount();

    // 15. Show confirmation
    renderConfirmation(order);

    form.reset();

    showPage("confirmation");

    showToast(
      "Your order has been placed successfully!",
      "success"
    );

  } catch (error) {

    console.error("Place order error:", error);

    showToast(
      error.message ||
      "Unable to place your order. Please try again.",
      "error"
    );

  } finally {

    if (submitButton) {

      submitButton.disabled = false;

      submitButton.textContent =
        originalButtonText || "Place Order";

    }

  }

});


/* =====================================================
   ORDER CONFIRMATION
===================================================== */

function renderConfirmation(order) {

  $("#confirmationMessage").textContent =
    "Your order has been placed successfully. Your order details have been saved.";

  const orderNumber =
    order.orderNumber || order.id;

  const totalAmount = Number(
    order.totalAmount ??
    order.subtotal ??
    0
  );

  $("#confirmationDetails").innerHTML = `

    <div class="confirmation-detail-row">

      <span>Order Number</span>

      <strong>${escapeHTML(orderNumber)}</strong>

    </div>

    <div class="confirmation-detail-row">

      <span>Order Date</span>

      <strong>
        ${new Date(order.createdAt).toLocaleString("en-IN")}
      </strong>

    </div>

    <div class="confirmation-detail-row">

      <span>Total Amount</span>

      <strong>${formatPrice(totalAmount)}</strong>

    </div>

    <div class="confirmation-detail-row">

      <span>Payment</span>

      <strong>Cash on Delivery</strong>

    </div>

    <div class="confirmation-detail-row">

      <span>Status</span>

      <strong>${escapeHTML(order.status)}</strong>

    </div>

  `;

}   




/* =====================================================
   MY ORDERS
===================================================== */

function statusClass(status) {

  const normalized = String(status).toLowerCase();

  if (normalized.includes("deliver")) {
    return "status-delivered";
  }

  if (normalized.includes("ship")) {
    return "status-shipped";
  }

  if (normalized.includes("process")) {
    return "status-processing";
  }

  if (normalized.includes("cancel")) {
    return "status-cancelled";
  }

  return "status-pending";

}

/* =====================================================
   LOAD CUSTOMER ORDERS FROM BACKEND
===================================================== */

async function loadCustomerOrders() {
  const container = $("#ordersList");
  const token = localStorage.getItem("meshkart_customer_token");

  if (!container) return;

  if (!token) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Login required</h3>
        <p>Please sign in to view your orders.</p>
        <button class="primary-button" data-page="account">
          Sign In
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="empty-state">
      <h3>Loading your orders...</h3>
      <p>Please wait while we retrieve your order history.</p>
    </div>
  `;

  try {
    const response = await fetch(
      `${CONFIG.API_BASE_URL}/api/orders/my`,
      {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        result.message ||
        result.error ||
        "Could not load your orders."
      );
    }

    if (!Array.isArray(result.orders)) {
      throw new Error("Unexpected response received from the server.");
    }

    orders = result.orders.map(order => ({
      ...order,
      id: String(
        order.orderNumber ||
        order.order_number ||
        order.id
      ),
      databaseId: order.id,
      orderNumber:
        order.orderNumber ||
        order.order_number ||
        String(order.id),
      createdAt:
        order.createdAt ||
        order.created_at ||
        new Date().toISOString(),
      subtotal: Number(
        order.subtotal ??
        order.totalAmount ??
        order.total_amount ??
        0
      ),
      totalAmount: Number(
        order.totalAmount ??
        order.total_amount ??
        order.subtotal ??
        0
      ),
      status: order.status || "ORDER_PLACED",
      items: Array.isArray(order.items)
        ? order.items.map(item => {
            const product = products.find(
              p => String(p.id) === String(item.productId ?? item.product_id)
            );

            return {
              ...item,
              name: item.name || item.productName || item.product_name || "Product",
              price: Number(item.price || 0),
              quantity: Number(item.quantity || 1),
              image: item.image || (product ? product.image : "")
            };
          })
        : []
    }));

    renderOrders();

  } catch (error) {
    console.error("Load customer orders error:", error);

    container.innerHTML = `
      <div class="empty-state">
        <h3>Unable to load orders</h3>
        <p>${escapeHTML(error.message)}</p>
        <button class="primary-button" onclick="loadCustomerOrders()">
          Try Again
        </button>
      </div>
    `;
  }
}
function renderOrders() {

  const container = $("#ordersList");

  if (orders.length === 0) {

    container.innerHTML = `

      <div class="empty-state">

        <div class="empty-state-icon">▤</div>

        <h3>No orders yet</h3>

        <p>Your order history will appear here.</p>

        <button
          class="primary-button"
          data-page="home"
        >
          Start Shopping
        </button>

      </div>

    `;

    return;

  }


  container.innerHTML = orders.map(order => `

    <article class="order-card">

      <div class="order-card-header">

        <div>

          <h3>Order ${escapeHTML(order.id)}</h3>

          <p>
            Placed on
            ${new Date(order.createdAt).toLocaleDateString("en-IN")}
          </p>

        </div>

        <span class="order-status ${statusClass(order.status)}">
          ${escapeHTML(order.status)}
        </span>

      </div>

      <div class="order-card-products">

        ${order.items.map(item => `

          <div class="order-card-product">

            ${
              safeImageURL(item.image)

                ? `
                  <img
                    src="${escapeHTML(item.image)}"
                    alt="${escapeHTML(item.name)}"
                  >
                `

                : `
                  <div class="order-product-placeholder">
                    ＋
                  </div>
                `
            }

            <div class="order-card-product-info">

              <strong>${escapeHTML(item.name)}</strong>

              <small>
                Qty: ${Number(item.quantity)}
                · ${formatPrice(item.price)}
              </small>

            </div>

          </div>

        `).join("")}

      </div>

      <div class="order-card-footer">

        <strong>${formatPrice(order.subtotal)}</strong>

        <div class="order-card-footer-actions">

          <button
            class="secondary-button"
            data-track-order="${escapeHTML(order.id)}"
          >
            Track Order
          </button>

        </div>

      </div>

    </article>

  `).join("");

}


document.addEventListener("click", event => {

  const button = event.target.closest(
    "[data-track-order]"
  );

  if (!button) {
    return;
  }

  renderTracking(
    button.dataset.trackOrder
  );

});


/* =====================================================
   ORDER TRACKING

   Only real status updates should advance tracking.
   No fake automatic shipping statuses.
===================================================== */

const TRACKING_STEPS = [

  "Order Placed",

  "Processing",

  "Shipped",

  "In Transit",

  "Out for Delivery",

  "Delivered"

];


function renderTracking(orderId) {

  const order = orders.find(
    order => order.id === orderId
  );

  if (!order) {

    showToast("Order not found.", "error");

    return;

  }


  const normalizedStatus = String(order.status || "")
  .trim()
  .toLowerCase()
  .replace(/_/g, " ")
  .replace(/\s+/g, " ");

const currentIndex = TRACKING_STEPS.findIndex(
  step => step.toLowerCase() === normalizedStatus
);

  const timeline = TRACKING_STEPS.map(
    (step, index) => {

      const completed =
        currentIndex >= 0 &&
        index <= currentIndex;

      const current =
        index === currentIndex;

      let note = "Awaiting update";

      if (step === "Order Placed") {

        note = new Date(
          order.createdAt
        ).toLocaleString("en-IN");

      }

      if (
        step === order.status &&
        step !== "Order Placed"
      ) {

        note = "Status recorded by the order system";

      }

      return `

        <div class="tracking-step
          ${completed ? "completed" : ""}
          ${current ? "current" : ""}
        ">

          <div class="tracking-step-dot">

            ${completed ? "✓" : index + 1}

          </div>

          <div class="tracking-step-content">

            <h3>${step}</h3>

            <p>${escapeHTML(note)}</p>

          </div>

        </div>

      `;

    }
  ).join("");


  $("#trackingCard").innerHTML = `

    <div class="tracking-header">

      <h2>Order ${escapeHTML(order.id)}</h2>

      <p>
        Ordered on
        ${new Date(order.createdAt).toLocaleString("en-IN")}
      </p>

      <div style="margin-top:12px">

        <span class="order-status ${statusClass(order.status)}">
          ${escapeHTML(order.status)}
        </span>

      </div>

    </div>

    <div class="tracking-timeline">

      ${timeline}

    </div>

    <div class="tracking-disclaimer">

      This is a frontend demonstration. Live shipping updates,
      courier tracking and delivery-agent details require
      integration with a verified logistics data source.

    </div>

  `;


  showPage("tracking");

}


/* =====================================================
   ADMIN LOGIN
===================================================== */
/* =====================================================
   ADMIN LOGIN — BACKEND AUTHENTICATION
===================================================== */

const ADMIN_API_URL =
  `${CONFIG.API_BASE_URL || "https://meshkart-backend.onrender.com"}/api/admin`;

const ADMIN_TOKEN_KEY = "meshkart_admin_token";

let adminToken = sessionStorage.getItem(ADMIN_TOKEN_KEY) || "";


/* ADMIN LOGIN */

$("#adminLoginForm").addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    const username =
      $("#adminUsername").value.trim();

    const password =
      $("#adminCode").value;

    const message =
      $("#adminLoginMessage");

    const submitButton =
      event.currentTarget.querySelector(
        'button[type="submit"]'
      );

    if (!username || !password) {

      message.textContent =
        "Please enter your username and password.";

      message.className =
        "form-message error";

      return;

    }

    message.textContent =
      "Verifying administrator credentials...";

    message.className =
      "form-message";

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {

      const response = await fetch(
        `${ADMIN_API_URL}/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        !data.success ||
        !data.token
      ) {

        throw new Error(
          data.message ||
          data.error ||
          "Invalid username or password."
        );

      }

      adminToken = data.token;

      sessionStorage.setItem(
        ADMIN_TOKEN_KEY,
        adminToken
      );

      const verifyResponse = await fetch(
        `${ADMIN_API_URL}/me`,
        {
          headers: {
            "Authorization":
              `Bearer ${adminToken}`
          }
        }
      );

      if (!verifyResponse.ok) {

        sessionStorage.removeItem(
          ADMIN_TOKEN_KEY
        );

        adminToken = "";

        throw new Error(
          "Login verification failed. Please try again."
        );

      }

      adminLoggedIn = true;

      $("#adminCode").value = "";

      $("#adminLoginCard").classList.add("hidden");

      $("#adminDashboard").classList.remove("hidden");

      message.textContent = "";

      renderAdminDashboard();

      showToast(
        "Admin login successful.",
        "success"
      );

    } catch (error) {

      console.error(
        "Admin login error:",
        error
      );

      message.textContent =
        error.message ||
        "Unable to connect to the server.";

      message.className =
        "form-message error";

    } finally {

      if (submitButton) {
        submitButton.disabled = false;
      }

    }

  }
);


/* ADMIN LOGOUT */

$("#adminLogoutButton").addEventListener(
  "click",
  () => {

    adminLoggedIn = false;

    adminToken = "";

    sessionStorage.removeItem(
      ADMIN_TOKEN_KEY
    );

    $("#adminDashboard").classList.add("hidden");

    $("#adminLoginCard").classList.remove("hidden");

    $("#addProductForm").classList.add("hidden");

    $("#addProductForm").reset();

    editingProductId = null;

    showToast("Logged out successfully.");

  }
);


/* =====================================================
   ADMIN PRODUCT FORM
===================================================== */

$("#showAddProductButton").addEventListener(
  "click",
  () => {

    if (!adminLoggedIn) {
      return;
    }

    editingProductId = null;

    $("#addProductForm").reset();

    $("#productFormHeading").textContent =
      "Add New Product";

    $("#addProductMessage").textContent = "";

    $("#addProductForm").classList.remove("hidden");

    $("#addProductForm").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }
);


$("#cancelProductFormButton").addEventListener(
  "click",
  () => {

    $("#addProductForm").classList.add("hidden");

    $("#addProductForm").reset();

    editingProductId = null;

  }
);


function parseCommaSeparated(value) {

  return String(value || "")

    .split(",")

    .map(item => item.trim())

    .filter(Boolean);

}


function parseSpecifications(value) {

  const result = {};

  String(value || "")
    .split("\n")
    .forEach(line => {

      const separator = line.indexOf(":");

      if (separator === -1) {
        return;
      }

      const key = line
        .slice(0, separator)
        .trim();

      const itemValue = line
        .slice(separator + 1)
        .trim();

      if (key && itemValue) {

        result[key] = itemValue;

      }

    });

  return result;

}


function populateProductForm(product) {

  $("#adminProductName").value =
    product.name || "";

  $("#adminProductBrand").value =
    product.brand || "";

  $("#adminProductCategory").value =
    product.category || "";

  $("#adminProductStock").value =
    Number(product.stock) || 0;

  $("#adminProductPrice").value =
    Number(product.price) || 0;

  $("#adminProductOriginalPrice").value =
    Number(product.originalPrice) || "";

  $("#adminProductImage").value =
    product.image || "";

  $("#adminProductGallery").value =
    (product.images || []).join("\n");

  $("#adminProductDescription").value =
    product.description || "";

  $("#adminProductSizes").value =
    (product.sizes || []).join(", ");

  $("#adminProductColors").value =
    (product.colors || []).join(", ");

  $("#adminProductSpecs").value =
    Object.entries(product.specifications || {})
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

  $("#adminProductFeatured").checked =
    Boolean(product.featured);

}


 $("#addProductForm").addEventListener(
  "submit",
  async event => {

    event.preventDefault();

    if (!adminLoggedIn || !adminToken) {
      showToast("Please login as admin first.", "error");
      return;
    }

    const form = event.currentTarget;
    const submitButton = form.querySelector(
      'button[type="submit"]'
    );
    const message = $("#addProductMessage");

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {

      const name = $("#adminProductName").value.trim();
      const brand = $("#adminProductBrand").value.trim();
      const category = $("#adminProductCategory").value;
      const price = Number($("#adminProductPrice").value);

      const originalPrice =
        Number($("#adminProductOriginalPrice").value) || price;

      const stock = Number($("#adminProductStock").value);

      const imageInput = $("#adminProductImage").value.trim();
      const image = safeImageURL(imageInput);

      const description =
        $("#adminProductDescription").value.trim();

      if (!name || !category || !description) {
        throw new Error(
          "Please complete all required product fields."
        );
      }

      if (!Number.isFinite(price) || price < 0) {
        throw new Error("Enter a valid selling price.");
      }

      if (!Number.isInteger(stock) || stock < 0) {
        throw new Error("Enter a valid stock quantity.");
      }

      if (originalPrice < price) {
        throw new Error(
          "Original price cannot be lower than selling price."
        );
      }

      if (imageInput && !image) {
        throw new Error(
          "Please enter a valid HTTP or HTTPS image URL."
        );
      }

      const gallery = $("#adminProductGallery").value
        .split("\n")
        .map(item => item.trim())
        .filter(Boolean)
        .map(safeImageURL)
        .filter(Boolean);

      const productData = {
        name,
        brand: brand || "MeshKart Collection",
        category,
        description,
        price,
        original_price: originalPrice,
        stock,
        image_url: image,
        images: gallery,
        sizes: parseCommaSeparated(
          $("#adminProductSizes").value
        ),
        colors: parseCommaSeparated(
          $("#adminProductColors").value
        ),
        specifications: parseSpecifications(
          $("#adminProductSpecs").value
        ),
        featured: $("#adminProductFeatured").checked,
        is_active: true
      };

      const isEditing = editingProductId !== null;

      let endpoint =
        `${ADMIN_API_URL}/products`;

      let method = "POST";

      if (isEditing) {

        // Database products have numeric IDs.
        // MK1001, MK1002 etc. are demonstration products.

        if (!/^\d+$/.test(String(editingProductId))) {
          throw new Error(
            "This is a sample product. Add it as a new product to save it permanently."
          );
        }

        endpoint =
          `${ADMIN_API_URL}/products/${encodeURIComponent(editingProductId)}`;

        method = "PUT";
      }

      if (message) {
        message.textContent = isEditing
          ? "Updating product in database..."
          : "Saving product to database...";

        message.className = "form-message";
      }

      const response = await fetch(endpoint, {
        method,

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${adminToken}`
        },

        body: JSON.stringify(productData)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
          result.error ||
          "The server could not save this product."
        );
      }

      // Reload products from Neon after saving.
      await loadProductsFromBackend();

      $("#addProductForm").reset();
      $("#addProductForm").classList.add("hidden");

      editingProductId = null;

      $("#productFormHeading").textContent =
        "Add New Product";

      if (message) {
        message.textContent = "";
      }

      renderProducts();
      renderHomeCategories();
      renderAllCategories();
      renderAdminDashboard();
      updateCartCount();

      showToast(
        isEditing
          ? "Product updated in database successfully."
          : "Product added to database successfully.",
        "success"
      );

    } catch (error) {

      console.error("Product save error:", error);

      if (message) {
        message.textContent =
          error.message || "Could not save product.";

        message.className = "form-message error";
      }

      showToast(
        error.message || "Could not save product.",
        "error"
      );

    } finally {

      if (submitButton) {
        submitButton.disabled = false;
      }

    }

  }
);   


/* =====================================================
   ADMIN DASHBOARD
===================================================== */

function renderAdminDashboard() {

  if (!adminLoggedIn) {
    return;
  }

  $("#adminProductCount").textContent =
    products.length.toLocaleString("en-IN");

  $("#adminOrderCount").textContent =
    orders.length.toLocaleString("en-IN");


  const tbody = $("#adminProductTableBody");

  $("#adminEmptyProducts").classList.toggle(
    "hidden",
    products.length > 0
  );


  tbody.innerHTML = products.map(product => `

    <tr>

      <td>

        <div class="admin-product-name-cell">

          ${
            safeImageURL(product.image)

              ? `
                <img
                  src="${escapeHTML(product.image)}"
                  alt=""
                  loading="lazy"
                >
              `

              : `
                <div class="admin-product-table-placeholder">
                  ＋
                </div>
              `
          }

          <div>

            <strong>${escapeHTML(product.name)}</strong>

            <small>${escapeHTML(product.id)}</small>

          </div>

        </div>

      </td>

      <td>${escapeHTML(product.category)}</td>

      <td>${formatPrice(product.price)}</td>

      <td>${Number(product.stock)}</td>

      <td>

        <div class="admin-action-buttons">

          <button
            data-edit-product="${escapeHTML(product.id)}"
          >
            Edit
          </button>

          <button
            class="delete-button"
            data-delete-product="${escapeHTML(product.id)}"
          >
            Delete
          </button>

        </div>

      </td>

    </tr>

  `).join("");

}


/* =====================================================
   ADMIN EDIT PRODUCT
===================================================== */

document.addEventListener("click", event => {

  const button = event.target.closest(
    "[data-edit-product]"
  );

  if (!button) {
    return;
  }

  if (!adminLoggedIn) {
    return;
  }

  const product = products.find(
    product => product.id === button.dataset.editProduct
  );

  if (!product) {
    return;
  }

  editingProductId = product.id;

  $("#productFormHeading").textContent =
    "Edit Product";

  $("#addProductMessage").textContent = "";

  populateProductForm(product);

  $("#addProductForm").classList.remove("hidden");

  $("#addProductForm").scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

});


/* =====================================================
   ADMIN DELETE PRODUCT
===================================================== */

/* =====================================================
   ADMIN DELETE PRODUCT — NEON DATABASE
===================================================== */

document.addEventListener("click", async event => {

  const button = event.target.closest(
    "[data-delete-product]"
  );

  if (!button) {
    return;
  }

  if (!adminLoggedIn || !adminToken) {
    showToast("Please login as admin first.", "error");
    return;
  }

  const id = String(button.dataset.deleteProduct);

  const product = products.find(
    item => String(item.id) === id
  );

  if (!product) {
    showToast("Product could not be found.", "error");
    return;
  }

  // MK1001 आदि sample products केवल demo हैं।
  if (!/^\d+$/.test(id)) {
    showToast(
      "Sample products cannot be permanently deleted. Delete database products instead.",
      "error"
    );
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete "${product.name}"?`
  );

  if (!confirmed) {
    return;
  }

  button.disabled = true;
  button.textContent = "Deleting...";

  try {

    const response = await fetch(
      `${ADMIN_API_URL}/products/${encodeURIComponent(id)}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${adminToken}`
        }
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(
        result.message ||
        result.error ||
        "Product could not be deleted."
      );
    }

    // Remove the deleted product from the cart and wishlist.
    cart = cart.filter(
      item => String(item.productId) !== id
    );

    wishlist = wishlist.filter(
      item => String(item) !== id
    );

    persistCart();
    persistWishlist();

    // Reload the current product list from the database.
    await loadProductsFromBackend();

    renderProducts();
    renderHomeCategories();
    renderAllCategories();
    renderAdminDashboard();
    updateCartCount();

    showToast(
      "Product deleted successfully.",
      "success"
    );

  } catch (error) {

    console.error("Product delete error:", error);

    showToast(
      error.message || "Could not delete product.",
      "error"
    );

  } finally {

    button.disabled = false;
    button.textContent = "Delete";

  }

});

/* =====================================================
   INITIALIZE
===================================================== */

async function initializeApp() {
  $("#currentYear").textContent = new Date().getFullYear();

  renderHomeCategories();
  renderAllCategories();
  renderProducts();
  updateCartCount();
  renderCart();

  await loadProductsFromBackend();
}

initializeApp();



/* =====================================================
   MESHKART GOOGLE LOGIN — FIREBASE
===================================================== */

(function setupMeshKartGoogleLogin() {

  const googleLoginButton = document.getElementById("googleLoginButton");
  const loginMessage = document.getElementById("accountLoginMessage");

  if (!googleLoginButton) {
    console.warn("MeshKart: Google Login button not found.");
    return;
  }

  if (!window.meshkartAuth) {
    console.error("MeshKart: Firebase Authentication is not initialized.");

    if (loginMessage) {
      loginMessage.textContent =
        "Login service is not ready. Please refresh and try again.";
    }

    return;
  }

  const auth = window.meshkartAuth;
  const provider = new firebase.auth.GoogleAuthProvider();

  googleLoginButton.addEventListener("click", async function () {

    const originalText = googleLoginButton.textContent;

    googleLoginButton.disabled = true;
    googleLoginButton.textContent = "Connecting to Google...";

    if (loginMessage) {
      loginMessage.textContent = "";
    }

    try {
      const result = await auth.signInWithPopup(provider);
      const user = result.user;

      if (!user) {
        throw new Error("Google sign-in did not return a user.");
      }

      const idToken = await user.getIdToken();

      /*
       * Temporary client-side session.
       * The backend must verify this ID token before
       * accepting orders or other protected actions.
       */
      localStorage.setItem("meshkart_customer_token", idToken);

      localStorage.setItem(
        "meshkart_customer",
        JSON.stringify({
          uid: user.uid,
          name: user.displayName || "",
          email: user.email || "",
          photo: user.photoURL || ""
        })
      );

      if (loginMessage) {
        loginMessage.textContent =
          "Google sign-in successful!";
      }

      showToast("Signed in successfully with Google.", "success");

      const pendingPage =
        sessionStorage.getItem("meshkart_pending_page");

      sessionStorage.removeItem("meshkart_pending_page");

      if (
        pendingPage &&
        typeof PAGE_IDS !== "undefined" &&
        PAGE_IDS[pendingPage]
      ) {
        showPage(pendingPage);
      } else {
        showPage("home");
      }

    } catch (error) {
      console.error("MeshKart Google sign-in error:", error);

      let message =
        "Google sign-in failed. Please try again.";

      if (error.code === "auth/popup-closed-by-user") {
        message = "Sign-in was cancelled. Please try again.";
      } else if (error.code === "auth/unauthorized-domain") {
        message =
          "This website domain is not authorized in Firebase.";
      } else if (error.code === "auth/popup-blocked") {
        message =
          "Google sign-in popup was blocked. Allow popups and try again.";
      }

      if (loginMessage) {
        loginMessage.textContent = message;
      }

      showToast(message, "error");

    } finally {
      googleLoginButton.disabled = false;
      googleLoginButton.textContent = originalText;
    }

  });

})();
