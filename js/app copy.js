/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

// defining constants  related to HTML elements and variables related to their dimensions
const navbarList = document.querySelector("#navbar__list");
// console.log(navbarList);

const section1 = document.querySelector("#section1");
let section1Rect = section1.getBoundingClientRect();
let section1Height = Math.floor(section1Rect.bottom - section1Rect.top);
// console.log(`🚀: section1Height`, section1Height);

const section2 = document.querySelector("#section2");
let section2Rect = section2.getBoundingClientRect();
let section2Height = Math.floor(section2Rect.bottom - section2Rect.top);
// console.log(`🚀: section2Height`, section2Height);

const section3 = document.querySelector("#section3");
let section3Rect = section3.getBoundingClientRect();
let section3Height = Math.floor(section3Rect.bottom - section3Rect.top);
// console.log(`🚀: section3Height`, section3Height);

// activeSectionArray is used to set which menu item should be highlighted
let activeSectionArray = [false, false, false];

// sectionRectTopArray stores the array of the top position of the sections
// this array is used to trigger scrollTo event on click
let sectionRectTopArray = [
  Math.floor(section1Rect.top),
  Math.floor(section2Rect.top),
  Math.floor(section3Rect.top)
];

const sec1Head = document
  .querySelector("#section1-heading")
  .getBoundingClientRect();
const sec2Head = document
  .querySelector("#section2-heading")
  .getBoundingClientRect();
const sec3Head = document
  .querySelector("#section3-heading")
  .getBoundingClientRect();

let sec1Top = sec1Head.top;
let sec2Top = sec2Head.top;
let sec3Top = sec3Head.top;

let secHeadPosArray = [sec1Top, sec2Top, sec3Top];

// determining the titles of the sections
// the values will be used to set the text in the nav menu
const sectionNodeList = document.querySelectorAll("section");
// console.log(sectionNodeList);

// calculating parameters related to element and scroll positions
let windowScrollPosition = 0;

let scrollHeight = document.body.scrollHeight;
// console.log(`🚀: scrollHeight`, scrollHeight);

let viewportHeight = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight || 0
);
// console.log(`🚀: viewportHeight`, viewportHeight);

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function getSectionNames(nodeList) {
  const noOfItems = nodeList.length;
  let titlesArray = [];

  for (let i = 0; i < noOfItems; i++) {
    // console.log(nodeList[i]);
    let attributeName = nodeList[i].getAttribute("data-nav");
    // console.log(attributeName);

    titlesArray.push(attributeName);
  }
  // console.log(titlesArray);

  return titlesArray;
}

let sectionTitlesArray = getSectionNames(sectionNodeList);

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

let scrollToSection = e => {
  // window.scrollTo(0, 1000);
  // console.log(event.target.getAttribute("pos"));

  recalculateDimensions();

  let navPosition = event.target.getAttribute("pos");
  let cursorPosition = sectionRectTopArray[navPosition];
  window.scrollTo(0, cursorPosition);

  switch (navPosition) {
    case 0:
      activeSectionArray = [true, false, false];
      break;
    case 1:
      activeSectionArray = [false, true, false];
      break;
    case 2:
      activeSectionArray = [false, false, true];
      break;

    default:
      break;
  }

  // getSectionPositions();

  // detectElementAtTop(section1Rect, section2Rect, section3Rect);
};

// build the nav
let buildNav = activeSectionArray => {
  const menuItemsFragment = document.createDocumentFragment();

  // create nav links with section names
  for (let i = 0; i < sectionTitlesArray.length; i++) {
    const newListItem = document.createElement("li");
    newListItem.setAttribute("class", "menu__link");
    newListItem.setAttribute("pos", i);
    newListItem.addEventListener("click", scrollToSection);
    newListItem.addEventListener("click", getSectionPositions);

    // if section is towards the top of the viewport, set the menu item as active
    if (activeSectionArray[i]) {
      newListItem.classList.toggle("section-active");
    }

    newListItem.innerText = sectionTitlesArray[i];

    menuItemsFragment.appendChild(newListItem);
  }

  // reset the navbarList with empty content before adding the new list items - else every time buildNav is called it will keep adding more elements to the list
  navbarList.innerHTML = "";
  navbarList.appendChild(menuItemsFragment);
};

// the nav is built the first time that the page is loaded
// the initial value of activeSectionArray is [false, false, false] which renders all the nav elements as inactive
buildNav(activeSectionArray);

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

// ----- ----- ----- ----- //

let calculateSectionHeights = () => {
  // calculating the new heights of each of the sections
  section1Rect = section1.getBoundingClientRect();
  section2Rect = section2.getBoundingClientRect();
  section3Rect = section3.getBoundingClientRect();

  section1Height = Math.floor(section1Rect.bottom - section1Rect.top);
  section2Height = Math.floor(section2Rect.bottom - section2Rect.top);
  section3Height = Math.floor(section3Rect.bottom - section3Rect.top);
  // console.log(
  //   `🚀: Section Heights : `,
  //   section1Height,
  //   section2Height,
  //   section3Height
  // );
};

// recalculate the dimensions if the window is resized
function recalculateDimensions() {
  scrollHeight = document.body.scrollHeight;
  console.log(`🚀: scrollHeight`, scrollHeight);

  viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  console.log(`🚀: viewportHeight`, viewportHeight);

  calculateSectionHeights();

  sectionRectTopArray = [
    Math.floor(section1Rect.top),
    Math.floor(section2Rect.top),
    Math.floor(section3Rect.top)
  ];
  console.log(`🚀: sectionRectTopArray`, sectionRectTopArray);

  sec1Top = sec1Head.top;
  sec2Top = sec2Head.top;
  sec3Top = sec3Head.top;

  secHeadPosArray = [sec1Top, sec2Top, sec3Top];
}

window.addEventListener("resize", recalculateDimensions());

// recalculate the boundaries of the sections when there is a scroll event occurs
function getSectionPositions(e) {
  windowScrollPosition = window.scrollY;
  console.log(Math.floor(windowScrollPosition));

  section1Rect = section1.getBoundingClientRect();
  section2Rect = section2.getBoundingClientRect();
  section3Rect = section3.getBoundingClientRect();

  detectElementAtTop(section1Rect, section2Rect, section3Rect);
}
window.addEventListener("scroll", getSectionPositions);

// detectElementAtTop() calculates the positions of the sections relative to the visible viewport height
// if any sections is determined to be at top, the activeSectionArray value is set
// finally, the buildNav() is called if there is any change in the activeSectionArray values
let detectElementAtTop = (sec1, sec2, sec3) => {
  let halfHeight = viewportHeight / 2;
  // console.log(`halfHeight : ` + halfHeight);

  if (sec1.top > 0 && (sec1.top + sec1.bottom) / 2 > halfHeight) {
    activeSectionArray = [false, false, false];
  } else if (sec1.top > 0 && (sec1.top + sec1.bottom) / 2 < halfHeight) {
    console.log("Sec1 is at top");
    activeSectionArray = [true, false, false];
  } else if (sec2.top > 0 && sec2.top + sec2.bottom / 2 < halfHeight) {
    console.log("Sec2 is at top");
    activeSectionArray = [false, true, false];
  } else if (sec3.top > 0 && sec3.top + sec3.bottom / 2 < halfHeight) {
    console.log("Sec3 is at top");
    activeSectionArray = [false, false, true];
  }

  buildNav(activeSectionArray);
};
