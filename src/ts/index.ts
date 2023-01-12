import { Product } from "./Product";

const productList = document.querySelector(".content__products-list");

const serverUrl = "http://localhost:5000";

async function main() {
  async function getProducts() {
    const response = await fetch("http://localhost:5000/products");
    const data = await response.json();
    return data;
  }
  const produtos = await getProducts();
  loadPage(produtos);
  function loadPage(produtos: any) {
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
      productButton.onclick = function () {};
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
