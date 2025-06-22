'use strict';

const products = [
  {
    id: 1,
    name: "Póster",
    description: "Reproducción elegante de una obra icónica que aporta carácter y estilo a cualquier pared de tu hogar.",
    details: "Tamaño: 60x80 cm. Papel de alta calidad, impresión mate.",
    price: 25800,
    image: { src: "product-1.webp", width: 600, height: 533, alt: "Póster en blanco y negro con retrato" },
    category: "arte"
  },
  {
    id: 2,
    name: "Botella",
    description: "Pieza decorativa de cerámica, ideal para ramos pequeños o secos. Aporta estilo a tu baño, sala o dormitorio.",
    details: "Material: Cerámica esmaltada. Altura: 25 cm. Perfecta para flores secas.",
    price: 6200,
    image: { src: "product-2.webp", width: 600, height: 400, alt: "Botellas-vazas de colores" },
    category: "cerámica"
  },
  {
    id: 3,
    name: "Cuadro",
    description: "Obra original en técnica singular que retrata con carácter el rostro femenino. Pieza única para tu colección.",
    details: "Tamaño: 70x50 cm. Técnica mixta sobre lienzo, firmado por el artista.",
    price: 70600,
    image: { src: "product-3.webp", width: 600, height: 400, alt: "Retrato de mujer sobre fondo celeste" },
    category: "arte"
  },
  {
    id: 4,
    name: "Portavelas",
    description: "Conjunto decorativo de portavelas de cerámica en tonos vibrantes, ideales para crear una atmósfera acogedora.",
    details: "Incluye 3 portavelas. Altura: 10 cm. Ideal para velas pequeñas.",
    price: 3900,
    image: { src: "product-4.webp", width: 600, height: 400, alt: "Portavelas de cerámica" },
    category: "cerámica"
  },
  {
    id: 5,
    name: "Alfombra",
    description: "Alfombra artesanal de diseño vibrante, tejida con materiales duraderos. Aporta color y estilo a tu hogar.",
    details: "Medidas: 120x180 cm. Material: mezcla de algodón y poliéster.",
    price: 68900,
    image: { src: "product-5.webp", width: 600, height: 400, alt: "Alfombra roja y blanca" },
    category: "textil"
  },
  {
    id: 6,
    name: "Cuadro",
    description: "Arte moderno que reinterpreta una estatua clásica con formas geométricas y contrastes audaces. Impacto visual asegurado.",
    details: "Tamaño: 60x55 cm. Técnica acrílica sobre panel de madera.",
    price: 22900,
    image: { src: "product-6.webp", width: 600, height: 436, alt: "Cuadro con retrato de estatua clásica" },
    category: "arte"
  }
];

const cart = [];

function createProductCard(product) {
  const li = document.createElement("li");
  li.className = "col-12 col-md-6 col-lg-4";

  const card = document.createElement("div");
  card.className = "card product-card h-100 d-flex flex-column";

  const picture = document.createElement("picture");
  const source = document.createElement("source");
  source.media = "(max-width: 430px)";
  source.srcset = `img/products/mobile/${product.image.src} 1x, img/products/desktop/${product.image.src} 2x`;
  picture.appendChild(source);

  const img = document.createElement("img");
  img.className = "product-card__img";
  img.src = `img/products/desktop/${product.image.src}`;
  img.alt = product.image.alt;
  img.width = product.image.width;
  img.height = product.image.height;
  picture.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body d-flex flex-column";

  const headerDiv = document.createElement("div");
  headerDiv.className = "d-flex align-items-center gap-2 mb-2";

  const title = document.createElement("h3");
  title.className = "card-title mb-0";
  title.textContent = product.name;

  const badgeWrapper = document.createElement("div");
  const badge = document.createElement("span");
  badge.className = "badge bg-secondary text-capitalize";
  badge.textContent = product.category;
  badgeWrapper.appendChild(badge);

  headerDiv.append(title, badgeWrapper);

  const desc = document.createElement("p");
  desc.className = "card-text";
  desc.textContent = product.description;

  const footerDiv = document.createElement("div");
  footerDiv.className = "mt-auto";

  const priceDiv = document.createElement("div");
  priceDiv.className = "fw-bold mb-2";
  priceDiv.textContent = `$${product.price.toLocaleString("es-AR")}`;

  const btnGroup = document.createElement("div");
  btnGroup.className = "d-flex gap-2";

  const addButton = document.createElement("button");
  addButton.className = "btn btn-product btn-sm";
  addButton.textContent = "Agregar al carrito";
  addButton.disabled = cart.some(item => item.id === product.id);
  addButton.onclick = () => {
    addToCart(product.id);
    updateCart();
    renderProducts();
    showToast(`Producto "${product.name}" agregado al carrito`);
  };

  const detailsButton = document.createElement("button");
  detailsButton.className = "btn btn-outline-secondary btn-sm";
  detailsButton.textContent = "Ver detalles";
  detailsButton.onclick = () => openProductModal(product);

  btnGroup.append(addButton, detailsButton);

  footerDiv.append(priceDiv, btnGroup);

  cardBody.append(headerDiv, desc, footerDiv);
  card.append(picture, cardBody);
  li.appendChild(card);

  return li;
}

