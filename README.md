# Movie Search Website

This is a simple movie search website built with React, utilizing Redux for state management. The website features a clean and dynamic interface, making it easy for users to search for and explore movie details.

## Features

- At the top of the site, you'll find a menu icon and a search field for entering movie titles. Clicking the menu icon toggles its appearance, providing a smooth user experience. Redux is integrated into the source code, although its usage is minimal due to the site's relatively small scale.

- Upon typing a movie title and hitting enter or clicking the search button, the website connects to the "omdbapi" server to fetch and display information on the top 10 movies related to the search.

- Key points to note:
    - React-hooks-form is used for form handling.
    - A loading indicator appears after clicking the search button, preventing multiple requests to the server with rapid clicks.
    - In case of no internet connection or server error, an alert informs the user about the issue.

- Once the initial search is complete, the website displays posters, names, and release years of the movies. If a name is too long, it is truncated with "..." and reveals the full name and year when the user hovers over it. Each movie entry also includes a bookmark icon, allowing users to save their favorite movies. Saved movies are stored in local storage since no dedicated server is designed for this purpose.

- Scrolling down automatically triggers requests to the server for additional batches of movies, providing continuous content loading. This process repeats as the user scrolls further down to reveal more movies.

- Clicking on a movie triggers a loading animation, and the details of the selected movie are fetched from the server. If the server responds successfully, a modal displays additional information, and the background is temporarily disabled.

- Movie details are presented with icons for various information such as director, cast, release date, and more. Hovering over these icons reveals the corresponding details. On laptop screens, full descriptions are visible.

- The website is designed to be dynamic for different languages, and the connection to any server with any account is handled dynamically.

- Proper use of meta tags and headers contributes to better SEO.

This React-based movie search website is available at [https://movie.liara.run/](https://movie.liara.run/). You can find the complete source code on [GitHub](https://github.com/sina-sadeghi/Movie-app).