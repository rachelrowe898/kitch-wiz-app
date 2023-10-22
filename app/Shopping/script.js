
function openNewList() {
  var x = document.getElementById("create-list");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function openGroceryList() {
  var x = document.getElementById("grocery-list");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

document.getElementById("list-form-submit").addEventListener("click", function () {
  const itemListTextarea = document.getElementById("item-list");
  const checkboxModal = document.getElementById("checkbox-modal");
  const checkboxList = document.getElementById("checkbox-list");

    // Split the items by lines and remove any leading/trailing whitespace
    const items = itemListTextarea.value.split('\n').map(item => item.trim());
    // Clear the existing checkboxForm
    checkboxList.innerHTML = '';


    // Create checkboxes for each item and add them to the checkboxForm
    items.forEach(item => {
      if (item) {
          const label = document.createElement("label");
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          label.appendChild(checkbox);
          label.appendChild(document.createTextNode(item));
          label.classList.add("checkbox-list-item");
          checkboxList.appendChild(label);
      }
  });

    // Show the modal
    checkboxModal.style.display = "block";
});

document.getElementById("close-button").addEventListener("click", function () {
  const checkboxModal = document.getElementById("checkbox-modal");

  // Hide the popup
  checkboxModal.style.display = "none";
});

function saveList() {
  /* implement later */
}

