function openNav() {
    var x = document.getElementById("menuLinks");
    var userSection = document.getElementById("user-profile-section");
    if (x.style.display === "block") {
      x.style.display = "none";
      // userSection.style.marginTop = "150px";
    } else {
      x.style.display = "block";
      // userSection.style.marginTop = "300px";
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

  showPopup("<u>User profile is saved!</u><br><br><u>Food Preference:</u> " + foodPreference + "<br><u>Allergies:</u> " + allergies + "<br><u>Preparation Difficulty:</u> " + difficulty + "<br><u>Diet:</u> " + diet + ".");
}


function showPopup(message) {
  var messageDisplay = document.createElement("div");
  messageDisplay.className = "message-display";
  messageDisplay.innerHTML = message; 

  // Insert the message display at the bottom of the user-profile-page element
  var userProfPage = document.querySelector(".user-profile");
  userProfPage.appendChild(messageDisplay);

  setTimeout(function () {
    messageDisplay.style.display = "none";
  }, 5000); 
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

// function showKeyboard() {
//   const inputFields = document.querySelectorAll("input");
//   const keyboardPopUp = document.getElementById("keyboard");

//   // Hide the keyboard pop-up by default
//   keyboardPopUp.style.height = "0";


//   inputFields.forEach(input => {
//     input.addEventListener("focus", function () {
//         // Show the keyboard pop-up
//         keyboardPopUp.style.height = "50%"; // Adjust the height as needed
//         document.getElementById("shopping-section").style.marginBottom = "300px";
//     });

//     input.addEventListener("blur", function () {
//         // Hide the keyboard pop-up when the input field loses focus
//         keyboardPopUp.style.height = "0";
//         document.getElementById("shopping-section").style.marginBottom = "0px";
//     });
//   });

//   // var keyboard = document.getElementById('keyboard');
//   // if (keyboard.style.display === 'none') {
//   //     keyboard.style.display = 'block';
//   // } else {
//   //     keyboard.style.display = 'none';
//   // }
// }

// function showKeyboardGroupName() {
//   var keyboard = document.getElementById('keyboard-group');
//   if (keyboard.style.display === 'none') {
//       keyboard.style.display = 'block';
//   } else {
//       keyboard.style.display = 'none';
//   }
// }

// function showKeyboardGroupMembers() {
//   var keyboard = document.getElementById('keyboard-member');
//   if (keyboard.style.display === 'none') {
//       keyboard.style.display = 'block';
//   } else {
//       keyboard.style.display = 'none';
//   }
// }

// // Add an event listener to hide the keyboard when clicking outside of it
// document.addEventListener('click', function(event) {
//   var keyboard = document.getElementById('keyboard');
//   if (event.target !== keyboard && event.target !== document.getElementById('otherAllergy')) {
//       keyboard.style.display = 'none';
//   }
// });

// document.addEventListener('click', function(event) {
//   var keyboard = document.getElementById('keyboard-group');
//   if (event.target !== keyboard && event.target !== document.getElementById('group-name')) {
//       keyboard.style.display = 'none';
//   }
// });

// document.addEventListener('click', function(event) {
//   var keyboard = document.getElementById('keyboard-member');
//   if (event.target !== keyboard && event.target !== document.getElementById('group-members')) {
//       keyboard.style.display = 'none';
//   }
// });

var keyboard = document.getElementById('keyboard');
// var userDiv = document.getElementsByClassName('user-profile-page')[0]; 
var userDiv = document.querySelector('.user-profile-page');

console.log(userDiv);

// Add an event listener to hide the keyboard when clicking outside of it
document.addEventListener('click', function(event) {
  var keyboard = document.getElementById('keyboard');
  if (event.target !== keyboard && event.target !== document.getElementById('otherAllergy')) {
      console.log(event.target);
      keyboard.style.display = 'none';
      userDiv.style.flexBasis = 'auto';
  } else {
    keyboard.style.display = 'block';
    userDiv.style.flexBasis = "30%";
    keyboard.style.display = '40%';
  }
});