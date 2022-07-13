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
    case '/':
      homePage.children[0].className = ' active'
      break;
    case '/boarding':
      homePage.children[1].className = ' active'
      break;
    case '/grooming':
      homePage.children[2].className = ' active'
      break;
    case '/training':
      homePage.children[3].className = ' active'
      break;
  }

}

highlightCurrentLink();