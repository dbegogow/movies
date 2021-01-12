import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserEmail } from '../services/authServices.js';

const template = (context) => html`
    <header-component></header-component>
    <div class="jumbotron jumbotron-fluid text-light" style="background-color: #343a40;">
        <img src="https://s.studiobinder.com/wp-content/uploads/2019/06/Best-M-Night-Shyamalan-Movies-and-Directing-Style-StudioBinder.jpg"
            class="img-fluid" alt="Responsive image">
        <h1 class="display-4">Movies</h1>
        <p class="lead">Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.</p>
    </div>
    ${context.moviesTemplate}
`;

class Home extends HTMLElement {
    connectedCallback() {
        const email = getUserEmail();

        if (email) {
            this.moviesTemplate = html`<movies-component></movies-component>`;
        }

        this._render();
    }

    _render() {
        render(template(this), this);
    }
}

export default Home;