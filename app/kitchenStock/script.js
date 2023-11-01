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
// Function to load items from local storage
function loadItems(storageKey, itemsListId) {
  const itemsList = document.getElementById(itemsListId);

  // Check if there are items in local storage
  if (localStorage.getItem(storageKey)) {
    const items = JSON.parse(localStorage.getItem(storageKey));

    items.forEach(item => {
      const listItem = createListItem(item.name, item.quantity, storageKey);
      itemsList.appendChild(listItem);
    });
  }
}

// Call the function to load items when the page loads for the fridge and freezer lists
window.addEventListener("load", function() {
  loadItems("freezerItems", "freezer-items-list");
});
window.addEventListener("load", function() {
  loadItems("fridgeItems", "fridge-items-list");
});

// whereToPut, itemText, quantity, typeInput, expirationInput
// Function to create a list item element
function createListItem(storageKey, itemText, quantity, type, expiration) {
  const listItem = document.createElement("li");

  // Create a div to hold the item info
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
    updateItemInLocalStorage(itemText, parseInt(itemQuantity.value), storageKey);
  });

  const decreaseButton = document.createElement("button");
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", function () {
    const currentQuantity = parseInt(itemQuantity.value);
    if (currentQuantity > 1) {
      itemQuantity.value = currentQuantity - 1;
      updateItemInLocalStorage(itemText, currentQuantity - 1, storageKey);
    } else {
      // Remove the item from the list if quantity reaches 0
      itemsList.removeChild(listItem);
      removeItemFromLocalStorage(itemText, storageKey);
    }
  });
  // Create elements for displaying type and expiration
  const itemType = document.createElement("span");
  itemType.textContent = "Type: " + type;
  const itemExpiration = document.createElement("span");
  itemExpiration.textContent = "Expiration: " + expiration;

  // Create a "Remove" button
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    itemsList.removeChild(listItem);
    removeItemFromLocalStorage(itemText, storageKey);
  });

  itemDiv.appendChild(itemName);
  itemDiv.appendChild(itemQuantity);
  itemDiv.appendChild(itemType);
  itemDiv.appendChild(itemExpiration);
  itemDiv.appendChild(increaseButton);
  itemDiv.appendChild(decreaseButton);
  listItem.appendChild(itemDiv);
  listItem.appendChild(removeButton);

  return listItem;
}

// Function to add an item with a quantity to the list
function addItem() {
  const whereToPutSelector = document.getElementById("list-selector-where");
  const whereToPut = whereToPutSelector.value; // Get the selected list (fridge or freezer)
  const itemInput = document.getElementById("item-input");
  const quantityInput = document.getElementById("item-quantity");
  const typeInputSelector = document.getElementById("list-selector-type");
  const typeInput = typeInputSelector.value; // Get the selected type
  const expirationInput = document.getElementById("item-expiration");
  const itemText = itemInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  const expiration = expirationInput.value;
  
  
  if (itemText !== "" && !isNaN(quantity) && quantity > 0) {
    const itemsListId = `${whereToPut}-items-list`; // Create the itemsListId based on the selected list
    console.log(itemsListId);
    const itemsList = document.getElementById(itemsListId);
    const listItem = createListItem(whereToPut, itemText, quantity, typeInput, expirationInput);

    // Save the item to local storage
    const storageKey = `${whereToPut}Items`;
    saveItemToLocalStorage(itemText, quantity, storageKey);

    itemsList.appendChild(listItem);
    itemInput.value = "";
    quantityInput.value = "";
  }
}

document.getElementById("add-item-button").addEventListener("click", addItem);

function goBack() {
  location.href = '../kitchenStock/kitchenStock.html';
}

// Function to save an item to local storage
function saveItemToLocalStorage(itemText, quantity, storageKey) {
  const items = JSON.parse(localStorage.getItem(storageKey)) || [];

  items.push({ name: itemText, quantity: quantity });
  localStorage.setItem(storageKey, JSON.stringify(items));
}

// Function to update an item in local storage
function updateItemInLocalStorage(itemText, quantity, storageKey) {
  const items = JSON.parse(localStorage.getItem(storageKey)) || [];

  const itemIndex = items.findIndex(item => item.name === itemText);
  if (itemIndex !== -1) {
    items[itemIndex].quantity = quantity;
    localStorage.setItem(storageKey, JSON.stringify(items));
  }
}

// Function to remove an item from local storage
function removeItemFromLocalStorage(itemText, storageKey) {
  const items = JSON.parse(localStorage.getItem(storageKey)) || [];

  const updatedItems = items.filter(item => item.name !== itemText);
  localStorage.setItem(storageKey, JSON.stringify(updatedItems));
}