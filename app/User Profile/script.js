// Get the form element
const profileForm = document.getElementById('profile-form');

// Add an event listener for form submission
profileForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting normally

    // Get the values from the form
    const preferences = document.getElementById('preferences').value;
    const allergies = document.getElementById('allergies').value;
    const difficulty = document.getElementById('difficulty').value;

    // Perform any necessary actions here, such as sending the data to a server or updating a database

    // Optionally, display a success message to the user
    alert('Profile updated successfully!');
});
