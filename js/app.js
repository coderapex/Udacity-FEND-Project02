// NOTE: If the user has scrolled down to a certain point on the page an reloads/refreshes the page, it reloads at the same position.
// The cursor position is recalculated from the current displayed position on the viewport which leads to errors
// This could also be because of the live server plugins (which may use some internal caching) on VSCode too
// I am forcing the page to scroll to the top on refresh to overcome this error
let scrollToTop = e => {
  window.scrollTo(0, 0);
  // location.reload(true);
};

// using the Navigation Timing API to determine if the page was reloaded
if (window.performance) {
  console.info("window.performance works fine on this browser");
}
if (performance.navigation.type == 1) {
  console.info("This page is reloaded");
  scrollToTop();
} else {
  console.info("This page is not reloaded");
}

// ***** DECLARATIONS *****
// defining constants for elements
// ----- ===== ***** ===== -----
const navHeader = document.querySelector(".page__header");

const header = document.querySelector("#page-header");

const navbarList = document.querySelector("#navbar__list");

let sectionList = document.querySelectorAll("section");

const section1 = document.querySelector("#section1");
const section2 = document.querySelector("#section2");
const section3 = document.querySelector("#section3");
const section4 = document.querySelector("#section4");

const scrollToTopButton = document.getElementById("scroll-to-top");

// globalActiveState is used to set which section is active and based on this value the menu items active states are toggled
let globalActiveState = [false, false, false, false];

// calculating dimensions of the window and display
// ----- ===== ***** ===== -----
let cursorPosition = Math.floor(window.scrollY);

let scrollHeight = document.body.scrollHeight;

let viewportHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);

// calculating dimensions of the elements
// ----- ===== ***** ===== -----
let headerRect = header.getBoundingClientRect();
let section1Rect = section1.getBoundingClientRect();
let section2Rect = section2.getBoundingClientRect();
let section3Rect = section3.getBoundingClientRect();
let section4Rect = section4.getBoundingClientRect();

// determining top and bottom cursor positions of elements
// ----- ===== ***** ===== -----
let headerTop = Math.floor(headerRect.top);
let section1Top = Math.floor(section1Rect.top);
let section2Top = Math.floor(section2Rect.top);
let section3Top = Math.floor(section3Rect.top);
let section4Top = Math.floor(section4Rect.top);

let headerBottom = Math.floor(headerRect.bottom) - 1;
let section1Bottom = Math.floor(section1Rect.bottom) - 1;
let section2Bottom = Math.floor(section2Rect.bottom) - 1;
let section3Bottom = Math.floor(section3Rect.bottom) - 1;
let section4Bottom = Math.floor(section4Rect.bottom) - 1;

// ***** FUNCTIONS *****

// function to recalculate the window and display parameters
// ----- ===== ***** ===== -----
let recalculateDocumentParameters = e => {
  scrollHeight = document.body.scrollHeight;

  viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
};

// function to recalculate the cursor positions
// ----- ===== ***** ===== -----
let recalculateCursorPosition = e => {
  cursorPosition = Math.floor(window.scrollY);
};

// function to recalculate the element positions
// ----- ===== ***** ===== -----
let recalculateElementPositions = e => {
  // calculating dimensions of the elements
  // ----- ===== ***** ===== -----
  headerRect = header.getBoundingClientRect();
  section1Rect = section1.getBoundingClientRect();
  section2Rect = section2.getBoundingClientRect();
  section3Rect = section3.getBoundingClientRect();
  section4Rect = section4.getBoundingClientRect();

  // determining top and bottom cursor positions of elements
  // ----- ===== ***** ===== -----
  headerTop = Math.floor(headerRect.top);
  section1Top = Math.floor(section1Rect.top);
  section2Top = Math.floor(section2Rect.top);
  section3Top = Math.floor(section3Rect.top);
  section4Top = Math.floor(section4Rect.top);

  headerBottom = Math.floor(headerRect.bottom) - 1;
  section1Bottom = Math.floor(section1Rect.bottom) - 1;
  section2Bottom = Math.floor(section2Rect.bottom) - 1;
  section3Bottom = Math.floor(section3Rect.bottom) - 1;
  section4Bottom = Math.floor(section4Rect.bottom) - 1;
};

// function to determine when scroll button should be made visible
let setScrollButtonVisibility = e => {
  if (cursorPosition > (section1Top + section1Bottom) / 2) {
    scrollToTopButton.classList.add("is-active");
  } else if (cursorPosition < (section1Top + section1Bottom) / 2) {
    scrollToTopButton.classList.remove("is-active");
  }
};

