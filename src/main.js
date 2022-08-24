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

async function getCategoriesPreview() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
    );
    const data = await res.json();
    const categories = data.genres;
    categories.forEach(category => {
      const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list'); // Crea un div contenedor de categorías de películas en el HTML
      const categoryContainer = document.createElement('div'); // Crea un div en el HTML
      categoryContainer.classList.add('category-container'); // Agrega la clase category-container al div
  
      const categoryTitle = document.createElement('h3'); // Crea un hr en el HTML para la categoría
      categoryTitle.classList.add('category-title'); // Agrega la clase category-title al h3
      categoryTitle.setAttribute('id', 'id' + category.id); // Agrega el atributo id al h3
      const categoryTitleText = document.createTextNode(category.name) // Agrega el texto de la categoría al h3
      categoryTitle.appendChild(categoryTitleText); // Agrega el h3 al div
      categoryContainer.appendChild(categoryTitle); // Agrega el div al contenedor de categorías de películas
      previewCategoriesContainer.appendChild(categoryContainer); // Agrega el div al contenedor de categorías de películas
    });
  }

getCategoriesPreview();
