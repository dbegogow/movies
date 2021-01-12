import { getUserEmail } from './authServices.js';

const dbUrl = 'https://movies-3dc8a-default-rtdb.firebaseio.com/movies/';

export async function getAllMovies(searchText) {
    const res = await fetch(`${dbUrl}.json`);
    const movies = await res.json();

    return Object.entries(movies)
        .filter(([_, movie]) => !searchText || searchText === movie.title)
        .map(([movieId, movie]) => Object.assign(movie, { id: movieId }));
}

export async function getOneMovie(id) {
    const res = await fetch(`${dbUrl + id}.json`);
    const movie = await res.json();

    return Object.assign(movie, { id });
}

export async function addMovie(title, description, imgUrl) {
    const creator = getUserEmail();
    const likes = 0;

    const newMovie = {
        title,
        description,
        imgUrl,
        creator,
        likes,
    }

    return await fetch(`${dbUrl}.json`,
        { method: 'POST', body: JSON.stringify(newMovie) });
}

export async function deleteMovie(id) {
    return await fetch(`${dbUrl + id}.json`, { method: 'DELETE' });
}

export async function likeMovie(id) {
    const movieRes = await fetch(`${dbUrl + id}.json`);
    const movieData = await movieRes.json();

    const likedPeople = movieData.likedPeople || [];
    likedPeople.push(getUserEmail());

    const likes = likedPeople.length;

    const newInfoMovie = {
        likedPeople,
        likes
    };

    const newInfoMovieRes = await fetch(`${dbUrl + id}.json`,
        { method: 'PATCH', body: JSON.stringify(newInfoMovie) });

    return newInfoMovieRes.json();
}

export async function editMovie(id, title, description, imgUrl) {
    return await fetch(`${dbUrl + id}.json`,
        { method: 'PATCH', body: JSON.stringify({ title, description, imgUrl }) });
}