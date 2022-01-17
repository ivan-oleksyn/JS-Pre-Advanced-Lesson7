'use strict'
const getElem = selector => document.querySelector(selector);

// Variables
const form = document.forms.getMovieName;
let titleMovie, url, movies = [],
    moviesBlock = getElem('.movies-block'),
    card = getElem('.card'),
    movieId, movieDiscr,
    modalPoster = getElem('.movie-info-poster'),
    modalTitle = getElem('.movie-info-title'),
    modalShortInfo = getElem('.short-info'),
    modalDiscr = getElem('.discription'),
    modalWritten = getElem('.modal-written'),
    modalDirected = getElem('.modal-directed'),
    modalStarring = getElem('.modal-starring'),
    modalBox = getElem('.modal-box-office'),
    modalAwards = getElem('.modal-awards'),
    modalRatings = getElem('.modal-ratings');

// Events
getElem('.input-field').addEventListener('input', function () {
    getElem('.clear-icon').classList.remove('hide');
    titleMovie = getElem('.input-field').value;
});

getElem('.clear-icon').addEventListener('click', function () {
    form.reset();
    getElem('.clear-icon').classList.add('hide')
})

getElem('.get-info-btn').addEventListener('click', function () {
    moviesBlock.innerHTML = "";
    getInfo();
    form.reset();
    getElem('.clear-icon').classList.add('hide');
    titleMovie = '';
});

getElem('.modal-window').addEventListener('click', function () {
    getElem('.modal-window').classList.add('hide');

})

// Functions
const getInfo = async () => {
    let res = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=2b33d198&s=${titleMovie}`);
    if (res.status === 200) {
        let info = await res.json();
        movies = info;
        showInfo();
        console.log(info);
    } else {
        console.log('Error API');
    }
}

const showInfo = () => {
    const items = movies.Search;
    for (let i = 0; i < items.length; i++) {
        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('data-id', `${items[i].imdbID}`);
        let movieImg = document.createElement('div');
        movieImg.setAttribute('class', 'movie-img');
        movieImg.setAttribute('style', `background-image:url('${items[i].Poster}'); background-size: cover`);
        card.insertAdjacentElement('beforeEnd', movieImg);
        let movieTitle = document.createElement('h3');
        movieTitle.setAttribute('class', 'movie-title center size');
        movieTitle.innerHTML = items[i].Title;
        card.insertAdjacentElement('beforeEnd', movieTitle);
        let movieType = document.createElement('p');
        movieType.setAttribute('class', 'movie-type center size');
        movieType.innerHTML = items[i].Type;
        card.insertAdjacentElement('beforeEnd', movieType);
        let movieYear = document.createElement('p');
        movieYear.setAttribute('class', 'movie-year center size');
        movieYear.innerHTML = items[i].Year;
        card.insertAdjacentElement('beforeEnd', movieYear);
        let movieButton = document.createElement('input');
        movieButton.setAttribute('type', 'button');
        movieButton.setAttribute('class', `movie-btn center size ${i}`);
        movieButton.setAttribute('value', 'More details');
        movieButton.setAttribute('data-id', `${items[i].imdbID}`);
        movieButton.setAttribute('onclick', `getMovieInfo(event)`);
        card.insertAdjacentElement('beforeEnd', movieButton);
        moviesBlock.insertAdjacentElement('beforeEnd', card);
    }
}

const getMovieInfo = async (event) => {
    movieId = event.target.dataset.id;
    console.log(movieId)
    let res = await fetch(`http://www.omdbapi.com/?i=${movieId}&apikey=2b33d198&plot=full`);
    let result = await res.json();
    movieDiscr = result;
    getElem('.modal-window').classList.remove('hide');
    createModal();
}

const createModal = () => {
    modalPoster.setAttribute('style', `background-image:url('${movieDiscr.Poster}'); background-size: cover`);
    modalTitle.innerHTML = movieDiscr.Title;
    modalShortInfo.innerHTML = movieDiscr.Rated + ' ' + movieDiscr.Year + ' ' + movieDiscr.Genre;
    modalDiscr.innerHTML = movieDiscr.Plot;
    modalWritten.innerHTML = `<strong>Written by: </strong> ${movieDiscr.Writer}`;
    modalDirected.innerHTML = `<strong>Directed by: </strong> ${movieDiscr.Director}`;
    modalStarring.innerHTML = `<strong>Starring: </strong> ${movieDiscr.Writer}`;
    modalBox.innerHTML = `<strong>BoxOffice: </strong> ${movieDiscr.BoxOffice}`;
    modalAwards.innerHTML = `<strong>Awards: </strong> ${movieDiscr.Awards}`;
    modalRatings.innerHTML = `<p class="rating-list"><strong>Ratings:</strong></p>`;
    let ratings = movieDiscr.Ratings;
    for (let i = 0; i < ratings.length; i++) {
        modalRatings.innerHTML += `<p class="rating-item">${ratings[i].Source}, ${ratings[i].Value}</p>`;
    }

}