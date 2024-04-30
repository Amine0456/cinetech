const maConst = '8c4b867188ee47a1d4e40854b27391ec';
const apiUrl = 'https://api.themoviedb.org/3/discover/tv?language=fr-FR&api_key=' + maConst;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const SerieContainer = document.getElementById('seriePage');

        data.results.forEach(serie => {
            const SerieElement = document.createElement('div');
            SerieElement.classList.add('col-md-4', 'mb-4'); // Bootstrap classes for column and margin bottom
            SerieElement.innerHTML = `
            <div class="card">
            <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${serie.poster_path}" alt="${serie.name} Poster">
            <div class="card-body">
                <h5 class="card-title">${serie.name}</h5>
                <button class="btn btn-danger showDetailsBtn" data-id="${serie.id}">Voir les détails</button>
                <div class="details" style="display: none;">
                    <p><strong>Résumé:</strong> <span class="summary"></span></p>
                    <p><strong>Date de sortie:</strong> ${serie.first_air_date}</p>
                    <p><strong>Note moyenne:</strong> ${serie.vote_average}</p>
                    <form class="commentForm">
                        <div class="form-group">
                            <label for="comment">Ajouter un commentaire:</label>
                            <textarea class="form-control" id="comment" rows="3" required></textarea>
                        </div>
                        <button type="submit" class="btn btn-danger">Soumettre</button>
                    </form>
                    <div class="comments"></div>
                </div>
            </div>
        </div>
        
         `;
            SerieContainer.appendChild(SerieElement);

            // récupérer le résumé de la série et l'ajouter dans les détails
            fetch(`https://api.themoviedb.org/3/tv/${serie.id}?language=fr-FR&api_key=${maConst}`)
                .then(response => response.json())
                .then(serieData => {
                    const summary = serieData.overview;
                    const detailsDiv = SerieElement.querySelector('.details');
                    const summarySpan = detailsDiv.querySelector('.summary');
                    summarySpan.textContent = summary;
                })
                .catch(error => {
                    console.error('Erreur lors de la récupération des détails de la série:', error);
                });
        });

        // ajouter un écouteur d'événements à chaque bouton "Voir les détails"
        const showDetailsBtns = document.querySelectorAll('.showDetailsBtn');
        showDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const detailsDiv = this.parentNode.querySelector('.details');
                if (detailsDiv.style.display === 'none') {
                    detailsDiv.style.display = 'block';
                    this.textContent = 'Cacher les détails';
                } else {
                    detailsDiv.style.display = 'none';
                    this.textContent = 'Voir les détails';
                }
            });
        });
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
    });