// function to generate the nav menu on first load
let generateNavMenu = e => {
  const menuItemsFragment = document.createDocumentFragment();

  for (let i = 0; i < sectionList.length; i++) {
    // create nav links with section names
    const newListItem = document.createElement("li");
    newListItem.setAttribute("class", "menu__link");
    newListItem.setAttribute("pos", i);
    newListItem.innerText = sectionList[i].getAttribute("data-nav");

    menuItemsFragment.appendChild(newListItem);
  }
  navbarList.innerHTML = "";
  navbarList.appendChild(menuItemsFragment);
};

// function to determine which section is at top of viewport
// ----- ===== ***** ===== -----
let determineActiveElement = e => {
  // remove 'active-section' class from all classes
  for (let i = 0; i < sectionList.length; i++) {
    sectionList[i].classList.remove("active-section");
  }

  if (cursorPosition < section1Top) {
    globalActiveState = [false, false, false, false];
  } else if (
    cursorPosition > section1Top - 100 &&
    cursorPosition < section1Bottom - 100
  ) {
    section1.classList.add("active-section");
    globalActiveState = [true, false, false, false];
  } else if (
    cursorPosition > section2Top - 100 &&
    cursorPosition < section2Bottom - 100
  ) {
    section2.classList.add("active-section");
    globalActiveState = [false, true, false, false];
  } else if (
    cursorPosition > section3Top - 100 &&
    cursorPosition < section3Bottom - 100
  ) {
    section3.classList.add("active-section");
    globalActiveState = [false, false, true, false];
  } else if (
    cursorPosition > section4Top - 100 &&
    cursorPosition < section4Bottom - 100
  ) {
    section4.classList.add("active-section");
    globalActiveState = [false, false, false, true];
  }

  reGenerateNavMenu(globalActiveState);
};

// function to regenerate nav items when active element changes
// ----- ===== ***** ===== -----
let reGenerateNavMenu = globalActiveState => {
  let menuItems = document.querySelector("#navbar__list").children;

  for (let i = 0; i < menuItems.length; i++) {
    // remove navbar__active class from all menu items
    let listItem = menuItems[i];
    listItem.classList.remove("navbar__active");

    // set to navbar__active if corresponding globalActiveState is true
    if (globalActiveState[i]) {
      listItem.classList.add("navbar__active");
    }
  }
};

// individual functions to trigger the scroll to section functionality
let scrollToSection1 = () => window.scrollTo(0, section1Top);
let scrollToSection2 = () => window.scrollTo(0, section2Top);
let scrollToSection3 = () => window.scrollTo(0, section3Top);
let scrollToSection4 = () => window.scrollTo(0, section4Top);

// functions to hide menu if no user activity
let showMenu = () => {
  // show main menu
  startTimer();
  navHeader.classList.remove("hidden");
};

let hideMenu = () => {
  // hide main menu
  navHeader.classList.add("hidden");
};

let timeOutID = 0;

let startTimer = () => {
  // wait 2 seconds before calling hideMenu
  timeoutID = window.setTimeout(hideMenu, 5000);
};

function setupInactiveTimer() {
  this.addEventListener("mousemove", resetTimer, false);
  this.addEventListener("mousedown", resetTimer, false);
  this.addEventListener("keypress", resetTimer, false);
  this.addEventListener("DOMMouseScroll", resetTimer, false);
  this.addEventListener("mousewheel", resetTimer, false);
  this.addEventListener("touchmove", resetTimer, false);
  this.addEventListener("MSPointerMove", resetTimer, false);

  startTimer();
}

let resetTimer = e => {
  window.clearTimeout(timeoutID);

  showMenu();
};

setupInactiveTimer();

// ***** EVENTS *****
// event to recalculate window and document dimensions
// ----- ===== ***** ===== -----
window.addEventListener("resize", recalculateDocumentParameters);
window.addEventListener("resize", recalculateElementPositions);
window.addEventListener("resize", recalculateCursorPosition);

// events to scroll to top on page load
scrollToTopButton.addEventListener("onload", scrollToTop);

// event to recalculate cursor position on scroll
// ----- ===== ***** ===== -----
window.addEventListener("scroll", recalculateCursorPosition);
window.addEventListener("scroll", determineActiveElement);

// events to scroll to top on button click
window.addEventListener("scroll", setScrollButtonVisibility);
scrollToTopButton.addEventListener("click", scrollToTop);

// ----- ===== ***** ===== -----

// ***** RUN PROGRAM *****
// ----- ===== ***** ===== -----
generateNavMenu();

// the below events can be run only after the menu is generated
// events to handle clicks on menu items and scroll to respective sections
let first = navbarList.querySelector("li:nth-child(1)");
first.addEventListener("click", scrollToSection1);

let second = navbarList.querySelector("li:nth-child(2)");
second.addEventListener("click", scrollToSection2);

let third = navbarList.querySelector("li:nth-child(3)");
third.addEventListener("click", scrollToSection3);

let fourth = navbarList.querySelector("li:nth-child(4)");
fourth.addEventListener("click", scrollToSection4);
