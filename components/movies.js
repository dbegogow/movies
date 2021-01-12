import { html, render } from 'https://unpkg.com/lit-html?module';
import { getAllMovies } from '../services/movieServices.js';

const template = (context) => html`
    <h1 class="text-center">Movies</h1>
    <section>
        <a href="/add-movie" class="btn btn-warning ">Add Movie</a>
        <form class="search float-right">
            <label>Search: </label>
            <input type="text" @input=${context.searchMovieHandler} .value=${context.searchMovieInputValue}>
            <input type="submit" @click=${context.searchMovie} class="btn btn-info" value="Search">
        </form>
    </section>
    <div class=" mt-3 ">
        <div class="row d-flex d-wrap">
            <div class="card-deck d-flex justify-content-center">
                ${context.movies.length > 0
                    ? context.movies.map(movie => context.getMovieCardTemplate(movie))
                    : html`<h2>No movies</h2>`
                }
            </div>
        </div> 
    </div>
`;

class Movies extends HTMLElement {
    connectedCallback() {
        this.searchMovieInputValue = '';

        this.searchMovieHandler = this.searchMovieHandler.bind(this);
        this.searchMovie = this.searchMovie.bind(this);

        getAllMovies()
            .then(movies => {
                this.movies = movies;
                this._render();
            });
    }

    _render() {
        render(template(this), this);
    }

    searchMovieHandler(e) {
        this.searchMovieInputValue = e.target.value;
        this._render();
    }
    
    searchMovie(e) {
        e.preventDefault();
    
        getAllMovies(this.searchMovieInputValue)
            .then(movies => {
                this.movies = movies;
                this.searchMovieInputValue = '';
                this._render();
            });
    }

    getMovieCardTemplate(movie) {
       return html`
            <div class="card mb-4">
                <img class="card-img-top" src="${movie.imgUrl}" alt="Card image cap" width="400">
                <div class="card-body">
                    <h4 class="card-title">${movie.title}</h4>
                </div>
                <div class="card-footer">
                    <a href="/details/${movie.id}">
                        <button type="button" class="btn btn-info">Details</button></a>
                </div>
            </div>
        `;
    }
}

export default Movies;