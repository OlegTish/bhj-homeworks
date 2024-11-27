document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const itemsContainer = document.getElementById("items");
  
    const apiUrl =
      "https://students.netoservices.ru/nestjs-backend/slow-get-courses";
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const currencies = data.response.Valute;
  
        for (const key in currencies) {
          const currency = currencies[key];
          const item = document.createElement("div");
          item.classList.add("item");
  
          item.innerHTML = `
              <div class="item__code">${currency.CharCode}</div>
              <div class="item__value">${currency.Value.toFixed(2)}</div>
              <div class="item__currency">руб.</div>
            `;
          itemsContainer.appendChild(item);
        }
  
        loader.classList.remove("loader_active");
      })
      .catch((error) => {
        console.error("Ошибка при загрузке данных:", error);
        alert("Не удалось загрузить данные. Попробуйте позже.");
      });
  });
  