# Random Users UI

A modern and responsive Random Users web application built using HTML, CSS, and JavaScript. The application fetches user data dynamically from the FreeAPI Random Users API and displays it in a clean profile-card based interface with interactive features and detailed modal views.

## Features

* Fetches user data dynamically from the FreeAPI Random Users API
* Responsive user card layout
* Search users by first name or last name
* Male and Female filtering system
* Dynamic modal popup for detailed profile view
* Displays user location and profile information
* Google Maps integration using user coordinates
* Dark and Light theme support
* Theme preference saved using localStorage
* Pagination support
* Responsive design for desktop, tablet, and mobile devices
* Smooth hover animations and transitions
* Loading and error handling states
* Modern glassmorphism inspired UI design

## Technologies Used

* HTML
* CSS
* JavaScript
* FreeAPI Random Users API

## How It Works

When the application loads, JavaScript checks whether a theme preference exists in localStorage. If a saved theme is found, it is automatically applied. Otherwise, the application starts in dark mode by default.

The application fetches user data dynamically from the FreeAPI Random Users API and displays users in a responsive card layout.

Each user card displays:

* Profile image
* Full name
* Email
* Gender
* Nationality
* Country
* Age

The application also includes a live search feature that allows users to search profiles by first name or last name dynamically without reloading the page.

A gender filtering system is implemented using the gender field returned from the API. Users can filter profiles based on male or female categories.

When a user card is clicked, a detailed modal popup opens displaying complete profile information including:

* Large profile image
* Full name
* Email
* Phone number
* Cell number
* Username
* Country
* State
* City
* Street address
* Age
* Timezone information

The application also includes Google Maps integration. Users can open the location directly in Google Maps using the latitude and longitude coordinates provided by the API.

Pagination controls allow smooth navigation between multiple pages of users.

The entire application is designed using a Midnight Blue and Cyan color combination to create a modern and professional dashboard-style interface with glassmorphism effects, soft shadows, smooth animations, and responsive layouts.
