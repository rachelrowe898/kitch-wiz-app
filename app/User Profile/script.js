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
    const fs = require('fs');
    // Get the selected values from the form fields
    var foodPreference = document.getElementById("food-preference").value;
    var allergies = document.getElementById("allergies").value;
    var difficulty = document.getElementById("difficulty").value;
    var diet = document.getElementById("diet").value;

    // Create an object to represent the user profile data
    const userProfile = {
        foodPreference: foodPreference,
        allergies: allergies,
        preparationDifficulty: difficulty,
        diet: diet
    };

    // Read the existing JSON data
    const rawData = fs.readFileSync('userProfile.json');
    const jsonData = JSON.parse(rawData);

    // Update the JSON data with the new user profile
    jsonData.userProfile = userProfile;

    // Write the updated JSON data back to the file
    fs.writeFileSync('userProfile.json', JSON.stringify(jsonData, null, 2));

    // Log the updated data to the console
    console.log('User profile updated:', jsonData);
}

function openUserProfile(username) {
  window.location.href = "userGroup_" + username + ".html";
}

function goBackToUserGroups(){
  window.location.href = "userGroups.html";
}