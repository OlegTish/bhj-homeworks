document.addEventListener("DOMContentLoaded", () => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip);
  
    let activeElement = null;
  
    const toggleTooltip = (element) => {
      const position = element.getAttribute("data-position") || "bottom";
      const { top, left, width, height } = element.getBoundingClientRect();
  
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
    };
  
    document.querySelectorAll(".has-tooltip").forEach((element) => {
      element.addEventListener("click", (event) => {
        event.preventDefault();
  
        const tooltipText = element.getAttribute("title");
  
        if (activeElement === element) {
          tooltip.classList.toggle("tooltip_active");
          activeElement = tooltip.classList.contains("tooltip_active") ? element: null;
          return;
        }
  
        tooltip.textContent = tooltipText;
        toggleTooltip(element);
  
        tooltip.classList.add("tooltip_active");
        activeElement = element;
      });
    });
  
    document.addEventListener("click", (event) => {
      if (!event.target.classList.contains("has-tooltip")) {
        tooltip.classList.remove("tooltip_active");
        activeElement = null;
      }
    });
  });
  