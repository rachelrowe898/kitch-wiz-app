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
    listItem.style.backgroundColor = item.color; // Apply a random background color
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
