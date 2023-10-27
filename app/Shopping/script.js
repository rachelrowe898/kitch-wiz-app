const previousLists = {};
previousLists["Dinner"] = ["Chicken", "Orange Juice", "Ice Cream", "Carrots", "Bananas"];
previousLists["Baking"] = ["Flour", "Sugar", "Apples", "Salt", "Eggs"];
previousLists["Curry"] = ["Chicken", "Potatoes", "Carrots", "Onions", "Salt"];


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
  const listNameInput = document.getElementById("list-name");

    // Split the items by lines and remove any leading/trailing whitespace
    const items = itemListTextarea.value.split('\n').map(item => item.trim());
    // Clear the existing checkboxForm
    checkboxList.innerHTML = '';
    console.log(items);
    previousLists[listNameInput]=items;
    console.log(previousLists);

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


document.getElementById("previous-lists").addEventListener("click", function () {
  const itemListTextarea = document.getElementById("item-list");
  const checkboxModal = document.getElementById("checkbox-modal");
  const checkboxList = document.getElementById("checkbox-list");
  const listNameInput = document.getElementById("list-name");

    // Split the items by lines and remove any leading/trailing whitespace
    const items = itemListTextarea.value.split('\n').map(item => item.trim());
    // Clear the existing checkboxForm
    checkboxList.innerHTML = '';
    console.log(items);
    previousLists.push(items);
    console.log(previousLists);

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


document.getElementById("close-button").addEventListener("click", function () {
  const checkboxModal = document.getElementById("checkbox-modal");
  document.getElementById("item-list-form").reset();
  // Hide the popup
  checkboxModal.style.display = "none";
});

