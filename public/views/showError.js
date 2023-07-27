const productsContainer = document.querySelector(".products-container");

export default function showError(error) {
  productsContainer.innerHTML = `<div class="full-width">
          <p>${error}</p>
      <div>`;
}
