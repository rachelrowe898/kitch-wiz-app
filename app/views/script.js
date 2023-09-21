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

function displayOptions() {
  // Get selected radio button value
  var selectedRadio = document.querySelector('input[name="choice"]:checked');

  // Get selected dropdown value
  var selectedDropdown = document.getElementById("dropdown").value;

  // Display selected options
  var selectedOptionsDiv = document.getElementById("selected-options");
  selectedOptionsDiv.innerHTML = "<h3>Selected Options:</h3>";

  if (selectedRadio) {
    selectedOptionsDiv.innerHTML += "<p>Radio Option: " + selectedRadio.value + "</p>";
  }

  if (selectedDropdown !== "Select") {
    selectedOptionsDiv.innerHTML += "<p>Dropdown Option: " + selectedDropdown + "</p>";
  }
}