function renderProducts(category = "all") {
  const container = document.querySelector("#productos");

  const oldList = container.querySelector("ul");
  if (oldList) oldList.remove();

  const oldMessage = container.querySelector(".no-products-message");
  if (oldMessage) oldMessage.remove();

  const filteredProducts = category === "all"
    ? products
    : products.filter(p => p.category === category);

  if (filteredProducts.length === 0) {
    const message = document.createElement("p");
    message.className = "text-muted mt-3 no-products-message";
    message.textContent = "No hay productos en esta categoría.";
    container.appendChild(message);
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "row g-4";

  filteredProducts.forEach(product => {
    ul.appendChild(createProductCard(product));
  });

  container.appendChild(ul);
}

function addToCart(id) {
  const existing = cart.find(p => p.id === id);
  if (existing) {
    return;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product });
  }
  updateCart();
}

function updateCart() {
  const countElem = document.querySelector("#cart-count");
  const totalElem = document.querySelector("#total");

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, p) => sum + p.price, 0);

  if (countElem) countElem.textContent = totalItems;
  if (totalElem) totalElem.textContent = `$${totalPrice.toLocaleString("es-AR")}`;
}

function filterByCategory() {
  const filterMenu = document.getElementById("categoryFilter");
  const heading = document.querySelector("#productos h2");

  if (filterMenu && heading) {
    filterMenu.addEventListener("click", (event) => {
      event.preventDefault();
      const item = event.target;

      if (item.classList.contains("dropdown-item")) {
        const selectedCategory = item.getAttribute("data-category");
        const selectedText = item.textContent;

        heading.textContent = selectedCategory === "all"
          ? "Productos"
          : selectedText;

        renderProducts(selectedCategory);
      }
    });
  }
}

function buildModalStructure(modal, modalTitle) {
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const btnClose = document.createElement("button");
  btnClose.type = "button";
  btnClose.className = "btn-close";
  btnClose.setAttribute("data-bs-dismiss", "modal");
  btnClose.setAttribute("aria-label", "Cerrar");

  modalHeader.append(modalTitle, btnClose);

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";

  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  modalContent.append(modalHeader, modalBody, modalFooter);

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-dialog-centered modal-lg";
  modalDialog.appendChild(modalContent);

  modal.appendChild(modalDialog);
  document.body.appendChild(modal);

  return {
    modalBody,
    modalFooter,
  };
}

function createProductModal() {
  const existingModal = document.getElementById("modalDetalles");
  if (existingModal) existingModal.remove();

  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "modalDetalles";
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "modalDetallesLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalTitle = document.createElement("h2");
  modalTitle.className = "modal-title";
  modalTitle.id = "modalDetallesLabel";

  buildModalStructure(modal, modalTitle);

  return modal;
}

function openProductModal(product) {
  const modal = document.getElementById("modalDetalles") || createProductModal();

  const modalTitle = modal.querySelector(".modal-title");
  const modalBody = modal.querySelector(".modal-body");
  const modalFooter = modal.querySelector(".modal-footer");

  modalTitle.textContent = "";

  while (modalBody.firstChild) {
    modalBody.removeChild(modalBody.firstChild);
  }
  while (modalFooter.firstChild) {
    modalFooter.removeChild(modalFooter.firstChild);
  }

  modalTitle.textContent = product.name;

  const row = document.createElement("div");
  row.className = "row";

  const colImg = document.createElement("div");
  colImg.className = "col-12 col-md-6 d-flex justify-content-center align-items-start mb-3 mb-md-0";

  const img = document.createElement("img");
  img.src = `img/products/desktop/${product.image.src}`;
  img.alt = product.image.alt;
  img.className = "img-fluid rounded shadow";
  img.style.maxWidth = "100%";

  colImg.appendChild(img);

  const colText = document.createElement("div");
  colText.className = "col-12 col-md-6 d-flex flex-column";

  const badge = document.createElement("span");
  badge.className = "badge bg-secondary align-self-start";
  badge.textContent = product.category;

  const desc = document.createElement("p");
  desc.textContent = product.description;

  const details = document.createElement("p");
  details.textContent = product.details || "";
  details.className = "text-muted fst-italic";

  colText.append(badge, desc, details);

  row.append(colImg, colText);
  modalBody.appendChild(row);

  const footerRow = document.createElement("div");
  footerRow.className = "d-flex justify-content-between align-items-center gap-2";

  const price = document.createElement("div");
  price.className = "fw-bold fs-5";
  price.textContent = `$${product.price.toLocaleString("es-AR")}`;

  const btnAdd = document.createElement("button");
  btnAdd.className = "btn btn-primary";
  btnAdd.id = "btnAddFromModal";

  const isInCart = cart.some(p => p.id === product.id);
  btnAdd.disabled = isInCart;
  btnAdd.textContent = isInCart ? "Producto en carrito" : "Agregar al carrito";

  btnAdd.onclick = () => {
    addToCart(product.id);
    updateCart();
    renderProducts();
    btnAdd.disabled = true;
    btnAdd.textContent = "Producto en carrito";
    showToast(`Producto "${product.name}" agregado al carrito`);
  };

  footerRow.append(price, btnAdd);
  modalFooter.appendChild(footerRow);

  const modalInstance = bootstrap.Modal.getOrCreateInstance(modal);
  modalInstance.show();
}

