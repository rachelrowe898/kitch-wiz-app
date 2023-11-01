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
  var allergies = []; // Create an empty array to store the selected allergy values
  var difficulty = document.getElementById("difficulty").value;
  var diet = document.getElementById("diet").value;

  // Get the checked allergy checkboxes
  var allergyCheckboxes = document.querySelectorAll("input[type='checkbox'][name='allergies']:checked");

  // Loop through the checked allergy checkboxes and add their values to the allergies array
  for (var i = 0; i < allergyCheckboxes.length; i++) {
    allergies.push(allergyCheckboxes[i].value);
  }

  // Get the value of the other allergy text box, if it is checked
  var otherAllergyCheckbox = document.getElementById("otherAllergyCheckbox");
  if (otherAllergyCheckbox.checked) {
    allergies.push(document.getElementById("otherAllergy").value);
  }

  // log the values to the console.
  console.log("Food Preference: " + foodPreference);
  console.log("Allergies: " + allergies);
  console.log("Preparation Difficulty: " + difficulty);
  console.log("Diet: " + diet);

  showPopup("User profile is saved! Your profile is Food Preference: " + foodPreference + ", Allergies: " + allergies + ", Preparation Difficulty: " + difficulty + ", Diet: " + diet + "."); 
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
  window.location.href = "createGroup.html";
    // Reveal the hidden group with the user input
    const newGroupTemplate = document.getElementById('new-group-template');
    newGroupTemplate.classList.remove('hidden');
}

function leaveUserGroupNH() {
  const leaveGroupButton = document.getElementById('leave-group-button');
  const groupElement = document.getElementById('nerdHerd');

  leaveGroupButton.addEventListener('click', function(){
    groupElement.style.display = 'none';
  });
  window.location.href = "userGroups.html";

}

function createUserGroup() {
  const groupNameInput = document.getElementById('group-name');
  const groupMembersInput = document.getElementById('group-members');

  const groupName = groupNameInput.value;
  const groupMembers = groupMembersInput.value;
  console.log(groupName, groupMembers)
  // Update the group name in the revealed template
  var newGroupName = document.getElementById('new-group-name');
  newGroupName.textContent = groupName;

  // Redirect back to userGroups.html
  window.location.href = "userGroups.html";
}

// Function to enable/disable the input based on the checkbox state
function toggleOtherAllergyInput() {
  const otherCheckbox = document.getElementById('otherAllergyCheckbox');
  const otherInput = document.getElementById('otherAllergy');

  otherCheckbox.addEventListener('change', function () {
      if (this.checked) {
          otherInput.disabled = false;
      } else {
          otherInput.disabled = true;
      }
  });
}

function goBackToUserProfile() {
  window.location.href = "userProfile.html"; 
}
