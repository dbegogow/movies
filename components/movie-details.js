import { html, render } from 'https://unpkg.com/lit-html?module';
import { getOneMovie, deleteMovie, likeMovie } from '../services/movieServices.js';
import { getUserEmail } from '../services/authServices.js';
import presentInfo from '../present-info/present-info.js';

const template = (context) => html`
    <header-component></header-component>
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${context.title}</h1>
    
            <div class="col-md-8">
                <img class="img-thumbnail" src="${context.imgUrl}" alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${context.description}</p>
                ${context.isUserCreatorTemplate}
            </div>
        </div>
    </div>
`;

class MovieDetails extends HTMLElement {
    connectedCallback() {
        this.deleteMovie = this.deleteMovie.bind(this);
        this.likeMovie = this.likeMovie.bind(this);

        getOneMovie(this.location.params.id)
            .then(movie => {
                Object.assign(this, movie);
                this.isUserCreatorTemplate = this.getIsUserCreatorTemplate(movie);
                this._render();
            });
    }

    _render() {
        render(template(this), this);
    }

    getIsUserCreatorTemplate(movie) {
        const userEmail = getUserEmail();
        const isUserCreator = userEmail === movie.creator;

        if (isUserCreator) {
            return html`
                <a class="btn btn-danger" href="#" .movieId=${movie.id} @click=${this.deleteMovie}>Delete</a>
                <a class="btn btn-warning" href="/details/${movie.id}/edit-movie">Edit</a>
            `;
        } else {
            const isUserLiked = movie.likedPeople?.includes(userEmail);

            if (isUserLiked) {
                return html`
                    <span class="enrolled-span">Liked ${movie.likes}</span>
                `
            } else {
                return html`
                    <a class="btn btn-primary" href="#" .movie=${movie} @click=${this.likeMovie}>Like</a>
                `;
            }
        }
    }

    deleteMovie(e) {
        const id = e.target.movieId;

        deleteMovie(id)
            .then(() => {
                presentInfo('success', this, 'Successfully removed movie!', '/');
            });
    }

    likeMovie(e) {
        const movie = e.target.movie;

        likeMovie(movie.id)
            .then((newInfoMovie) => {
                Object.assign(movie, newInfoMovie);
                this.isUserCreatorTemplate = this.getIsUserCreatorTemplate(movie);
                this._render();
            });
    }
}

export default MovieDetails; 