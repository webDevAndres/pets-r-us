/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
  let navigation = document.getElementById("navigationContainer");
  let element = document.getElementById('menuIcon');
  if (navigation.className === "mobile-menu") {
    navigation.className += " responsive";
    element.className = "fas fa-times";
  } else {
    navigation.className = "mobile-menu";
    element.className = "fas fa-bars";
  }
};

function highlightCurrentLink() {
  let currentPage = window.location.pathname;
  let homePage = document.querySelector('#navigationContainer');

  switch (currentPage) {
    case '/index.html':
      homePage.children[0].className = ' active'
      break;
    case '/boarding.html':
      homePage.children[1].className = ' active'
      break;
    case '/grooming.html':
      homePage.children[2].className = ' active'
      break;
    case '/training.html':
      homePage.children[3].className = ' active'
      break;
  }

}

highlightCurrentLink();