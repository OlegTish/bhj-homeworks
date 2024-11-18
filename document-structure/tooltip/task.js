document.addEventListener("DOMContentLoaded", () => {
    const tooltipElements = document.querySelectorAll(".has-tooltip");
  
    tooltipElements.forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
  
        document.querySelectorAll(".tooltip_active").forEach((tooltip) => {
          tooltip.classList.remove("tooltip_active");
          tooltip.remove();
        });
  
        const tooltip = document.createElement("div");
        tooltip.className = "tooltip";
        tooltip.textContent = element.getAttribute("title");
  
        const position = element.getAttribute("data-position") || "bottom";
        const { top, left, width, height } = element.getBoundingClientRect();
  
        document.body.appendChild(tooltip);
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
  
        switch (position) {
          case "top":
            tooltip.style.top = `${top - tooltipHeight - 5}px`;
            tooltip.style.left = `${left + width / 2 - tooltipWidth / 2}px`;
            break;
          case "bottom":
            tooltip.style.top = `${top + height + 5}px`;
            tooltip.style.left = `${left + width / 2 - tooltipWidth / 2}px`;
            break;
          case "left":
            tooltip.style.top = `${top + height / 2 - tooltipHeight / 2}px`;
            tooltip.style.left = `${left - tooltipWidth - 5}px`;
            break;
          case "right":
            tooltip.style.top = `${top + height / 2 - tooltipHeight / 2}px`;
            tooltip.style.left = `${left + width + 5}px`;
            break;
        }
  
        tooltip.classList.add("tooltip_active");
  
        tooltip.addEventListener("click", () => {
          tooltip.remove();
        });
      });
    });
  
    document.addEventListener("click", (event) => {
      if (!event.target.classList.contains("has-tooltip")) {
        document.querySelectorAll(".tooltip_active").forEach((tooltip) => {
          tooltip.classList.remove("tooltip_active");
          tooltip.remove();
        });
      }
    });
  });
  