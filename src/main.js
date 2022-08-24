async function getTrendingMoviesPreview() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`,
  );
  const data = await res.json();
  const movies = data.results;
  movies.forEach(movie => {
    const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList'); // Crea un div contenedor de películas en el HTML
    const movieContainer = document.createElement('div'); // Crea un div en el HTML
    movieContainer.classList.add('movie-container'); // Agrega la clase movie-container al div

    const movieImg = document.createElement('img'); // Crea un img en el HTML
    movieImg.classList.add('movie-img'); // Agrega la clase movie-img al img
    movieImg.setAttribute('alt', movie.title); // Agrega el atributo alt al img
    movieImg.setAttribute('src',
    `https://image.tmdb.org/t/p/w300${movie.poster_path}`,); // Agrega el atributo src al img

    movieContainer.appendChild(movieImg); // Agrega el img al div
    trendingPreviewMoviesContainer.appendChild(movieContainer); // Agrega el div al contenedor de películas
  });
}

getTrendingMoviesPreview();