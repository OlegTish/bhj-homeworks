function initRotator() {
    const rotators = document.querySelectorAll(".rotator");
  
    rotators.forEach((rotator) => {
      let currentIndex = 0;
      const cases = rotator.querySelectorAll(".rotator__case");
  
      function rotate() {
        const currentCase = cases[currentIndex];
  
        currentCase.classList.remove("rotator__case_active");
  
        currentIndex = (currentIndex + 1) % cases.length;
        const nextCase = cases[currentIndex];
  
        nextCase.classList.add("rotator__case_active");
  
        nextCase.style.color = nextCase.dataset.color;
  
        setTimeout(rotate, nextCase.dataset.speed);
      }
  
      setTimeout(rotate, cases[currentIndex].dataset.speed);
    });
  }
  
  document.addEventListener("DOMContentLoaded", initRotator);
  