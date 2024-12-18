document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const cart = document.querySelector(".cart__products");

  const clearCart = () => {
    localStorage.removeItem("cart");
    cart.innerHTML = "";
    toggleCartVisibility();
  };

  const loadCart = () => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.forEach(({ id, src, count }) => {
      addToCartDOM(id, src, count);
    });
    toggleCartVisibility();
  };

  const saveCart = () => {
    const items = Array.from(cart.children).map((cartProduct) => ({
      id: cartProduct.dataset.id,
      src: cartProduct.querySelector(".cart__product-image").src,
      count: parseInt(
        cartProduct.querySelector(".cart__product-count").textContent,
        10
      )
    }));
    localStorage.setItem("cart", JSON.stringify(items));
  };

  products.forEach((product) => {
    const quantityValue = product.querySelector(".product__quantity-value");

    product
      .querySelector(".product__quantity-control_dec")
      .addEventListener("click", () => {
        const currentValue = parseInt(quantityValue.textContent, 10);
        if (currentValue > 1) {
          quantityValue.textContent = currentValue - 1;
        }
      });

    product
      .querySelector(".product__quantity-control_inc")
      .addEventListener("click", () => {
        quantityValue.textContent = parseInt(quantityValue.textContent, 10) + 1;
      });

    product.querySelector(".product__add").addEventListener("click", () => {
      const id = product.dataset.id;
      const src = product.querySelector(".product__image").src;
      const count = parseInt(quantityValue.textContent, 10);

      const existingCartItem = cart.querySelector(
        `.cart__product[data-id="${id}"]`
      );
      if (existingCartItem) {
        const cartCount = existingCartItem.querySelector(
          ".cart__product-count"
        );
        cartCount.textContent = parseInt(cartCount.textContent, 10) + count;
      } else {
        addToCartDOM(id, src, count);
      }

      saveCart();
      toggleCartVisibility();
      animateToCart(product.querySelector(".product__image"), id);
    });
  });

  const addToCartDOM = (id, src, count) => {
    cart.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cart__product" data-id="${id}">
        <img class="cart__product-image" src="${src}">
        <div class="cart__product-count">${count}</div>
      </div>
      `
    );
  };

  const toggleCartVisibility = () => {
    const title = document.querySelector(".cart__title");
    title.style.display = cart.children.length > 0 ? "block" : "none";
  };

  const animateToCart = (productImage, id) => {
    const cartImage = cart.querySelector(
      `.cart__product[data-id="${id}"] .cart__product-image`
    );
    if (!cartImage) return;

    const productRect = productImage.getBoundingClientRect();
    const cartRect = cartImage.getBoundingClientRect();

    const clone = productImage.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = `${productRect.left}px`;
    clone.style.top = `${productRect.top}px`;
    clone.style.width = `${productRect.width}px`;
    clone.style.transition = "all 0.5s ease";
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = `${cartRect.left}px`;
      clone.style.top = `${cartRect.top}px`;
      clone.style.width = `${cartRect.width}px`;
    });

    setTimeout(() => {
      clone.remove();
    }, 500);
  };

  clearCart();

  loadCart();
});

