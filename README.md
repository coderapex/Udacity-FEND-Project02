# Landing Page Project `<!-- omit in toc -->

## Table of Contents `<!-- omit in toc -->

- [What is the project about?](#what-is-the-project-about)
- [How is it implemented?](#how-is-it-implemented)
  - [Determining active sections](#determining-active-sections)
  - [Generating the menu](#generating-the-menu)

## What is the project about?

Building a dynamic navigation menu on a mobile responsive page which should highlight the current active section and scroll to the sections that a user clicks.

This project aims at testing skills required to integrate HTML/CSS and JavaScript skills.

## How is it implemented?

The HTML consists of 4 sections - a header and 3 text sections.

### Determining active sections

I have used the `getBoundingClientRect()` API to calculate the boundaries of each of the sections. I then corelate the position of the cursor on the window to see if it falls within the top and bottom range of any of the sections.

If it lies within the range of a section then it is understood that the section is visible in the viewport and is declared to be an active section. Multiple scroll events are used to calculate the positions of the cursor and the section boundaries.

### Generating the menu

A `document.querySelectAll('section')` query is used to fetch all the nodes that use the `section` tag. From this node list the data attributes are fetched by looping over the list and the contents are used to generate individual list items that are added to a document fragment.

When all the list items are created the contents of the navbar list are emptied and the new fragment is appended as a child.
