function openNav() {
    var x = document.getElementById("menuLinks");
    var userSection = document.getElementById("user-profile-section");
    if (x.style.display === "block") {
      x.style.display = "none";
      userSection.style.marginTop = "150px";
    } else {
      x.style.display = "block";
      userSection.style.marginTop = "300px";
    }
}

function saveUserProfile() {
  // Get the selected values from the form fields
  var foodPreference = document.getElementById("food-preference").value;
  var allergies = document.getElementById("allergies").value;
  var difficulty = document.getElementById("difficulty").value;
  var diet = document.getElementById("diet").value;

  // log the values to the console.
  console.log("Food Preference: " + foodPreference);
  console.log("Allergies: " + allergies);
  console.log("Preparation Difficulty: " + difficulty);
  console.log("Diet: " + diet);

  showPopup("User profile is saved!"); // Show the popup when the user profile is saved
}

function showPopup(message) {
  var messageDisplay = document.createElement("div");
  messageDisplay.className = "message-display";
  messageDisplay.textContent = message; // Set the text content of the message display

  // Insert the message display at the bottom of the user-profile-page element
  var userProfPage = document.querySelector(".user-profile");
  userProfPage.appendChild(messageDisplay);

  setTimeout(function () {
    messageDisplay.style.display = "none";
  }, 2000); // Message display disappears after 2 seconds
}

function openUserProfile(username) {
  window.location.href = "userGroup_" + username + ".html";
}

function goBackToUserGroups(){
  window.location.href = "userGroups.html";
}

function openAddProfile() {

}

function openDeleteProfile() {

}

function createUserGroup() {
  
}