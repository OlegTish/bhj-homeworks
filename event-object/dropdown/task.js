const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach((dropdown) => {
  const dropdownValue = dropdown.querySelector(".dropdown__value");
  const dropdownList = dropdown.querySelector(".dropdown__list");
  const dropdownItems = dropdown.querySelectorAll(".dropdown__item");

  dropdownValue.addEventListener("click", (event) => {
    dropdownList.classList.toggle("dropdown__list_active");
  });

  dropdownItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      dropdownValue.textContent = item.textContent;
      dropdownList.classList.remove("dropdown__list_active");
    });
  });
});

document.addEventListener("click", (event) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      const dropdownList = dropdown.querySelector(".dropdown__list");
      dropdownList.classList.remove("dropdown__list_active");
    }
  });
});