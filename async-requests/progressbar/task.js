document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const progress = document.getElementById("progress");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
  
      const fileInput = document.getElementById("file");
      const file = fileInput.files[0];
      if (!file) {
        alert("Выберите файл для загрузки.");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", file);
  
      const xhr = new XMLHttpRequest();
  
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const percentComplete = event.loaded / event.total;
          progress.value = percentComplete;
        }
      });
  
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          alert("Файл успешно загружен!");
          progress.value = 0;
        } else {
          alert(`Ошибка загрузки файла: ${xhr.statusText}`);
        }
      });
  
      xhr.addEventListener("error", () => {
        alert("Произошла ошибка во время загрузки файла.");
      });
  
      xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");
      xhr.send(formData);
    });
  });
  