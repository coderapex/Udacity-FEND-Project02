// NOTE: If the user has scrolled down to a certain point on the page an reloads/refreshes the page, it reloads at the same position.
// The cursor position is recalculated from the current displayed position on the viewport which leads to errors
// This could also be because of the live server plugins (which may use some internal caching) on VSCode too
// I am forcing the page to scroll to the top on refresh to overcome this error
let scrollToTop = e => {
  console.log("scrollToTop");
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
// console.log(`🚀: header`, header);

const navbarList = document.querySelector("#navbar__list");

let sectionList = document.querySelectorAll("section");
// console.log(`🚀: sectionList`, sectionList);

const section1 = document.querySelector("#section1");
// console.log(`🚀: section1`, section1);
const section2 = document.querySelector("#section2");
// console.log(`🚀: section2`, section2);
const section3 = document.querySelector("#section3");
// console.log(`🚀: section3`, section3);

const scrollToTopButton = document.getElementById("scroll-to-top");

// globalActiveState is used to set which section is active and based on this value the menu items active states are toggled
let globalActiveState = [false, false, false];

// calculating dimensions of the window and display
// ----- ===== ***** ===== -----
let cursorPosition = Math.floor(window.scrollY);
// console.log(`🚀: cursorPosition`, cursorPosition);

let scrollHeight = document.body.scrollHeight;
// console.log(`🚀: scrollHeight`, scrollHeight);

let viewportHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);
// console.log(`🚀: viewportHeight`, viewportHeight);

// calculating dimensions of the elements
// ----- ===== ***** ===== -----
let headerRect = header.getBoundingClientRect();
// console.log(`🚀: headerRect`, headerRect);
let section1Rect = section1.getBoundingClientRect();
// console.log(`🚀: section1Rect`, section1Rect);
let section2Rect = section2.getBoundingClientRect();
// console.log(`🚀: section2Rect`, section2Rect);
let section3Rect = section3.getBoundingClientRect();
// console.log(`🚀: section3Rect`, section3Rect);

// determining top and bottom cursor positions of elements
// ----- ===== ***** ===== -----
let headerTop = Math.floor(headerRect.top);
// console.log(`🚀: headerTop`, headerTop);
let section1Top = Math.floor(section1Rect.top);
// console.log(`🚀: section1Top`, section1Top);
let section2Top = Math.floor(section2Rect.top);
// console.log(`🚀: section2Top`, section2Top);
let section3Top = Math.floor(section3Rect.top);
// console.log(`🚀: section3Top`, section3Top);

let headerBottom = Math.floor(headerRect.bottom) - 1;
// console.log(`🚀: headerBottom`, headerBottom);
let section1Bottom = Math.floor(section1Rect.bottom) - 1;
// console.log(`🚀: section1Bottom`, section1Bottom);
let section2Bottom = Math.floor(section2Rect.bottom) - 1;
// console.log(`🚀: section2Bottom`, section2Bottom);
let section3Bottom = Math.floor(section3Rect.bottom) - 1;
// console.log(`🚀: section3Bottom`, section3Bottom);

// ***** FUNCTIONS *****

// function to recalculate the window and display parameters
// ----- ===== ***** ===== -----
let recalculateDocumentParameters = e => {
  console.log("recalculateDocumentParameters()");

  scrollHeight = document.body.scrollHeight;
  // console.log(`🚀: scrollHeight`, scrollHeight);

  viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  // console.log(`🚀: viewportHeight`, viewportHeight);
};

// function to recalculate the cursor positions
// ----- ===== ***** ===== -----
let recalculateCursorPosition = e => {
  // console.log("recalculateCursorPosition()");

  cursorPosition = Math.floor(window.scrollY);
  // console.log(`🚀: cursorPosition`, cursorPosition);
};

