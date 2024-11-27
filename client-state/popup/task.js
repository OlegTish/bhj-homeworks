document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("subscribe-modal");
    const closeBtn = document.querySelector(".modal__close");
  
    const isModalClosed = localStorage.getItem("modalClosed");
  
    if (!isModalClosed) {
      modal.classList.add("modal_active");
    }
  
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("modal_active");
      localStorage.setItem("modalClosed", "true");
    });
  });
  