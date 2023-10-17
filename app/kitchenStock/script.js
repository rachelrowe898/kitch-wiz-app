function openNav() {
    var x = document.getElementById("menuLinks");
    var recipeSection = document.getElementById("recipe-section");
    if (x.style.display === "block") {
      x.style.display = "none";
      recipeSection.style.marginTop = "150px";
    } else {
      x.style.display = "block";
      recipeSection.style.marginTop = "300px";
    }
  }

  function showFridgeContents() {
    location.href = fridgeStock.html;
  }

  function showFreezerContents() {

  }

  function showAddRemoveItems() {
    
  }

// Function to add an item with a quantity to the list
function addItem() {
  const itemInput = document.getElementById("fridge-item-input");
  const quantityInput = document.getElementById("item-quantity");
  const itemText = itemInput.value.trim();
  const quantity = parseInt(quantityInput.value);

  if (itemText !== "" && !isNaN(quantity) && quantity > 0) {
      const itemsList = document.getElementById("fridge-items-list");
      const listItem = document.createElement("li");

      // Create a div to hold the item name and quantity
      const itemDiv = document.createElement("div");
      itemDiv.className = "item-div";

      const itemName = document.createElement("span");
      itemName.textContent = itemText;

      // Create a quantity input and buttons
      const itemQuantity = document.createElement("input");
      itemQuantity.type = "number";
      itemQuantity.value = quantity;
      itemQuantity.min = 1;
      itemQuantity.className = "quantity-input";

      const increaseButton = document.createElement("button");
      increaseButton.textContent = "+";
      increaseButton.addEventListener("click", function () {
          itemQuantity.value = parseInt(itemQuantity.value) + 1;
      });

      const decreaseButton = document.createElement("button");
      decreaseButton.textContent = "-";
      decreaseButton.addEventListener("click", function () {
          const currentQuantity = parseInt(itemQuantity.value);
          if (currentQuantity > 1) {
              itemQuantity.value = currentQuantity - 1;
          } else {
              // Remove the item from the list if quantity reaches 0
              itemsList.removeChild(listItem);
          }
      });

      // Create a "Remove" button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", function () {
          itemsList.removeChild(listItem);
      });

      itemDiv.appendChild(itemName);
      itemDiv.appendChild(itemQuantity);
      itemDiv.appendChild(increaseButton);
      itemDiv.appendChild(decreaseButton);
      listItem.appendChild(itemDiv);
      listItem.appendChild(removeButton);
      itemsList.appendChild(listItem);
      itemInput.value = "";
      quantityInput.value = "";
  }
}

document.getElementById("add-item-button").addEventListener("click", addItem);

function goBack() {
  location.href = '../kitchenStock/kitchenStock.html';
}