// function to recalculate the element positions
// ----- ===== ***** ===== -----
let recalculateElementPositions = e => {
  console.log("recalculateElementPositions()");

  // cursorPosition = Math.floor(window.scrollY);
  // console.log(`🚀: cursorPosition`, cursorPosition);

  // calculating dimensions of the elements
  // ----- ===== ***** ===== -----
  headerRect = header.getBoundingClientRect();
  // console.log(`🚀: headerRect`, headerRect);
  section1Rect = section1.getBoundingClientRect();
  // console.log(`🚀: section1Rect`, section1Rect);
  section2Rect = section2.getBoundingClientRect();
  // console.log(`🚀: section2Rect`, section2Rect);
  section3Rect = section3.getBoundingClientRect();
  // console.log(`🚀: section3Rect`, section3Rect);

  // determining top and bottom cursor positions of elements
  // ----- ===== ***** ===== -----
  headerTop = Math.floor(headerRect.top);
  // console.log(`🚀: headerTop`, headerTop);
  section1Top = Math.floor(section1Rect.top);
  // console.log(`🚀: section1Top`, section1Top);
  section2Top = Math.floor(section2Rect.top);
  // console.log(`🚀: section2Top`, section2Top);
  section3Top = Math.floor(section3Rect.top);
  // console.log(`🚀: section3Top`, section3Top);

  headerBottom = Math.floor(headerRect.bottom) - 1;
  // console.log(`🚀: headerBottom`, headerBottom);
  section1Bottom = Math.floor(section1Rect.bottom) - 1;
  // console.log(`🚀: section1Bottom`, section1Bottom);
  section2Bottom = Math.floor(section2Rect.bottom) - 1;
  // console.log(`🚀: section2Bottom`, section2Bottom);
  section3Bottom = Math.floor(section3Rect.bottom) - 1;
  // console.log(`🚀: section3Bottom`, section3Bottom);

  console.log("sec1 : ", section1Top, section1Bottom);
  console.log("sec2 : ", section2Top, section2Bottom);
  console.log("sec3 : ", section3Top, section3Bottom);
};

// function to determine when scroll button should be made visible
let setScrollButtonVisibility = e => {
  // console.log("setScrollButtonVisibility()");

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
    // console.log(sectionList[i]);
    sectionList[i].classList.remove("active-section");
  }

  if (cursorPosition < section1Top) {
    // console.log("Header is active");
    globalActiveState = [false, false, false];
  } else if (
    cursorPosition > section1Top - 100 &&
    cursorPosition < section1Bottom - 100
  ) {
    // console.log("S1 is active");
    section1.classList.add("active-section");
    globalActiveState = [true, false, false];
  } else if (
    cursorPosition > section2Top - 100 &&
    cursorPosition < section2Bottom - 100
  ) {
    // console.log("S2 is active");
    section2.classList.add("active-section");
    globalActiveState = [false, true, false];
  } else if (
    cursorPosition > section3Top - 100 &&
    cursorPosition < section3Bottom - 100
  ) {
    // console.log("S3 is active");
    section3.classList.add("active-section");
    globalActiveState = [false, false, true];
  }

  reGenerateNavMenu(globalActiveState);
};

// function to regenerate nav items when active element changes
// ----- ===== ***** ===== -----
let reGenerateNavMenu = globalActiveState => {
  let menuItems = document.querySelector("#navbar__list").children;
  // console.log(`🚀: menuItems`, menuItems);

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

// functions to hide menu if no user activity
let showMenu = () => {
  // show main menu
  console.log("Timer started");
  startTimer();
  navHeader.classList.remove("hidden");
};

let hideMenu = () => {
  // hide main menu
  console.log("Timer Ended");
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
// console.log(`🚀: first`, first);
first.addEventListener("click", scrollToSection1);

let second = navbarList.querySelector("li:nth-child(2)");
// console.log(`🚀: first`, first);
second.addEventListener("click", scrollToSection2);

let third = navbarList.querySelector("li:nth-child(3)");
// console.log(`🚀: first`, first);
third.addEventListener("click", scrollToSection3);
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
// ----- ===== ***** ===== -----
