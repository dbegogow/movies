import { Router } from 'https://unpkg.com/@vaadin/router';
import { logoutUser } from './services/authServices.js';

import Header from './components/header.js';
import Home from './components/home.js';
import Register from './components/register.js';
import Login from './components/login.js';
import Movies from './components/movies.js';
import MovieDetails from './components/movie-details.js';
import AddMovie from './components/add-movie.js';
import EditMovie from './components/edit-movie.js';

customElements.define('header-component', Header);
customElements.define('home-component', Home);
customElements.define('register-component', Register);
customElements.define('login-component', Login);
customElements.define('movies-component', Movies);
customElements.define('movie-details-component', MovieDetails);
customElements.define('add-movie-component', AddMovie);
customElements.define('edit-movie-component', EditMovie);

const container = document.getElementById('container');
const router = new Router(container);

router.setRoutes([
    {
        path: '/',
        component: 'home-component'
    },
    {
        path: '/register',
        component: 'register-component'
    },
    {
        path: '/login',
        component: 'login-component'
    },
    {
        path: '/logout',
        action: (_, commands) => {
            logoutUser();
            return commands.redirect('/login');
        }
    },
    {
        path: '/add-movie',
        component: 'add-movie-component'
    },
    {
        path: '/details/:id',
        component: 'movie-details-component'
    },
    {
        path: '/details/:id/edit-movie',
        component: 'edit-movie-component'
    }
]);