# Meals Explorer

A responsive meal listing web app built with HTML, CSS, and JavaScript. It fetches meal data from the FreeAPI meals endpoint and displays recipes in a clean card-based interface.

## Features

- Fetches meals from the FreeAPI public meals API
- Displays meal cards with image, name, category, area, and tags
- Search meals by name on the current page
- View detailed recipe information in a modal
- Shows ingredients, instructions, YouTube recipe link, and source link
- Pagination support for browsing multiple pages
- Light and dark theme toggle with `localStorage` persistence
- Responsive layout for desktop, tablet, and mobile screens

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- FreeAPI public meals API

## Project Structure

```text
07-meal-listing-UI/
+-- index.html
+-- style.css
+-- script.js
+-- README.md
```

## API Used

```text
https://api.freeapi.app/api/v1/public/meals
```

The app requests meal data page by page using:

```text
https://api.freeapi.app/api/v1/public/meals?page=1
```

## How To Run

1. Clone or download this project.
2. Open the project folder.
3. Open `index.html` in your browser.

No build step or package installation is required.

## How It Works

When the page loads, `script.js` fetches meals from the API and renders them inside the meals container. Each meal card can be clicked to open a modal with full recipe details. The search input filters meals already loaded on the current page, while the pagination buttons fetch the previous or next API page.

The theme button toggles between dark and light mode. The selected theme is saved in `localStorage`, so the preference remains after refreshing the page.

## Main Files

- `index.html`: Contains the app layout, navbar, meals container, pagination, and modal markup.
- `style.css`: Handles the full UI design, responsive layout, cards, themes, and modal styling.
- `script.js`: Handles API fetching, rendering, search, pagination, modal behavior, and theme persistence.

## Screens

- Meal listing page
- Recipe details modal
- Light and dark theme states
- Responsive mobile layout

## Author

Created as part of a JavaScript API practice assignment.
