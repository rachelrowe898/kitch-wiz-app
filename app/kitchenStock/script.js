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