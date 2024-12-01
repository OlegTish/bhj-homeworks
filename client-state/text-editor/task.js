document.addEventListener("DOMContentLoaded", () => {
  const editor = document.getElementById("editor");

  editor.value = localStorage.getItem("editorContent") || "";

  editor.addEventListener("input", () => {
    localStorage.setItem("editorContent", editor.value);
  });
});