function createCartModal() {
  const existingModal = document.getElementById("modalDetalleCarrito");
  if (existingModal) existingModal.remove();

  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "modalDetalleCarrito";
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "modalDetalleCarritoLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-dialog-centered modal-lg";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h3");
  modalTitle.className = "modal-title";
  modalTitle.id = "modalDetalleCarritoLabel";
  modalTitle.textContent = "Carrito de compras";

  buildModalStructure(modal, modalTitle);

  return modal;
}

function renderCartModal() {
  const modal = document.getElementById("modalDetalleCarrito") || createCartModal();
  const body = modal.querySelector(".modal-body");
  const footer = modal.querySelector(".modal-footer");

  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  while (footer.firstChild) {
    footer.removeChild(footer.firstChild);
  }

  if (cart.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "El carrito está vacío.";
    emptyMsg.className = "text-muted";
    body.appendChild(emptyMsg);
    return;
  }

  cart.forEach(product => {
    const row = document.createElement("div");
    row.className = "d-flex justify-content-between align-items-center border-bottom py-2 flex-wrap";

    const name = document.createElement("div");
    name.className = "fw-bold col-12 col-md-6";
    name.textContent = product.name;

    const total = document.createElement("div");
    total.className = "fw-semibold text-end col-12 col-md-4 mt-2 mt-md-0";
    total.textContent = `$${product.price.toLocaleString("es-AR")}`;

    const btnRemove = document.createElement("button");
    btnRemove.className = "btn btn-sm btn-danger btn-icon-only ms-3";
    btnRemove.setAttribute("aria-label", "Eliminar");
    btnRemove.onclick = () => {
      const index = cart.findIndex(p => p.id === product.id);
      if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
        renderProducts();
        renderCartModal();
      }
    };

    row.append(name, total, btnRemove);
    body.appendChild(row);
  });

  const totalSum = cart.reduce((sum, p) => sum + p.price, 0);
  const totalQty = cart.length;

  const totalRow = document.createElement("div");
  totalRow.className = "fw-bold fs-5 text-end mt-3";
  totalRow.textContent = `Total (${totalQty} productos): $${totalSum.toLocaleString("es-AR")}`;
  body.appendChild(totalRow);

  const btnClear = document.createElement("button");
  btnClear.className = "btn btn-danger me-2";
  btnClear.textContent = "Vaciar carrito";
  btnClear.onclick = () => {
    cart.length = 0;
    updateCart();
    renderProducts();
    renderCartModal();
  };

  const btnClose = document.createElement("button");
  btnClose.className = "btn btn-secondary";
  btnClose.setAttribute("data-bs-dismiss", "modal");
  btnClose.textContent = "Finalizar compra";

  footer.append(btnClear, btnClose);
}

function createToastContainer() {
  if (document.getElementById("toastContainer")) return;

  const container = document.createElement("div");
  container.id = "toastContainer";
  container.className = "position-fixed top-0 end-0 mt-5 me-3 p-3";
  container.style.zIndex = "1100";

  const toast = document.createElement("div");
  toast.id = "liveToast";
  toast.className = "toast align-items-center text-bg-success border-0";
  toast.setAttribute("role", "alert");
  toast.setAttribute("aria-live", "assertive");
  toast.setAttribute("aria-atomic", "true");

  const toastFlex = document.createElement("div");
  toastFlex.className = "d-flex";

  const toastBody = document.createElement("div");
  toastBody.className = "toast-body";
  toastBody.id = "toastBody";

  const btnClose = document.createElement("button");
  btnClose.type = "button";
  btnClose.className = "btn-close btn-close-white me-2 m-auto";
  btnClose.setAttribute("data-bs-dismiss", "toast");
  btnClose.setAttribute("aria-label", "Cerrar");

  toastFlex.append(toastBody, btnClose);
  toast.appendChild(toastFlex);
  container.appendChild(toast);
  document.body.appendChild(container);
}

function showToast(message) {
  createToastContainer();

  const toastEl = document.getElementById('liveToast');
  const toastBody = document.getElementById('toastBody');

  toastBody.textContent = message;

  const toast = new bootstrap.Toast(toastEl, { delay: 5000 });
  toast.show();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCart();
  filterByCategory();

  document.getElementById("verCarritoBtn").addEventListener("click", () => {
    renderCartModal();
    const modal = new bootstrap.Modal(document.getElementById("modalDetalleCarrito"));
    modal.show();
  });

  const clearCartBtn = document.getElementById("clear-cart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      cart.length = 0;
      updateCart();
      renderProducts();
      renderCartModal();
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener('hide.bs.modal', function (event) {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  });
});
