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

function openAdd() {
  console.log("open add");
  var x = document.getElementById("addRecipe");
  var addIcon = document.getElementById("add-icon");
  var recipeListing = document.getElementById("recipe-listing");
  if (x.style.display === "block") {
    x.style.display = "none";
    addIcon.style.color = "#208AAE";
    // recipeListing.style.display = "block";
  } else {
    x.style.display = "block";
    addIcon.style.color = "#fdb833";
    // recipeListing.style.display = "none";
  }
}

// function addRecipeSquare(recipeName, imageUrl) {
//   console.log("adding recipe square");

//   const newRecipeSquare = document.createElement("div");
//   newRecipeSquare.className = "recipe-square";

//   // Create the necessary elements
//   const img = document.createElement("img");
//   img.className = "dish-pic";
//   img.src = imageUrl;
//   img.alt = recipeName;

//   const recipeTextColumn = document.createElement("div");
//   recipeTextColumn.className = "recipe-text-column";

//   const recipeTextRow = document.createElement("div");
//   recipeTextRow.className = "recipe-text-row";

//   const recipeTitle = document.createElement("h1");
//   recipeTitle.className = "recipe-title";
//   recipeTitle.textContent = recipeName;

//   // Assemble the elements
//   recipeTextRow.appendChild(recipeTitle);
//   recipeTextColumn.appendChild(recipeTextRow);
//   newRecipeSquare.appendChild(img);
//   newRecipeSquare.appendChild(recipeTextColumn);

//   // Add the new recipe square to the page
//   const recipeListing = document.getElementById("recipe-listing");
//   recipeListing.appendChild(newRecipeSquare);
// }

// function saveRecipe() {
//   console.log("saving recipe");
//   // Get form input values
//   const recipeName = document.querySelector('input[type="text"]').value;
//   const ingredients = document.querySelector('textarea:nth-child(2)').value;
//   const instructions = document.querySelector('textarea:nth-child(3)').value;
//   const imageFile = document.getElementById('image').files[0];

//   // Create an object to store the data
//   const recipeData = {
//       name: recipeName,
//       ingredients: ingredients,
//       instructions: instructions,
//       image: imageFile
//   };

//   // call the function to add the recipe square
//   addRecipeSquare(recipeName, imageFile.src);

//   // // Optionally, you can reset the form after submission
//   // document.getElementById("recipeForm").reset();
// }

function addRecipeSquare(recipeName, imageUrl, prepTime) {
  console.log("adding recipe square");

  const newRecipeSquare = document.createElement("div");
  newRecipeSquare.className = "recipe-square";

  // Create the elements
  const img = document.createElement("img");
  img.className = "dish-pic";
  img.src = imageUrl; // Set the image URL directly

  img.alt = recipeName;

  const recipeTextColumn = document.createElement("div");
  recipeTextColumn.className = "recipe-text-column";

  // const recipeTextRow = document.createElement("div");
  // recipeTextRow.className = "recipe-text-row";

  const leftRecipeTextRow = document.createElement("div"); 
  leftRecipeTextRow.className = "recipe-text-row";

  const rightRecipeTextRow = document.createElement("div"); 
  rightRecipeTextRow.className = "recipe-text-row";
  clockIcon = document.getElementById("clock-icon").cloneNode(true);
  const prepTimeH2 = document.createElement("h2");
  prepTimeH2.className = "prep-time";
  prepTimeH2.textContent = prepTime + " min";

  const recipeTitle = document.createElement("h1");
  recipeTitle.className = "recipe-title";
  recipeTitle.textContent = recipeName;

  // Assemble the elements
  leftRecipeTextRow.appendChild(recipeTitle);
  rightRecipeTextRow.appendChild(clockIcon);
  rightRecipeTextRow.appendChild(prepTimeH2);
  recipeTextColumn.appendChild(leftRecipeTextRow);
  recipeTextColumn.appendChild(rightRecipeTextRow);
  newRecipeSquare.appendChild(img);
  newRecipeSquare.appendChild(recipeTextColumn);

  // Add the new recipe square to the page
  const recipeListing = document.getElementById("recipe-listing");
  recipeListing.appendChild(newRecipeSquare);
}

