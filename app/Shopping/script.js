const previousLists = {};
previousLists["Dinner"] = ["Chicken 2 pound(s)", "Orange Juice 1 gallon(s)", "Ice Cream 2 quart(s)", 
"Carrots 2 pound(s)", "Bananas 3 pound(s)"];
previousLists["Baking"] = ["Flour 5 pound(s)", "Sugar 10 pound(s)", "Apples 3 pound(s)", "Salt 6 ounce(s)", "Eggs 12 count(s)"];
previousLists["Curry"] = ["Chicken 2 pound(s)", "Potatoes 3 pound(s)", "Carrots 2 pound(s)", "Onions 6 count", "Salt 6 ounce(s)"];

const savedLists = {}
savedLists["Noodles"] = ["Noodles 5 ounce(s)", "Chicken Stock 1 quart(s)", "Carrots 1 pound(s)"];
savedLists["Beef Stew"] = ["Chuck Roast 3 pound(s)", "Beef Stock 1 quart(s)", "Potatoes 2 pound(s)", "Carrots 1 pound(s)"];


const inputFields = document.querySelectorAll("input");

var keyboard = document.getElementById('keyboard');
var newListDiv = document.getElementsByClassName('new-list-section')[0];

// Add an event listener to hide the keyboard when clicking outside of it
document.addEventListener('click', function(event) {
  var keyboard = document.getElementById('keyboard');
  if (event.target !== keyboard && event.target !== document.getElementById('list-name') && event.target !== document.getElementById('item-input') && event.target !== document.getElementById('item-quantity')) {
      keyboard.style.display = 'none';
      newListDiv.style.flexBasis = 'auto';
  } else {
    keyboard.style.display = 'block';
    newListDiv.style.flexBasis = "40%";
    keyboard.style.display = '40%';
  }
});


// Hide the keyboard pop-up by default
// keyboardPopUp.style.height = "0";


// inputFields.forEach(input => {
//   input.addEventListener("focus", function () {
//       // Show the keyboard pop-up
//       keyboardPopUp.style.display = "block";
//       keyboardPopUp.style.height = "50%"; // Adjust the height as needed
//       document.getElementById("shopping-section").style.marginBottom = "300px";
//   });

//   input.addEventListener("blur", function () {
//       // Hide the keyboard pop-up when the input field loses focus
//       keyboardPopUp.style.height = "0";
//       document.getElementById("shopping-section").style.marginBottom = "0px";
//   });
// });

function goBackToShopping() {
  location.href = '../Shopping/shopping.html';
}
function openNav() {
  var x = document.getElementById("menuLinks");
  var shoppingSection = document.getElementById("list-section");
  if (x.style.display === "block") {
    x.style.display = "none";
    shoppingSection.style.marginTop = "60px";
  } else {
    x.style.display = "block";
    shoppingSection.style.marginTop = "-14px";
  }
}

function openNewList() {
  var x = document.getElementById("create-list");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}



function loadLists(key, listNameId) {
  const list = JSON.parse(localStorage.getItem(key));
  const shoppingList = document.getElementById(listNameId);
  console.log(list);
  for (const listName in savedLists) {
    if (savedLists.hasOwnProperty(listName)) {
      console.log(`List: ${listName}`);
      const ingredients = savedLists[listName];
      ingredients.forEach(ingredient => {
        console.log(`  - ${ingredient}`);
      });
    }
  }
  savedLists.forEach(item => {
    const listItem = document.createElement("li");
    shoppingList.textContent = item;
    shoppingList.appendChild(listItem);
  })
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
  const listNameInput = document.getElementById("list-name");

    // Split the items by lines and remove any leading/trailing whitespace
    const items = itemListTextarea.value.split('\n').map(item => item.trim());
    // Clear the existing checkboxForm
    checkboxList.innerHTML = '';
    previousLists[listNameInput]=items;

    const listTitle = document.createElement("h2");
    listTitle.id = "checklist-title";
    listTitle.textContent = listNameInput.value; // Set the title text
    checkboxList.appendChild(listTitle);

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

function bakeButton() {
  const ingredients = previousLists["Baking"];
  const checkboxModal = document.getElementById("checkbox-modal");
  const checkboxList = document.getElementById("checkbox-list");
  const listNameInput = "Baking";
    // Clear the existing checkboxForm
    checkboxList.innerHTML = '';

    const listTitle = document.createElement("h2");
    listTitle.id = "checklist-title";
    listTitle.textContent = listNameInput; // Set the title text
    checkboxList.appendChild(listTitle);

    // Create checkboxes for each item and add them to the checkboxForm
    ingredients.forEach(item => {
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
    checkboxModal.style.transform = "translateY(-600px)";
    checkboxModal.style.display = "block";
}

function closeBakeButton() {
  document.getElementById("checkbox-modal").style.display = "none";
}

document.getElementById("add-item-button").addEventListener("click", function () {
  const itemInput = document.getElementById("item-input");
  const quantityInput = document.getElementById("item-quantity").value;
  const typeInputSelector = document.getElementById("list-selector-type");
  const typeInput = typeInputSelector.value; // Get the selected type
  const itemText = itemInput.value.trim();
  const listBox = document.getElementById("item-list");

  const val = itemText + " " + quantityInput + " " + typeInput;
  
  if (val) {
    listBox.value += val + "\n";
  }
});

document.getElementById("remove-item-button").addEventListener("click", function () {
  const lines = document.getElementById("item-list").value.split("\n");
  if (lines.length > 0) {
      lines.shift(); // Remove the first line (top-most name)
      document.getElementById("item-list").value = lines.join("\n");
  }
});


document.getElementById("close-button").addEventListener("click", function () {
  const checkboxModal = document.getElementById("checkbox-modal");
  document.getElementById("item-list").value="";
  // Hide the popup
  checkboxModal.style.display = "none";
});

