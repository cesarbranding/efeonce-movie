searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=';
    });

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
    });

arrowBtn.addEventListener('click', () => {
    location.hash = '#';
    });

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    

    if (location.hash.startsWith("#trends")) {
        trendsPage();
    } else if (location.hash.startsWith("#search=")) {
        searchPage();
    } else if (location.hash.startsWith("#movie=")) {
        movieDetailsPage();
    } else if (location.hash.startsWith("#categories=")) {
        categoriesPage();
    } else {
        homePage();
    }

    location.hash = location.hash.replace("#trends", "#search=");
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

}

function searchPage() {
    
    headerSection.classList.remove('header-container--long'); // Remueve la clase header-container--long del header
    headerSection.style.background = ''; // Remueve el background del header en Home
    arrowBtn.classList.remove('inactive'); // Mostrando el botón de volver en la homepage
    arrowBtn.classList.remove('header-arrow--white'); // Mostrando el botón de volver en la homepage
    headerTitle.classList.add('inactive'); // Ocultando el título de la homepage
    headerCategoryTitle.classList.remove('inactive'); // Mostrando el título de categoría en la homepage
    searchForm.classList.remove('inactive'); // Ocultando el formulario de búsqueda en la homepage

    trendingPreviewSection.classList.add('inactive'); // Ocultando el preview de películas en tendencia en la homepage
    categoriesPreviewSection.classList.add('inactive'); // Ocultando la sección de categorías de películas en la homepage
    genericSection.classList.remove('inactive'); // Escondiendo el contenedor de películas en la homepage
    movieDetailSection.classList.add('inactive'); // Escondiendo el contenedor de detalles de película en la homepage

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

}