function saveRecipe() {
  try {
    console.log("saving recipe");

    const recipeName = document.getElementById("form-recipe-name").value;
    const ingredients = document.getElementById("form-ingredients").value;
    const instructions = document.getElementById("form-instructions").value;
    const prepTime = document.getElementById("form-prep-time").value;
    const imageUrl = document.getElementById("form-recipe-pic").value;

    addRecipeSquare(recipeName, imageUrl, prepTime);

    // // Check if an image file is selected
    // if (imageFile) {
    //     // Create a temporary URL for the selected image file
    //     const imageUrl = URL.createObjectURL(imageFile);

    //     // Call the function to add the recipe square with the temporary URL
    //     addRecipeSquare(recipeName, imageUrl);
    // } else {
    //     // Handle the case where no image is selected
    //     alert("Please select an image file.");
    // }
  } catch (e) {
   console.log(e);
  }

  // Get form input values
  // const recipeName = document.querySelector('input[type="text"]').value;
  // const ingredients = document.querySelector('textarea:nth-child(2)').value;
  // const instructions = document.querySelector('textarea:nth-child(3)').value;
  // const imageFile = document.getElementById('image').files[0];

  // addRecipeSquare(recipeName, imageFile.src);

  // Check if an image file is selected
  // if (imageFile) {
  //     // Create a temporary URL for the selected image file
  //     const imageUrl = URL.createObjectURL(imageFile);

  //     // Call the function to add the recipe square with the temporary URL
  //     addRecipeSquare(recipeName, imageUrl);
  // } else {
  //     // Handle the case where no image is selected
  //     alert("Please select an image file.");
  // }

  // Optionally, you can reset the form after submission
  // document.getElementById("recipeForm").reset();
}

function switchTab(evt, tabName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  ele = document.getElementById(tabName).style.display = "block";
  console.log(ele)
  evt.currentTarget.className += " active";

  console.log(evt.currentTarget.className)
}


// Choices tab display options when button clicked
function displayPreferences() {
  // Get the selected cuisine
  const selectedCuisine = document.querySelector('input[name="cuisine"]:checked');

  // Get the selected dietary preference
  const selectedDietaryPreference = document.getElementById('dietary-preference').value;

  // Display the selected preferences
  const userPreferences = document.getElementById('user-preferences');
  userPreferences.innerHTML = '';

  if (selectedCuisine) {
    const cuisineText = document.createElement('p');
    cuisineText.textContent = `Preferred Cuisine: ${selectedCuisine.value}`;
    userPreferences.appendChild(cuisineText);
  }

  if (selectedDietaryPreference !== 'None') {
    const dietaryPreferenceText = document.createElement('p');
    dietaryPreferenceText.textContent = `Dietary Preference: ${selectedDietaryPreference}`;
    userPreferences.appendChild(dietaryPreferenceText);
  }
}


// Function to display the to-do list
var todoItems = [];

// Function to generate a random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to add a new item to the to-do list
function addItem() {
  var todoItem = document.getElementById("todo-item").value.trim();
  if (todoItem !== "") {
    // Create a unique ID for each item (for future enhancements)
    var itemId = new Date().getTime().toString();
    var itemColor = getRandomColor(); // Generate a random color
    todoItems.push({ id: itemId, text: todoItem, completed: false, color: itemColor });
    document.getElementById("todo-item").value = "";
    displayTodoList();
  }
}

// Function to display the to-do list
function displayTodoList() {
  var todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear the existing list

  for (var i = 0; i < todoItems.length; i++) {
    var item = todoItems[i];
    var listItem = document.createElement("li");
    listItem.style.backgroundColor = "gray"; // Apply a random background color
    listItem.innerHTML = '<div class="todo-item">'
      + '<input type="checkbox" onclick="toggleComplete(' + i + ')"' + (item.completed ? ' checked' : '') + '>'
      + '<span class="todo-text' + (item.completed ? ' completed' : '') + '">' + item.text + '</span>'
      + '</div>'
      + '<button class="delete-button" onclick="deleteItem(' + i + ')">Delete</button>';
    todoList.appendChild(listItem);
  }
}

// Function to toggle item completion
function toggleComplete(index) {
  todoItems[index].completed = !todoItems[index].completed;
  displayTodoList();
}

// Function to delete an item from the to-do list
function deleteItem(index) {
  todoItems.splice(index, 1);
  displayTodoList();
}

// Function to handle the popup
function openPopup() {
  document.getElementById('alert').style.display = 'block';
}

function closePopup() {
  document.getElementById('alert').style.display = 'none';
}