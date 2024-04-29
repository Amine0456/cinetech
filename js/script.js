// Récupération des films
const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const filmApi = 'https://api.themoviedb.org/3/discover/movie?language=fr-FR&api_key=' + maConst;

fetch(filmApi)
    .then(response => response.json())
    .then(data => {
        const filmsContainer = document.getElementById('films');
        const films = data.results.map(film => `
            <div class="col-md-4 mb-4"> <!-- Utilisation de Bootstrap pour diviser en colonnes -->
                <div class="card">
                    <h2>${film.title}</h2>
                    <img src="https://image.tmdb.org/t/p/w500/${film.poster_path}" alt="${film.title} Poster" class="card-img-top">
                </div>
            </div>
        `).join('');

        filmsContainer.innerHTML = `<div class="row">${films}</div>`; // Ajout d'une ligne Bootstrap

        // Initialiser le carrousel de films avec Slick.js
        $('#films').slick({
            infinite: true,
            slidesToShow: 3, // Nombre de films affichés simultanément
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000 // Vitesse de défilement automatique
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données des films:', error);
    });
