export const FETCH_MOVIES = "FETCH_MOVIES";

// let url = 'https://api.themoviedb.org/3/movie/${id}?&api_key=cfe422613b250f702980a3bbf9e90716';

const api_key = 'cfe422613b250f702980a3bbf9e90716';
const fetchMovies = (dispatch, query) => {
    let url = 'https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${api_key}';
    fetch(url)
    .then(res => res.json())
    .then(res => dispatch({type:FETCH_MOVIES,payload:res.data}));
};

export default fetchMovies;
