let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;

    });

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
    });

arrowBtn.addEventListener('click', () => {
    history.back();
    location.hash = '#';
    });

headerTitle.addEventListener('click', () => {
    location.hash = '#';
    });
    
window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function navigator() {
    
    if(infiniteScroll) { // Si existe la función de scroll infinito, la elimina
        window.removeEventListener('scroll', infiniteScroll, {passive: false}); // Elimina el evento de scroll infinito
        infiniteScroll = undefined; // Elimina la función de scroll infinito
    }

    if (location.hash.startsWith("#trends")) {
        trendsPage();
    } else if (location.hash.startsWith("#search=")) {
        searchPage();
    } else if (location.hash.startsWith("#movie=")) {
        movieDetailsPage();
    } else if (location.hash.startsWith("#category=")) {
        categoriesPage();
    } else {
        homePage();
    }

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, { passive: false }); // Agrega el evento de scroll infinito
    }
    // location.hash = location.hash.replace("#trends", "#search=");
}

function smoothscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }
}

function homePage() {
    
    headerSection.classList.remove('header-container--long'); // Remueve la clase header-container--long del header
    headerSection.style.background = ''; // Remueve el background del header en Home
    arrowBtn.classList.add('inactive'); // Escondiendo el botón de volver en la homepage
    arrowBtn.classList.remove('header-arrow--white'); // Ocultando el botón de volver en blanco en la MovieDetailsPage
    headerTitle.classList.remove('inactive'); // Mostrando el título de la homepage
    headerCategoryTitle.classList.add('inactive'); // escondiendo el título de categoría en la homepage
    searchForm.classList.remove('inactive'); // Mostrando el formulario de búsqueda en la homepage

    trendingPreviewSection.classList.remove('inactive'); // Mostrando el preview de películas en tendencia en la homepage
    categoriesPreviewSection.classList.remove('inactive'); // Mostrando el preview de categorías de películas en la homepage
    genericSection.classList.add('inactive'); // Escondiendo el contenedor de películas en la homepage
    movieDetailSection.classList.add('inactive'); // Escondiendo el contenedor de detalles de película en la homepage
    
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    
    headerSection.classList.remove('header-container--long'); // Remueve la clase header-container--long del header
    headerSection.style.background = ''; // Remueve el background del header en Home
    arrowBtn.classList.remove('inactive'); // Mostrando el botón de volver en la homepage
    arrowBtn.classList.remove('header-arrow--white'); // Mostrando el botón de volver en la homepage
    headerTitle.classList.add('inactive'); // Ocultando el título de la homepage
    headerCategoryTitle.classList.remove('inactive'); // Mostrando el título de categoría en la homepage
    searchForm.classList.add('inactive'); // Ocultando el formulario de búsqueda en la homepage

    trendingPreviewSection.classList.add('inactive'); // Ocultando el preview de películas en tendencia en la homepage
    categoriesPreviewSection.classList.add('inactive'); // Ocultando la sección de categorías de películas en la homepage
    genericSection.classList.remove('inactive'); // Escondiendo el contenedor de películas en la homepage
    movieDetailSection.classList.add('inactive'); // Escondiendo el contenedor de detalles de película en la homepage

     // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;
    
    getMoviesByCategory(categoryId);
    smoothscroll();
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}

function movieDetailsPage() {
    
    headerSection.classList.add('header-container--long'); // Muestra la clase header-container--long del header
    headerSection.style.background = 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/8j58iEBw9pOXFD2L0nt0ZXeHviB.jpg)'; // Remueve el background del header en Home
    arrowBtn.classList.remove('inactive'); // Mostrando el botón de volver en la homepage
    arrowBtn.classList.add('header-arrow--white'); // Mostrando el botón de volver en blanco en la MovieDetailsPage
    headerTitle.classList.add('inactive'); // Ocultando el título de la homepage
    headerCategoryTitle.classList.add('inactive'); // Mostrando el título de categoría en la homepage
    searchForm.classList.add('inactive'); // Ocultando el formulario de búsqueda en la homepage

    trendingPreviewSection.classList.add('inactive'); // Ocultando el preview de películas en tendencia en la homepage
    categoriesPreviewSection.classList.add('inactive'); // Ocultando la sección de categorías de películas en la homepage
    genericSection.classList.add('inactive'); // Mostrando el contenedor de películas en la homepage
    movieDetailSection.classList.remove('inactive'); // Mostrando el contenedor de detalles de película en la homepage

    const [_, movieId] = location.hash.split("="); // ['#movie', 'id']
    getMovieDetails(movieId);
    smoothscroll();
    
}

function searchPage() {
    console.log('Search!!');
  
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
  
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
  
    // ['#search', 'platzi']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
  
    infiniteScroll = getPaginatedMovieBySearch(query);
    smoothscroll();
  }

function trendsPage() {
    
    headerSection.classList.remove('header-container--long'); // Remueve la clase header-container--long del header
    headerSection.style.background = ''; // Remueve el background del header en Home
    arrowBtn.classList.remove('inactive'); // Mostrando el botón de volver en la homepage
    arrowBtn.classList.remove('header-arrow--white'); // Mostrando el botón de volver en la homepage
    headerTitle.classList.add('inactive'); // Ocultando el título de la homepage
    headerCategoryTitle.classList.remove('inactive'); // Mostrando el título de categoría en la homepage
    searchForm.classList.add('inactive'); // Ocultando el formulario de búsqueda en la homepage

    trendingPreviewSection.classList.add('inactive'); // Ocultando el preview de películas en tendencia en la homepage
    categoriesPreviewSection.classList.add('inactive'); // Ocultando la sección de categorías de películas en la homepage
    genericSection.classList.remove('inactive'); // Escondiendo el contenedor de películas en la homepage
    movieDetailSection.classList.add('inactive'); // Escondiendo el contenedor de detalles de película en la homepage

    headerCategoryTitle.innerHTML = 'Tendencias';

    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;
}