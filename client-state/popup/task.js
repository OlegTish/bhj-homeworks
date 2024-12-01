document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("subscribe-modal");
  const closeBtn = document.querySelector(".modal__close");

  const getCookie = (name) => {
    const matches = document.cookie.match(
      new RegExp(
        `(?:^|; )${name.replace(
          /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
          "\\$1"
        )}=([^;]*)`
      )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };

  const setCookie = (name, value, options = {}) => {
    options = {
      path: "/",
      ...options
    };

    if (options.expires instanceof Date) {
      options.expires = options.expires.toUTCString();
    }

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}`;

    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey];
      if (optionValue !== true) {
        updatedCookie += `=${optionValue}`;
      }
    }

    document.cookie = updatedCookie;
  };

  const isModalClosed = getCookie("modalClosed");

  if (!isModalClosed) {
    modal.classList.add("modal_active");
  }

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("modal_active");

    setCookie("modalClosed", "true", { "max-age": 7 * 24 * 60 * 60 });
  });
});
