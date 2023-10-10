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
  var sortDropdown = document.getElementsByClassName("dropdown-menu")[0];
  var sortDropdownButton = document.getElementsByClassName("sortDropdownButton")[0];
  if (x.style.display === "block") {
    x.style.display = "none";
    addIcon.style.color = "#208AAE";
  } else {
    x.style.display = "block";
    addIcon.style.color = "#fdb833";
    sortDropdown.style.display = "none";
    sortDropdownButton.style.backgroundColor = "#208AAE";
    // recipeListing.style.display = "none";
  }
}

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
  } catch (e) {
   console.log(e);
  }
}

function flipSort() {
  console.log("flip sort");
  var x = document.getElementById("sort-icon");
  if (x.className === "fa fa-sort-amount-asc") {
    x.className = "fa fa-sort-amount-desc";
  } else {
    x.className = "fa fa-sort-amount-asc"; 
  }
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

function openDropdown() {
  // Get the dropdown button element
  const dropdownButton = document.getElementsByClassName('sortDropdownButton')[0];

  var dropdownMenu = document.getElementsByClassName("dropdown-menu")[0];
  var addRecipe = document.getElementById("addRecipe");
  var addIcon = document.getElementById("add-icon");

  if (dropdownMenu.style.display === "none") {
    var dropdownMenu = document.getElementsByClassName("dropdown-menu")[0];
    dropdownMenu.style.display = "block";
    dropdownButton.style.backgroundColor = "#fdb833";
    addRecipe.style.display = "none";
    addIcon.style.color = "#208AAE";
  } else {
    var dropdownMenu = document.getElementsByClassName("dropdown-menu")[0];
    dropdownMenu.style.display = "none";
    dropdownButton.style.backgroundColor = "#208AAE";
  }
}

function zipArrays(arr1, arr2) {
  const zippedArray = [];

  const minLength = Math.min(arr1.length, arr2.length);

  for (let i = 0; i < minLength; i++) {
    zippedArray.push([arr1[i], arr2[i]]);
  }

  return zippedArray;
}

function sortRecipes(order) {
  const recipeSquares = document.getElementsByClassName('recipe-square');
  const prepTimes = document.getElementsByClassName('prep-time');

  console.log(recipeSquares);
  console.log(prepTimes);

  const zippedRecipesTimes = zipArrays(recipeSquares, prepTimes);

  const sortedZipped = Array.from(zippedRecipesTimes).sort((a, b) => {
    // console.log(a.childNodes);
    // console.log(a.childNodes[4]);
    // console.log(b.childNodes[4]);
    // console.log(a.querySelector('.prep-time'));
    console.log(a[1].textContent)
    const timeA = parseInt(a[1].textContent.split(' ')[0]);
    const timeB = parseInt(b[1].textContent.split(' ')[0]);

    console.log("timeA", timeA);
    console.log("timeB", timeB);

    if (order === 'asc') {
      return timeA - timeB;
    } else if (order === 'desc') {
      return timeB - timeA;
    }
  });

  const sortedRecipeSquares = sortedZipped.map(tuple => tuple[0]);

  const container = document.getElementById('recipe-listing');

  // Clear the container
  container.innerHTML = '';

  // Append the sorted recipe squares back to the container
  sortedRecipeSquares.forEach((square) => {
    container.appendChild(square);
  });
}
