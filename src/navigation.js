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
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    
}

function movieDetailsPage() {
    
}

function searchPage() {
    
}

function trendsPage() {
    
}