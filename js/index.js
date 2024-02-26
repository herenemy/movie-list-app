'use strict';

const movieInputNode = document.getElementById('js-input'),
  btnAddMovieNode = document.getElementById('js-btn-input__send'),
  moviesContainerNode = document.getElementById('movie__container'),
  checkboxNode = document.getElementById('movie__checkbox'),
  btnMovieRemoveNode = document.getElementById('btn-movie__remove'),
  movieListItemNode = document.getElementById('movie-item'),
  movieNameNode = document.querySelector('.movie-name');

let movieList = [];

validation();

btnAddMovieNode.addEventListener('click', function () {
  getMovieFromUser();
  renderMovie();
  movieInputNode.value = '';
  validation();
});

moviesContainerNode.addEventListener('click', function (e) {
  const currentTarget = e.target;
  if (currentTarget.classList.contains('btn-checkbox')) {
    currentTarget
      .closest('.btn-checkbox')
      .classList.toggle('btn-checkbox_inactive');

    currentTarget
      .closest('.movie-list__item')
      .classList.toggle('movie-list__item_inactive');

    currentTarget
      .closest('.movie-list__left')
      .classList.toggle('movie-name_inactive');
  }
});

moviesContainerNode.addEventListener('click', function (e) {
  const currentTarget = e.target;
  if (currentTarget.classList.contains('btn-remove')) {
    movieList.forEach((item, index, arr) => {
      if (item === currentTarget.dataset.movie) {
        arr.splice(index, 1);
      }
    });
    currentTarget.closest('.movie-list__item').remove();
  }
});

movieInputNode.addEventListener('input', validation);

function validation() {
  if (!movieInputNode.value) {
    btnAddMovieNode.classList.add('btn_disabled');
  } else {
    btnAddMovieNode.classList.remove('btn_disabled');
  }
}

function getMovieFromUser() {
  const movieName = movieInputNode.value;
  movieList.push(movieName);
}

function renderMovie() {
  let movieHTML = '';
  movieList.forEach(item => {
    movieHTML = `<li id="movie-item"  class="movie-list__item">
                            <div class="movie-list__left">
                                <div id="movie__checkbox" class="btn-checkbox"></div>
                                <p class="movie-name">${item}</p>
                            </div>
                            <div class="movie-list__right">
                                <div id="btn-movie__remove" data-movie="${item}" class="btn-remove"></div>
                            </div>
                        </li>`;
  });

  moviesContainerNode.innerHTML += movieHTML;
}
