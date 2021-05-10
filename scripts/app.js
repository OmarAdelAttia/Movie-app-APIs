// https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44

const movieListEl = document.getElementById('movie-list');

function renderMovies(movies) {
  const moviesHTML = movies.map(movie => {
    const imagePath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}"`
    const html = `
      <div class="col-4 mb-4">
      <div class="movie-card">
        <img src="${imagePath}" alt="" loading="lazy" class="movie-img">
        <div class="movie-content">
          <h2>${movie.title}</h2>
          <p>
            ${movie.overview.substring(0, 150)}...
          </p>
          <p>Rate: ${movie.vote_average}</p>
          <time datetime="${movie.release_date}">${movie.release_date}</time>
        </div>
      </div>
    </div>`;
    return html;
  }).join(' ');

  movieListEl.innerHTML = moviesHTML;
}

fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44')
  .then((res) => res.json())
  .then((data) => renderMovies(data.results));

const serachInputEl = document.getElementById('search-input')
serachInputEl.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  const movies = movieListEl.querySelectorAll('.movie-card');
  for (let i = 0; i < movies.length; i++) {
    const title = movies[i].querySelector('h2').textContent;
    const isMatched = title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());;
    if (isMatched) {
      movies[i].parentElement.classList.remove('d-none');
    } else {
      movies[i].parentElement.classList.add('d-none');
    }
  }
});

const wordsInputEl = document.getElementById('words-input');
wordsInputEl.addEventListener('input', (e) => {
  const searchTerm = e.target.value;
  fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=eba8b9a7199efdcb0ca1f96879b83c44&language=en-US&include_adult=false`)
    .then(res => res.json())
    .then(data => renderMovies(data.results));
});