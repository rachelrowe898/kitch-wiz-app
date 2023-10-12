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

    // log the values to the console.
    console.log("Food Preference: " + foodPreference);
    console.log("Allergies: " + allergies);
    console.log("Preparation Difficulty: " + difficulty);
}
