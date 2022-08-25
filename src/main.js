const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'},
    params: {
        'api_key': API_KEY,
    },
    });


// Utils

function createMovies(movies, container) {
    container.innerHTML = '';
    movies.forEach(movie => {
      const movieContainer = document.createElement('div'); // Crea un div en el HTML
      movieContainer.classList.add('movie-container'); // Agrega la clase movie-container al div
  
      const movieImg = document.createElement('img'); // Crea un img en el HTML
      movieImg.classList.add('movie-img'); // Agrega la clase movie-img al img
      movieImg.setAttribute('alt', movie.title); // Agrega el atributo alt al img
      movieImg.setAttribute('src',
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`,); // Agrega el atributo src al img
  
      movieContainer.appendChild(movieImg); // Agrega el img al div
      container.appendChild(movieContainer); // Agrega el div al contenedor de películas
    });
  }


function createCategories (categories, container) {
    container.innerHTML = '';
    categories.forEach(category => {
      const categoryContainer = document.createElement('div'); // Crea un div en el HTML
      categoryContainer.classList.add('category-container'); // Agrega la clase category-container al div
  
      const categoryTitle = document.createElement('h3'); // Crea un h3 en el HTML para la categoría
      categoryTitle.classList.add('category-title'); // Agrega la clase category-title al h3
      categoryTitle.setAttribute('id', 'id' + category.id); // Agrega el atributo id al h3
      categoryTitle.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;
      }); // Agrega el evento click al h3
      const categoryTitleText = document.createTextNode(category.name) // Agrega el texto de la categoría al h3
      categoryTitle.appendChild(categoryTitleText); // Agrega el h3 al div
      categoryContainer.appendChild(categoryTitle); // Agrega el div al contenedor de categorías de películas
      container.appendChild(categoryContainer); // Agrega el div al contenedor de categorías de películas
    });
  }

// Llamamos a la Api para obtener las Tendencias y Categorías

async function getTrendingMoviesPreview() {
  const {data} = await api('trending/movie/day');
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
    const {data} = await api('genre/movie/list');
    
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
  }



async function getMoviesByCategory(id) {
    const {data} = await api('discover/movie', {
        params: {
            with_genres: id,}
    });
    const movies = data.results;
    createMovies(movies, genericSection);
  }

  // async function getMoviesBySearch(query) {
  //   const {data} = await api('search/movie', {
  //       params: {
  //           query,
  //       },
  //   });
  //       const movies = data.results;
  //       createMovies(movies, genericSection);
  // }

  async function getMoviesBySearch() {
    const {data} = await api('search/movie', {
        params: {
            query: searchFormInput.value,
        },
    });
        const movies = data.results;
        createMovies(movies, genericSection);
  }



