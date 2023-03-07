const global = {
  currentPage: window.location.pathname,
};

const displayPopularMovies = async () => {
  const { results } = await fetchAPIData("movie/popular");

  results.forEach((movie) => {
    const date = new Date(movie.release_date);
    const datePtBr = Intl.DateTimeFormat("pt-BR").format(date);
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
        />`
            : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
       />`
        }
        </a>
        <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
            <small class="text-muted">Disponível: ${datePtBr}</small>
        </p>
        </div>
    `;
    document.querySelector("#popular-movies").appendChild(div);
  });
};

// Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  // Register your key at https://www.themoviedb.org/settings/api and enter here
  // Only use this for development or very small projects. You should store your key and make requests from a server
  const API_KEY = "api_key";
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=pt-BR`
  );
  const data = await response.json();
  return data;
};

// Highligth active link
const highlightActiveLink = () => {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};

// Init App
const init = () => {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }

  highlightActiveLink();
};

document.addEventListener("DOMContentLoaded", init);
