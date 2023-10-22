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

function enableSubmit(){
  let inputs = document.querySelectorAll('div[required]'); // Enter your class name for a required field, this should also be reflected within your form fields.
  let btn = document.querySelector('input[type="submit"]');
  let isValid = true;
  for (var i = 0; i < inputs.length; i++){
    let changedInput = inputs[i];
    if (changedInput.value.trim() === "" || changedInput.value === null){
      isValid = false;
      break;
    }
  }
  btn.disabled = !isValid;
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

function addRecipeSquare(recipeName, imageUrl, prepTime, ingredients, instructions) {
  const newRecipeSquare = document.createElement("div");
  newRecipeSquare.className = "recipe-square";
  
  // Create the elements
  const img = document.createElement("img");
  img.className = "dish-pic";
  img.src = imageUrl;
  img.alt = recipeName;

  const recipeTextColumn = document.createElement("div");
  recipeTextColumn.className = "recipe-text-column";

  const leftRecipeTextRow = document.createElement("div");
  leftRecipeTextRow.className = "recipe-text-row";

  const rightRecipeTextRow = document.createElement("div");
  rightRecipeTextRow.className = "recipe-text-row";
  const clockIcon = document.getElementById("clock-icon").cloneNode(true);
  const prepTimeH2 = document.createElement("h2");
  prepTimeH2.className = "prep-time";
  prepTimeH2.textContent = prepTime + " min";

  const recipeTitle = document.createElement("h1");
  recipeTitle.className = "recipe-title";
  recipeTitle.textContent = recipeName;

  const recipePageIngredients = document.createElement("div");
  recipePageIngredients.style.display = "none";
  recipePageIngredients.className = "recipe-page-ingredients";
  const ingredientsHeading = document.createElement("h2");
  ingredientsHeading.className = "ingredients-heading";
  ingredientsHeading.textContent = "Ingredients";
  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "ingredients-list";
  ingredients.split('\n').forEach((ingredient) => {
    if (ingredient.trim() !== '') {
      const ingredientsListItem = document.createElement("li");
      ingredientsListItem.className = "ingredients-list-item";
      ingredientsListItem.textContent = ingredient.trim();
      ingredientsList.appendChild(ingredientsListItem);
    }
  });

  const recipePageInstructions = document.createElement("div");
  recipePageInstructions.style.display = "none";
  recipePageInstructions.className = "recipe-page-instructions";
  const instructionsHeading = document.createElement("h2");
  instructionsHeading.className = "instructions-heading";
  instructionsHeading.textContent = "Instructions";
  const instructionsList = document.createElement("ol");
  instructionsList.className = "instructions-list";
  instructions.split('\n').forEach((instruction) => {
    if (instruction.trim() !== '') {
      const instructionsListItem = document.createElement("li");
      instructionsListItem.className = "instructions-list-item";
      instructionsListItem.textContent = instruction.trim();
      instructionsList.appendChild(instructionsListItem);
    }
  });

  // Assemble the recipe page elements
  recipePageIngredients.appendChild(ingredientsHeading);
  recipePageIngredients.appendChild(ingredientsList);
  recipePageInstructions.appendChild(instructionsHeading);
  recipePageInstructions.appendChild(instructionsList);

  // Assemble the elements
  leftRecipeTextRow.appendChild(recipeTitle);
  rightRecipeTextRow.appendChild(clockIcon);
  rightRecipeTextRow.appendChild(prepTimeH2);
  recipeTextColumn.appendChild(leftRecipeTextRow);
  recipeTextColumn.appendChild(rightRecipeTextRow);
  newRecipeSquare.appendChild(img);
  newRecipeSquare.appendChild(recipeTextColumn);
  newRecipeSquare.appendChild(recipePageIngredients);
  newRecipeSquare.appendChild(recipePageInstructions);

  // Make new total recipe listing
  const recipeSquaresJSON = sessionStorage.getItem("allRecipeSquares");
  const recipeSquaresTemp = JSON.parse(recipeSquaresJSON);
  console.log("recipeSquaresTemp", recipeSquaresTemp);

  const newTotalRecipeSquares = [];

  recipeSquaresTemp.forEach((attributes) => {
    const element = document.createElement("div");
    element.innerHTML = attributes.innerHTML;
    element.onclick = new Function(attributes.onclick);
    element.setAttribute("style", attributes.style);
    element.className = "recipe-square";
    element.style = attributes.style;
    element.dietaryprefs = attributes.dietaryprefs;
    newTotalRecipeSquares.push(element);
  });

  // Add the new recipeSquare
  newTotalRecipeSquares.push(newRecipeSquare);

  // Save new total recipe listing to sessionStorage
  const newTotalRecipeSquaresArray = Array.from(newTotalRecipeSquares).map((element) => {
    const attributes = {};
    attributes.innerHTML = element.innerHTML;
    attributes.onclick = element.getAttribute("onclick");
    attributes.style = element.getAttribute("style");
    attributes.dietaryprefs = element.getAttribute("dietaryprefs");
    return attributes;
  });
  sessionStorage.setItem("allRecipeSquares", JSON.stringify(newTotalRecipeSquaresArray));

  // Add the new recipe square to the page
  const container = document.getElementById("recipe-listing");

  // Clear the container
  container.innerHTML = '';

  // Append the sorted recipe squares back to the container
  newTotalRecipeSquares.forEach((square) => {
    container.appendChild(square);
  });

  const templateContainer = document.getElementById("recipe-section");

  // add recipeSquareListener
  addRecipeSquareListener(newRecipeSquare, templateContainer);

  setFilterSliderMax();
}

function createRecipePage(recipeName, imageUrl, prepTime, ingredients, instructions) {
  const mainSection = document.getElementsByClassName("main-section")[0];

  // Create a new recipe page element
  const recipePage = document.createElement("div");
  recipePage.className = "recipe-page";
  recipePage.style.display = "none"; // Hide the recipe page by default

  // Create elements for the recipe page
  const recipeNameText = document.createElement("h2");
  recipeNameText.className = "recipe-name-text";
  recipeNameText.textContent = recipeName;

  const recipePageImg = document.createElement("img");
  recipePageImg.className = "recipe-page-pic";
  recipePageImg.src = imageUrl;
  recipePageImg.alt = recipeName;

  const recipePagePrepTime = document.createElement("div");
  recipePagePrepTime.className = "recipe-page-prep-time";
  const clockIcon = document.getElementById("clock-icon").cloneNode(true);
  const prepTimeH2 = document.createElement("h2");
  prepTimeH2.className = "prep-time";
  prepTimeH2.textContent = prepTime + " min";

  const recipePageIngredients = document.createElement("div");
  recipePageIngredients.className = "recipe-page-ingredients";
  const ingredientsHeading = document.createElement("h2");
  ingredientsHeading.className = "ingredients-heading";
  ingredientsHeading.textContent = "Ingredients";
  const ingredientsList = document.createElement("ul");
  ingredientsList.className = "ingredients-list";
  ingredients.split('\n').forEach((ingredient) => {
    if (ingredient.trim() !== '') {
      const ingredientsListItem = document.createElement("li");
      ingredientsListItem.className = "ingredients-list-item";
      ingredientsListItem.textContent = ingredient.trim();
      ingredientsList.appendChild(ingredientsListItem);
    }
  });

  const recipePageInstructions = document.createElement("div");
  recipePageInstructions.className = "recipe-page-instructions";
  const instructionsHeading = document.createElement("h2");
  instructionsHeading.className = "instructions-heading";
  instructionsHeading.textContent = "Instructions";
  const instructionsList = document.createElement("ol");
  instructionsList.className = "instructions-list";
  instructions.split('\n').forEach((instruction) => {
    if (instruction.trim() !== '') {
      const instructionsListItem = document.createElement("li");
      instructionsListItem.className = "instructions-list-item";
      instructionsListItem.textContent = instruction.trim();
      instructionsList.appendChild(instructionsListItem);
    }
  });

  // Assemble the recipe page elements
  recipePage.appendChild(recipeNameText);
  recipePage.appendChild(recipePageImg);
  recipePagePrepTime.appendChild(clockIcon);
  recipePagePrepTime.appendChild(prepTimeH2);
  recipePage.appendChild(recipePagePrepTime);
  recipePageIngredients.appendChild(ingredientsHeading);
  recipePageIngredients.appendChild(ingredientsList);
  recipePage.appendChild(recipePageIngredients);
  recipePageInstructions.appendChild(instructionsHeading);
  recipePageInstructions.appendChild(instructionsList);
  recipePage.appendChild(recipePageInstructions);

  // Append the recipe page to the main section
  mainSection.appendChild(recipePage);
}

function saveRecipe() {
  try {
    const recipeName = document.getElementById("form-recipe-name").value;
    const ingredients = document.getElementById("form-ingredients").value;
    const instructions = document.getElementById("form-instructions").value;
    const prepTime = document.getElementById("form-prep-time").value;
    let imageUrl = "";
    if (document.getElementById("form-recipe-pic").value !== "") {
      imageUrl = document.getElementById("form-recipe-pic").value;
      console.log(imageUrl)
    } else {
      imageUrl = "../images/defaultrecipe-pic.jpeg";
    }

    addRecipeSquare(recipeName, imageUrl, prepTime, ingredients, instructions);
  } catch (e) {
   console.log(e);
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
  evt.currentTarget.className += " active";
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
  const recipeSquaresJSON = sessionStorage.getItem("allRecipeSquares");

  // Convert the JSON string back to an array of attributes
  const recipeSquaresTemp = JSON.parse(recipeSquaresJSON);

  const recipeSquares = [];
  const prepTimes = [];

  recipeSquaresTemp.forEach((attributes) => {
    const element = document.createElement("div");
    element.innerHTML = attributes.innerHTML;
    element.onclick = new Function(attributes.onclick);
    element.setAttribute("style", attributes.style);
    element.className = "recipe-square";
    element.style = attributes.style;
    element.dietaryprefs = attributes.dietaryprefs;
    recipeSquares.push(element);
    prepTimes.push(element.querySelector(".prep-time").textContent);
  });

  const zippedRecipesTimes = zipArrays(recipeSquares, prepTimes);

  const sortedZipped = Array.from(zippedRecipesTimes).sort((a, b) => {
    const timeA = parseInt(a[1].split(' ')[0]);
    const timeB = parseInt(b[1].split(' ')[0]);

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
try {
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#FDB833', toSlider);
} catch (e) {
  console.log(e)
}
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
  try {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
  } catch (e) {
    const rangeDistance = 0;
    const fromPosition = 0;
    const toPosition = 0;
  }
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
try {
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#FDB833', toSlider);
} catch (e) {
  console.log(e)
}
try {
  setToggleAccessible(toSlider);
} catch (e) {
  console.log(e)
}

try {
  fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
  toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
  fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
  toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);
} catch (e) {
  console.log(e)
}

function satisfyDietaryCheckboxConditions(dietaryCheckboxes, dietaryTags) {
  console.log("satisfyDietaryCheckboxConditions");
  console.log(dietaryCheckboxes);
  console.log(dietaryTags);
  if (dietaryCheckboxes.includes("vegetarian")) {
    if (!(dietaryTags.includes("vegetarian"))) {
      return false;
    }
  }
  if (dietaryCheckboxes.includes("vegan")) {
    if (!(dietaryTags.includes("vegan"))) {
      return false;
    }
  }
  if (dietaryCheckboxes.includes("nut-free")) {
    if (!(dietaryTags.includes("nut-free"))) {
      return false;
    }
  }
  if (dietaryCheckboxes.includes("gluten-free")) {
    if (!(dietaryTags.includes("gluten-free"))) {
      return false;
    }
  }
  return true;
}

function applyFilter() {
  try {
    // get form inputs
    minTime = parseInt(document.getElementById("fromInput").value);
    maxTime = parseInt(document.getElementById("toInput").value);

    var dietaryCheckboxes = [];

    if (document.getElementById("vegetarian-checkbox").checked) {
      dietaryCheckboxes.push("vegetarian");
    }
    if (document.getElementById("vegan-checkbox").checked) {
      dietaryCheckboxes.push("vegan");
    } 
    if (document.getElementById("gluten-checkbox").checked) {
      dietaryCheckboxes.push("gluten-free");
    } 
    if (document.getElementById("nut-checkbox").checked) {
      dietaryCheckboxes.push("nut-free");
    }

    const filteredRecipeSquares = [];
    const recipeSquaresJSON = sessionStorage.getItem("allRecipeSquares");

    // Convert the JSON string back to an array of attributes
    const recipeSquaresTemp = JSON.parse(recipeSquaresJSON);

    const recipeSquares = [];
    const prepTimes = [];
    const dietaryPrefs = [];

    recipeSquaresTemp.forEach((attributes) => {
      console.log("!!!!!!!!", attributes)
      const element = document.createElement("div");
      element.innerHTML = attributes.innerHTML;
      element.onclick = new Function(attributes.onclick);
      element.setAttribute("style", attributes.style);
      element.className = "recipe-square";
      element.style = attributes.style;
      element.dietaryprefs = attributes.dietaryprefs;

      recipeSquares.push(element);
      prepTimes.push(element.querySelector(".prep-time").textContent);
      dietaryPrefs.push(element.dietaryprefs);
    });

    console.log("recipe squares: ", recipeSquares)

    const zippedRecipesTimes = zipArrays(recipeSquares, prepTimes);

    for (let i = 0; i < zippedRecipesTimes.length; i++) {
      const recipeSquare = zippedRecipesTimes[i][0];
      const prepTime = parseInt(zippedRecipesTimes[i][1]);
      console.log("dietaryPrefs", dietaryPrefs);
      const currDietaryPrefs = dietaryPrefs[i];

      console.log("********** currdietaryprefs", currDietaryPrefs);

      if (prepTime >= minTime && prepTime <= maxTime && satisfyDietaryCheckboxConditions(dietaryCheckboxes, currDietaryPrefs)) {
        filteredRecipeSquares.push(recipeSquare);
      }

    }

    const container = document.getElementById('recipe-listing');

    // Clear the container
    container.innerHTML = '';

    // Append the sorted recipe squares back to the container
    filteredRecipeSquares.forEach((square) => {
      container.appendChild(square);
    });
  } catch (e){
    console.log(e)
  }
}

function setFilterSliderMax() {

  // Set the max time for fromSlider, toSlider, fromInput, toInput
  const recipeSquaresJSON = sessionStorage.getItem("allRecipeSquares");

  const recipeSquaresTemp = JSON.parse(recipeSquaresJSON);
  const recipeSquares = [];
  const prepTimes = [];
  let maxPrepTime = 0;

  recipeSquaresTemp.forEach((attributes) => {
    const element = document.createElement("div");
    element.innerHTML = attributes.innerHTML;
    element.onclick = new Function(attributes.onclick);
    element.setAttribute("style", attributes.style);
    element.className = "recipe-square";
    element.style = attributes.style;
    element.dietaryprefs = attributes.dietaryprefs;

    recipeSquares.push(element);
    prepTime = parseInt(element.querySelector(".prep-time").textContent);

    if (!isNaN(prepTime) && prepTime > maxPrepTime) {
      maxPrepTime = prepTime;
    }

  });

  fromSlider.setAttribute("max", maxPrepTime);
  toSlider.setAttribute("max", maxPrepTime);
  toSlider.setAttribute("value", maxPrepTime);
  fromInput.setAttribute("max", maxPrepTime);
  toInput.setAttribute("max", maxPrepTime);
  toInput.setAttribute("value", maxPrepTime);
}

function addRecipeSquareListener(recipeSquare, templateContainer) {
  // Add an event listener to each recipe square element
  recipeSquare.addEventListener("click", function () {
    // Check which template is currently displayed
    if (templateContainer.firstElementChild.id == "recipe-template") {
      // If recipesTemplate is displayed, replace it with recipePage

      console.log("recipeSquare", recipeSquare);
      console.log("recipeSquare.querySelector(.recipe-page-ingredients)", recipeSquare.querySelector(".recipe-page-ingredients"));

      // get relevant items from recipeSquare
      recipeTitle = recipeSquare.querySelector(".recipe-title").textContent;
      recipePicSrc = recipeSquare.querySelector(".dish-pic").src;
      recipePrepTime = recipeSquare.querySelector(".prep-time").textContent;
      recipeIngredients = recipeSquare.querySelector(".recipe-page-ingredients");
      recipeIngredients.style.display = "block";
      recipeInstructions = recipeSquare.querySelector(".recipe-page-instructions");
      recipeInstructions.style.display = "block";

      recipePage.content.querySelector(".recipe-name-text").textContent = recipeTitle;
      recipePage.content.querySelector(".recipe-page-pic").src = recipePicSrc;
      recipePage.content.querySelector(".prep-time").textContent = recipePrepTime;
      oldRecipeIngredients = recipePage.content.querySelector(".recipe-page-ingredients");
      recipePage.content.replaceChild(recipeIngredients, oldRecipeIngredients);
      oldRecipeInstructions = recipePage.content.querySelector(".recipe-page-instructions");
      recipePage.content.replaceChild(recipeInstructions, oldRecipeInstructions);

      templateContainer.innerHTML = "";
      templateContainer.appendChild(document.importNode(recipePage.content, true));
    } else {
      // If recipePage is displayed, replace it with recipesTemplate
      templateContainer.innerHTML = "";
      templateContainer.appendChild(document.importNode(recipesTemplate.content, true));
    }
  });
}

// Get references to the templates and the container where templates will be displayed
const recipesTemplate = document.getElementById("recipe-template");
const recipePage = document.getElementById("recipe-page");
const templateContainer = document.getElementById("recipe-section");

// Initially, display recipesTemplate
templateContainer.appendChild(document.importNode(recipesTemplate.content, true));

// Add an event listener to the button to switch between templates
const recipeSquareList = document.getElementsByClassName("recipe-square");

for (let i = 0; i < recipeSquareList.length; i++) {
  const recipeSquare = recipeSquareList[i];

  addRecipeSquareListener(recipeSquare, templateContainer);
}

// store recipe page in localStorage: recipeName -> [imageUrl, prepTime, ingredients, instructions]

if (sessionStorage.getItem("allRecipeSquares") === undefined || sessionStorage.getItem("allRecipeSquares") == null){
  console.log("entered first if");
  let allRecipeSquares = document.getElementsByClassName('recipe-square');
  console.log("allRecipeSquares", allRecipeSquares);
  const recipeSquaresArray = Array.from(allRecipeSquares).map((element) => {
    const attributes = {};
    attributes.innerHTML = element.innerHTML;
    attributes.onclick = element.getAttribute("onclick");
    attributes.style = element.getAttribute("style");
    attributes.dietaryprefs = element.getAttribute("dietaryprefs");
    console.log("attributes", attributes);
    return attributes;
  });
  sessionStorage.setItem("allRecipeSquares", JSON.stringify(recipeSquaresArray));
  console.log("beginning", sessionStorage.getItem("allRecipeSquares"));
}

try {
  setFilterSliderMax();
} catch (e) {
  console.log(e);
}