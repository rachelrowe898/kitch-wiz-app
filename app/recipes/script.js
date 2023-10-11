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

function closeAdd() {
  var x = document.getElementById("addRecipe");
  var addIcon = document.getElementById("add-icon");
  x.style.display = "none";
  addIcon.style.color = "#208AAE";
}

function closeFilter() {
  var x = document.getElementById("filterMenu");
  var filterIcon = document.getElementById("filter-icon");
  x.style.display = "none";
  filterIcon.style.color = "#208AAE";
}

function closeSort() {
  var x = document.getElementById("sortMenu");
  var sortButton = document.getElementsByClassName("sortDropdownButton")[0];
  x.style.display = "none";
  sortButton.style.backgroundColor = "#208AAE";
}

function openAdd() {
  var x = document.getElementById("addRecipe");
  var addIcon = document.getElementById("add-icon");
  if (x.style.display === "block") {
    x.style.display = "none";
    addIcon.style.color = "#208AAE";
  } else {
    x.style.display = "block";
    addIcon.style.color = "#fdb833";
    closeFilter();
    closeSort();
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

// function flipSort() {
//   console.log("flip sort");
//   var x = document.getElementById("sort-icon");
//   if (x.className === "fa fa-sort-amount-asc") {
//     x.className = "fa fa-sort-amount-desc";
//   } else {
//     x.className = "fa fa-sort-amount-asc"; 
//   }
// }

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

function openSort() {
  // Get the dropdown button element
  const dropdownButton = document.getElementsByClassName('sortDropdownButton')[0];

  var dropdownMenu = document.getElementById("sortMenu");
  var addRecipe = document.getElementById("addRecipe");
  var addIcon = document.getElementById("add-icon");

  if (dropdownMenu.style.display === "none") {
    var dropdownMenu = document.getElementById("sortMenu");
    dropdownMenu.style.display = "block";
    dropdownButton.style.backgroundColor = "#fdb833";
    closeAdd();
    closeFilter();
  } else {
    var dropdownMenu = document.getElementById("sortMenu");
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

    sortMenuAsc = document.getElementById("sortMenuAsc");
    sortMenuDesc = document.getElementById("sortMenuDesc");

    if (order === 'asc') {
      sortMenuAsc.style.color = "#fdb833";
      sortMenuDesc.style.color = "white";
      return timeA - timeB;
    } else if (order === 'desc') {
      sortMenuDesc.style.color = "#fdb833";
      sortMenuAsc.style.color = "white";
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

function openFilter() {
  var x = document.getElementById("filterMenu");
  var filterIcon = document.getElementById("filter-icon");
  if (x.style.display === "block") {
    x.style.display = "none";
    filterIcon.style.color = "#208AAE";
  } else {
    x.style.display = "block";
    filterIcon.style.color = "#fdb833";
    closeAdd();
    closeSort();
    // recipeListing.style.display = "none";
  }
}

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#FDB833', controlSlider);
  if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
  } else {
      fromSlider.value = from;
  }
}
  
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#FDB833', controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
      toSlider.value = to;
      toInput.value = to;
  } else {
      toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
const [from, to] = getParsed(fromSlider, toSlider);
fillSlider(fromSlider, toSlider, '#C6C6C6', '#FDB833', toSlider);
if (from > to) {
  fromSlider.value = to;
  fromInput.value = to;
} else {
  fromInput.value = from;
}
}

function controlToSlider(fromSlider, toSlider, toInput) {
const [from, to] = getParsed(fromSlider, toSlider);
fillSlider(fromSlider, toSlider, '#C6C6C6', '#FDB833', toSlider);
setToggleAccessible(toSlider);
if (from <= to) {
  toSlider.value = to;
  toInput.value = to;
} else {
  toInput.value = from;
  toSlider.value = from;
}
}

function getParsed(currentFrom, currentTo) {
const from = parseInt(currentFrom.value, 10);
const to = parseInt(currentTo.value, 10);
return [from, to];
}

/* filter slider code */
function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max-to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
    ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
    ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
const toSlider = document.querySelector('#toSlider');
if (Number(currentTarget.value) <= 0 ) {
  toSlider.style.zIndex = 2;
} else {
  toSlider.style.zIndex = 0;
}
}

const fromSlider = document.querySelector('#fromSlider');
const toSlider = document.querySelector('#toSlider');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#FDB833', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);