let dropConcluido = false;

document.addEventListener("DOMContentLoaded", () => {
  const draggableItems = document.querySelectorAll(
    '.sig-option[draggable="true"]'
  );
  const dropzone = document.getElementById("document-dropzone");

  draggableItems.forEach((item) => {
    item.addEventListener("dragstart", (event) => {
      dropConcluido = false;
      event.dataTransfer.setData("text/plain", event.target.id);
      event.dataTransfer.effectAllowed = "copy";
      event.target.classList.add("dragging");
    });

    item.addEventListener("dragend", (event) => {
      event.target.classList.remove("dragging");
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
    const draggedElement = document.getElementById(draggedItemId);
    const itemType = draggedElement?.dataset.type;
    const itemIconClass = draggedElement?.dataset.icon;

    const x = event.offsetX;
    const y = event.offsetY;

    createDroppedElement(itemType, itemIconClass, x, y, dropzone);
    dropConcluido = true;

    if (draggedElement) {
      draggedElement.remove();
    }
  });

  function createDroppedElement(type, iconClass, x, y, container) {
    const droppedElement = document.createElement("div");
    droppedElement.classList.add("dropped-item");
    droppedElement.dataset.type = type;

    droppedElement.style.position = "absolute";
    droppedElement.style.left = `${x}px`;
    droppedElement.style.top = `${y}px`;
    droppedElement.draggable = true;

    const contentWrapper = document.createElement("div");
    contentWrapper.classList.add("d-flex", "align-items-center", "gap-1");

    const iconElement = document.createElement("i");
    iconElement.className = `bi ${iconClass}`;
    contentWrapper.appendChild(iconElement);

    const textElement = document.createElement("span");
    textElement.textContent = type;
    contentWrapper.appendChild(textElement);

    droppedElement.appendChild(contentWrapper);

    if (type === "Reconhecimento Facial") {
      const feedback = document.createElement("div");
      feedback.className = "alert alert-warning mt-1 p-2";
      feedback.style.fontSize = "13px";
      feedback.innerHTML = `
      <i class="bi bi-exclamation-triangle-fill text-warning"></i>
      <small>Atenção: a foto será adicionada em anexo.</small>`;
      droppedElement.appendChild(feedback);
    }

    container.appendChild(droppedElement);
    return droppedElement;
  }
});
