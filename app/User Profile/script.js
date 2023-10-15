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

// script.js

// Method to fetch and populate user groups
function populateUserGroups() {
  fetch('CMSC434/kitch-whiz-app/app/User Profile/groupProfiles.json')
      .then(response => response.json())
      .then(data => {
          const groupListing = document.getElementById('group-listing');
          data.forEach(group => {
              const groupSquare = document.createElement('div');
              groupSquare.classList.add('group-square');
              groupSquare.onclick = function() {
                  openGroup(group.userGroup);
              };
              groupSquare.style.cursor = 'pointer';

              const groupDetails = document.createElement('div');
              groupDetails.classList.add('group-details');

              const groupTextRow1 = document.createElement('div');
              groupTextRow1.classList.add('group-text-row');
              const groupTitle = document.createElement('h1');
              groupTitle.classList.add('group-title');
              groupTitle.textContent = group.userGroup;
              const groupMemberCount = document.createElement('p');
              groupMemberCount.classList.add('group-member-count');
              groupMemberCount.textContent = group.members.length + ' members';
              groupTextRow1.appendChild(groupTitle);
              groupTextRow1.appendChild(groupMemberCount);

              const groupTextRow2 = document.createElement('div');
              groupTextRow2.classList.add('group-text-row');
              const groupInfo = document.createElement('h2');
              groupInfo.classList.add('group-info');
              groupInfo.textContent = 'Group Owner: ' + group.username;
              groupTextRow2.appendChild(groupInfo);

              const groupTextRow3 = document.createElement('div');
              groupTextRow3.classList.add('group-text-row');
              const foodPreference = document.createElement('h3');
              foodPreference.classList.add('group-info');
              foodPreference.textContent = 'Food Preference: ' + group.foodPreference;
              const allergies = document.createElement('h3');
              allergies.classList.add('group-info');
              allergies.textContent = 'Allergies: ' + group.allergies.join(', ');
              const preparationDifficulty = document.createElement('h3');
              preparationDifficulty.classList.add('group-info');
              preparationDifficulty.textContent = 'Preparation Difficulty: ' + group.preparationDifficulty;
              groupTextRow3.appendChild(foodPreference);
              groupTextRow3.appendChild(allergies);
              groupTextRow3.appendChild(preparationDifficulty);

              groupDetails.appendChild(groupTextRow1);
              groupDetails.appendChild(groupTextRow2);
              groupDetails.appendChild(groupTextRow3);

              groupSquare.appendChild(groupDetails);

              groupListing.appendChild(groupSquare);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}

// Call the method to populate the user groups
populateUserGroups();
