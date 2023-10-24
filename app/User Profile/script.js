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

    // Get the contents of the json file.
    var jsonData = localStorage.getItem("userProfile.json");

    // console.log("extracted", jsonData)
    // Update the contents of the json file.
    jsonData = {
      "foodPreference": foodPreference,
      "allergies": allergies,
      "preparationDifficulty": difficulty,
      "diet": diet
    };
    // console.log("updated", jsonData)
    // Save the updated contents of the json file to localstorage.
    localStorage.setItem("userProfile.json", jsonData);

    // Log the updated data to the console
    console.log('User profile updated:', jsonData);
}

function openUserProfile(username) {
  window.location.href = "userGroup_" + username + ".html";
}

function goBackToUserGroups(){
  window.location.href = "userGroups.html";
}