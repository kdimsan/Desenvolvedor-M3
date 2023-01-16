import { Product } from "./Product";

interface Item {
  id: string;
}
const carrinho: Item[] = [];

const productList = document.querySelector(".content__products-list");

const counterItens = document.querySelector(".header__counter-itens");

const checkboxFilter = document.querySelectorAll(".filters__checkbox");

const closeFiltersMobile = document.querySelector(".filters__close-button");
const closeOrderbyMobile = document.querySelector(
  ".order-mobile__close-button"
);

const orderbyMobile = document.querySelector("#orderby-mobile");
const orderby = document.querySelector(".order-mobile");

const filterMobile = document.querySelector("#filter-mobile");
const filters = document.querySelector(".filters");

const colorsOpener = document.querySelector(".filters__colors-opener");
const colorsContent = document.querySelector(".filters__colors-content");

const sizesOpener = document.querySelector(".filters__sizes-opener");
const sizesButtons = document.querySelector(".filters__sizes-buttons");

const pricesOpener = document.querySelector(".filters__prices-opener");
const pricesContent = document.querySelector(".filters__prices-content");

const serverUrl = "http://localhost:5000";

async function main() {
  colorsOpener.addEventListener("click", () => {
    colorsContent.classList.toggle("active");
    console.log("clicou color");
  });
  sizesOpener.addEventListener("click", () => {
    sizesButtons.classList.toggle("active");
  });
  pricesOpener.addEventListener("click", () => {
    pricesContent.classList.toggle("active");
  });

  orderbyMobile.addEventListener("click", () => {
    orderby.classList.add("orderby-mobile-opened");
  });
  filterMobile.addEventListener("click", () => {
    filters.classList.add("filterMobileOpened");
  });

  closeOrderbyMobile.addEventListener("click", () => {
    orderby.classList.remove("orderby-mobile-opened");
  });
  closeFiltersMobile.addEventListener("click", () => {
    filters.classList.remove("filterMobileOpened");
  });

  async function getProducts() {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    return data;
  }

  async function actualizedCart(id: string) {
    const item = {
      id: id,
    };
    carrinho.push(item);
    counterItens.innerHTML = carrinho.length.toString();
  }

  const produtos = await getProducts();
  loadPage(produtos);
  function loadPage(produtos: Product[]) {
    for (const produto of produtos) {
      const productContainer = document.createElement("div");
      productContainer.classList.add("produto");
      productContainer.setAttribute("id", produto.id);

      const productImage = document.createElement("img");
      productImage.classList.add("product-img");
      productImage.setAttribute("src", produto.image);

      const productName = document.createElement("p");
      productName.classList.add("product-name");
      productName.innerHTML = produto.name;

      const productPrice = document.createElement("p");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = "R$ " + produto.price;

      const productInstallments = document.createElement("p");
      productInstallments.classList.add("product-installments");
      productInstallments.innerHTML =
        "até " + produto.parcelamento[0] + "x de R$ " + produto.parcelamento[1];

      const productButton = document.createElement("button");
      productButton.classList.add("buy-button");
      productButton.onclick = function () {
        actualizedCart(produto.id);
      };
      productButton.innerHTML = "Comprar";

      productContainer.append(
        productImage,
        productName,
        productPrice,
        productInstallments,
        productButton
      );

      productList.appendChild(productContainer);
    }
  }
}

document.addEventListener("DOMContentLoaded", main);
