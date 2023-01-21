import { Product } from "./Product";

interface Item {
  id: string;
}

const carrinho: Item[] = [];

let selectedFiltersColors: string[] = [];
let selectedFiltersSizes: string[] = [];
let selectedFiltersPrices: string[] = [];

const productList = document.querySelector(".content__products-list");
const showMoreButton = document.querySelector(".content__show-more");

const counterItens = document.querySelector(".header__counter-itens");

const checkboxesFiltersColors = document.querySelectorAll(".filters__checkbox");
const checkboxesFiltersPrices = document.querySelectorAll(
  ".filters__checkbox-prices"
);
const buttonsFilters = document.querySelectorAll(".filters__buttons");

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

let buttonShowMoreColors = document.querySelector(
  ".filters__show-more-colors"
) as HTMLButtonElement;
let hiddenColors = document.getElementById("hidden-colors") as HTMLElement;
let teste = document.querySelector(".filters__teste") as HTMLElement;

const serverUrl = "http://localhost:5000";

async function main() {
  buttonShowMoreColors.addEventListener("click", () => {
    if (hiddenColors.classList.contains("hidden")) {
      hiddenColors.classList.remove("hidden");
      teste.innerHTML = "Mostrar menos cores";
    } else {
      hiddenColors.classList.add("hidden");
      teste.innerHTML = "Ver todas as cores";
    }
  });

  colorsOpener.addEventListener("click", () => {
    colorsContent.classList.toggle("active");
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

  showMoreButton.addEventListener("click", () => {
    loadPage(produtos.slice(11));

    showMoreButton.classList.add("content__show-more-active");
  });

  async function getProducts() {
    const response = await fetch("http://localhost:5000/products");

    const data = await response.json();

    return data;
  }

  checkboxesFiltersColors.forEach((checkboxFilter) => {
    checkboxFilter.addEventListener("click", () => {
      const filterColorChecked = selectedFiltersColors.includes(
        checkboxFilter.id
      );

      if (!filterColorChecked) {
        selectedFiltersColors.push(checkboxFilter.id);
      } else {
        selectedFiltersColors = selectedFiltersColors.filter(
          (selectedFilter) => selectedFilter !== checkboxFilter.id
        );
      }

      loadPage(produtos.slice(0, 9));
    });
  });

  buttonsFilters.forEach((buttonFilter) => {
    buttonFilter.addEventListener("click", () => {
      const filterButtonActive = selectedFiltersSizes.includes(buttonFilter.id);
      buttonFilter.classList.toggle("active");
      if (!filterButtonActive) {
        selectedFiltersSizes.push(buttonFilter.id);
      } else {
        selectedFiltersSizes = selectedFiltersSizes.filter(
          (selectedFilter) => selectedFilter !== buttonFilter.id
        );
      }
      loadPage(produtos.slice(0, 9));
    });
  });

  checkboxesFiltersPrices.forEach((checkboxFilter) => {
    checkboxFilter.addEventListener("click", () => {
      const filterPriceChecked = selectedFiltersPrices.includes(
        checkboxFilter.id
      );
      if (!filterPriceChecked) {
        selectedFiltersPrices.push(checkboxFilter.id);
      } else {
        selectedFiltersPrices = selectedFiltersPrices.filter(
          (selectedFilter) => selectedFilter !== checkboxFilter.id
        );
      }
      loadPage(produtos.slice(0, 9));
    });
  });

  async function actualizedCart(id: string) {
    const item = {
      id: id,
    };
    carrinho.push(item);
    counterItens.innerHTML = carrinho.length.toString();
  }

  const produtos = await getProducts();

  loadPage(produtos.slice(0, 9));

  function loadPage(produtos: Product[]) {
    if (selectedFiltersColors.length > 0) {
      produtos = produtos.filter((product) => {
        return selectedFiltersColors.includes(product.color);
      });
    }

    if (selectedFiltersSizes.length > 0) {
      produtos = produtos.filter((product) => {
        return product.size.some((size) => {
          return selectedFiltersSizes.includes(size);
        });
      });
    }

    if (selectedFiltersPrices.length > 0) {
      const productsFilteredByPriceRange: Product[] = [];

      selectedFiltersPrices.forEach((filterPrice) => {
        const priceRange = filterPrice.split(" - ");

        const priceRangeAsNumbers = priceRange.map(Number);

        const menorValor = Math.min(...priceRangeAsNumbers);
        const maiorValor = Math.max(...priceRangeAsNumbers);

        const filteredByPriceRange = produtos.filter(
          (product) =>
            product.price >= menorValor && product.price <= maiorValor
        );

        productsFilteredByPriceRange.push(...filteredByPriceRange);
      });

      produtos = productsFilteredByPriceRange;
    }

    const elements = document.querySelectorAll(".produto");
    if (elements.length > 0) {
      elements.forEach((li) => li.remove());
    }

    for (const produto of produtos) {
      const productContainer = document.createElement("li");
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
