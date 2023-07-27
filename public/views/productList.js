const productsContainer = document.querySelector(".products-container");

export default function getProductList(data) {
  const productData = data.data.forEach((product) => {
    const productId = product.id;
    const newProduct = document.createElement("div");
    newProduct.classList = "product-wrapper flex-column";

    const newProductLink = document.createElement("a");
    newProductLink.setAttribute("href", `/product/?id=${productId}`);

    const newProductMainImg = document.createElement("img");
    newProductMainImg.classList = "img-wrapper";
    newProductMainImg.setAttribute("src", product.main_image);
    newProductMainImg.setAttribute("alt", "product's picture");
    newProductMainImg.setAttribute("style", "width: 100%; height: auto");

    const newProductColors = document.createElement("div");
    newProductColors.classList = "poduct-colors-wrapper flex-row";
    product.colors.forEach((color) => {
      const productColor = document.createElement("div");
      productColor.classList = "product-color";
      productColor.setAttribute("style", `background-color: #${color.code}`);
      newProductColors.appendChild(productColor);
    });

    const newProductName = document.createElement("p");
    newProductName.classList = "product-name";
    newProductName.innerText = product.title;

    const newProductPrice = document.createElement("p");
    newProductPrice.className = "product-price";
    newProductPrice.innerText = `TWD.$${product.price}`;

    newProduct
      .appendChild(newProductLink)
      .appendChild(newProductMainImg)
      .parentNode.insertBefore(newProductColors, newProductMainImg.nextSibling)
      .parentNode.insertBefore(newProductName, newProductColors.nextSibling)
      .parentNode.insertBefore(newProductPrice, newProductName.nextSibling);

    productsContainer.appendChild(newProduct);
  });
  return productData;
}
