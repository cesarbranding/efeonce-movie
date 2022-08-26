
// Data
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'},
    params: {
        'api_key': API_KEY,
        "language": navigator.language || "es-ES",
    },
    });

    function likedMoviesList() {
      const item = JSON.parse(localStorage.getItem('liked_movies'));
      let movies;
    
      if (item) {
        movies = item;
      } else {
        movies = {};
      }
      
      return movies;
    }
    
    function likeMovie(movie) {
      // movie.id
      const likedMovies = likedMoviesList();
    
      console.log(likedMovies)
      
      if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
      } else {
        likedMovies[movie.id] = movie;
      }
    
      localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
    }


// Utils

const lazyLoader = new IntersectionObserver((entries) => { // IntersectionObserver es una interfaz de la API de observadores de intersección que permite registrar un conjunto de elementos y observar sus intersecciones con otro elemento o el viewport del navegador. Cuando una intersección ocurre, el observador recibe una notificación.
    entries.forEach((entry) => { // entries es un array de objetos IntersectionObserverEntry que representan las intersecciones de los elementos observados con el elemento objetivo.
        if (entry.isIntersecting) { // isIntersecting es un booleano que indica si el elemento objetivo está intersectando el elemento observado.
            const url = entry.target.getAttribute('data-img'); // getAttribute() devuelve el valor del atributo especificado de un elemento, o null si el atributo no existe.
            entry.target.setAttribute('src', url); // setAttribute() establece el valor del atributo especificado en un elemento.
            lazyLoader.unobserve(entry.target); // unobserve() elimina el elemento especificado del conjunto de elementos observados por el observador.
        }
    });
});
function createMovies(movies, container,
    {
      laziLoad = false,
      clean = true
    } = {}) 
    {
    if (clean) {
      container.innerHTML = '';
    }
    movies.forEach(movie => {
      const movieContainer = document.createElement('div'); // Crea un div en el HTML
      movieContainer.classList.add('movie-container'); // Agrega la clase movie-container al div
      
      const movieImg = document.createElement('img'); // Crea un img en el HTML
      movieImg.classList.add('movie-img'); // Agrega la clase movie-img al img
      movieImg.setAttribute('alt', movie.title); // Agrega el atributo alt al img
      movieImg.setAttribute( laziLoad ? 'data-img' : 'src',
      `https://image.tmdb.org/t/p/w300${movie.poster_path}`,); // Agrega el atributo src al img

      movieContainer.addEventListener('click', () => {
        location.hash = `#movie=${movie.id}`;
        getMovieDetails(movie.id);
        
      });

      movieImg.addEventListener('error', () => {
        movieImg.setAttribute(
          'src',
          'https://static.platzi.com/static/images/error/img404.png',
        );
      });
      
      const movieBtn = document.createElement('button'); // Crea un button en el HTML
      movieBtn.classList.add('movie-btn'); // Agrega la clase movie-btn al button
      likedMoviesList()[movie.id] ? movieBtn.classList.add('liked') : movieBtn.classList.remove('liked'); // Agrega la clase liked al button si la película está en la lista de favoritos
      movieBtn.addEventListener('click', (e) => {
      movieBtn.classList.toggle('movie-btn--liked');
      e.stopPropagation();
      likeMovie(movie)
      getLikedMovies();
      
      // movieBtn.innerHTML = movieBtn.classList.contains('movie-btn--liked') ? '❤️' : '🤍'; // Agrega el texto al button
      movieBtn
      
      });

      if(laziLoad) {
        lazyLoader.observe(movieImg); // Agrega el elemento al observador de intersección
      }

  
      movieContainer.appendChild(movieImg); // Agrega el img al div
      movieContainer.appendChild(movieBtn); // Agrega el button al div
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

  createMovies(movies, trendingMoviesPreviewList, true);
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
    maxPage = data.total_pages;
    createMovies(movies, genericSection, {laziLoad: true});
  }

  function getPaginatedMoviesByCategory(id) {
    return async function () {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;
      
      const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
      const pageIsNotMax = page < maxPage;
    
      if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('discover/movie', {
          params: {
            with_genres: id,
            page,
          },
        });
        const movies = data.results;
      
        createMovies(
          movies,
          genericSection,
          { lazyLoad: true, clean: false },
        );
      }
    }
  }


  async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
      params: {
        query,
      },
    });
    const movies = data.results;
    maxPage = data.total_pages;
    createMovies(movies, genericSection);
  }

  function getPaginatedMovieBySearch(query) { 
    return async function () {
      const {
        scrollTop,
        scrollHeight,
        clientHeight
      } = document.documentElement;
      
      const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);
      const pageIsNotMax = page < maxPage;
    
      if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('search/movie', {
          params: {
            query,
            page,
          },
        });
        const movies = data.results;
      
        createMovies(
          movies,
          genericSection,
          { lazyLoad: true, clean: false },
        );
      }
    }
  }
  
  async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;
  
    createMovies(movies, genericSection, { lazyLoad: true, clean: true });
  }

  async function getTrendingMovies() {
    const {data} = await api('trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;
    createMovies(movies, genericSection, {laziLoad: true, clean: true});

  }

  

  //  window.addEventListener('scroll', getPaginatedTrendingMovies); Agrega el evento scroll a la ventana

  async function getPaginatedTrendingMovies() { // Función para obtener las películas paginadas de Trending Movies
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15 && page++; // Si el scroll está en el fondo, aumenta el número de página

    const pageIsNotMax = page < maxPage; // Si el número de página no es el máximo, aumenta el número de página

    if(scrollIsBottom && pageIsNotMax) { // Si el scroll está en el fondo y el número de página no es el máximo, llama a la función getPaginatedTrendingMovies
      
      const {data} = await api('trending/movie/day', {
        params: {
          page,
        },
      });
      const movies = data.results;
      createMovies(movies, genericSection, {laziLoad: true, clean: false});
    } // Si el scroll está en el fondo, llama a la función getTrendingMovies()
    
    // const btnLoadMore = document.createElement('button'); // Crea un botón en el HTML de Trending Movies
    // btnLoadMore.innerHTML = 'Cargar más'; // Agrega el texto Load More al botón
    // btnLoadMore.classList.add('btn-load-more'); // Agrega la clase btn-load-more al botón
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies); // Agrega el evento click al botón {
    // genericSection.appendChild(btnLoadMore); // Agrega el botón al contenedor de Trending Movies
  }


  async function getRelatedMovies(id) {
    const {data} = await api(`movie/${id}/similar`);
    const movies = data.results;
    createMovies(movies, relatedMoviesContainer);
  }

  async function getMovieDetails(id) {
    const {data} = await api(`movie/${id}`);
    const movie = data;
    const movieImgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    headerSection.style.backgroundImage = `linear-gradient(
      180deg, 
      rgba(0, 0, 0, 0.35) 19.27%, 
      rgba(0, 0, 0, 0) 29.17%
      ), url(${movieImgUrl})`;
    movieDetailTitle.innerHTML = movie.title;
    movieDetailDescription.innerHTML = movie.overview;
    movieDetailScore.innerHTML = movie.vote_average;
    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMovies(id)
    
  }

  // function getLikedMovies() {
  //   const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
  //   createMovies(likedMovies, likedMoviesListArticle, { clean: true });
  // }

  function getLikedMovies() { // Función para obtener las películas favoritas
    const likedMovies = likedMoviesList(); // Obtiene las películas favoritas del localStorage
    const moviesArray = Object.values(likedMovies); // Convierte el objeto de películas favoritas en un array
  
    createMovies(moviesArray, likedMoviesListArticle, { lazyLoad: true, clean: true }); // Crea las películas favoritas
    
    console.log(likedMovies)
  }




  


