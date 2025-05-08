let dropConcluido = false;

document.addEventListener("DOMContentLoaded", () => {
  const draggableItems = document.querySelectorAll(
    '.sig-option[draggable="true"]'
  );
  const dropzone = document.getElementById("document-dropzone");
  const dropFeedback = document.getElementById("drop-feedback");

  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", event.target.id);
      event.dataTransfer.setData("text/type", event.target.dataset.type);
      event.dataTransfer.setData("text/icon", event.target.dataset.icon);
      event.dataTransfer.effectAllowed = "copy";

      event.target.classList.add("dragging");

      const type = event.target.dataset.type;
      if (type === "Reconhecimento Facial" || type === "Biometria") {
        if (dropFeedback) dropFeedback.style.display = "block";
      }
    });

    item.addEventListener("dragend", (event) => {
      event.target.classList.remove("dragging");

      if (dropFeedback) dropFeedback.style.display = "none";
    });
  });

  dropzone.addEventListener("dragenter", (event) => {
    event.preventDefault();
    dropzone.classList.add("drag-over");
  });

  dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  });

  dropzone.addEventListener("dragleave", (event) => {
    dropzone.classList.remove("drag-over");
  });

  dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    dropzone.classList.remove("drag-over");

    const draggedItemId = event.dataTransfer.getData("text/plain");
    const itemType = event.dataTransfer.getData("text/type");
    const itemIconClass = event.dataTransfer.getData("text/icon");

    const x = event.offsetX;
    const y = event.offsetY;

    console.log(
      `Dropped: ${itemType} (ID: ${draggedItemId}) at X: ${x}, Y: ${y}`
    );

    createDroppedElement(itemType, itemIconClass, x, y, dropzone);

    if (itemType === "Reconhecimento Facial") {
      if (dropFeedback) dropFeedback.style.display = "block";
    }
  });

  function createDroppedElement(type, iconClass, x, y, container) {
    const droppedElement = document.createElement("div");
    droppedElement.classList.add("dropped-item");
    droppedElement.dataset.type = type;

    // Adiciona ícone e texto
    const iconElement = document.createElement("i");
    iconElement.className = `bi ${iconClass}`;
    droppedElement.appendChild(iconElement);

    const textElement = document.createElement("span");
    textElement.textContent = type;
    droppedElement.appendChild(textElement);

    droppedElement.style.left = `${x}px`;
    droppedElement.style.top = `${y}px`;

    droppedElement.draggable = true;

    container.appendChild(droppedElement);
  }
});
