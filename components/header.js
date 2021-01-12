import { html, render } from 'https://unpkg.com/lit-html?module';
import { getUserEmail } from '../services/authServices.js';

function template(context) {
    return html`
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark ">
            <a class="navbar-brand text-light" href="/">Movies</a>
            <ul class="navbar-nav ml-auto ">
                ${context.isLoggedUserTemplate}
            </ul>
        </nav>
    `;
}

export default class Header extends HTMLElement {
    connectedCallback() {
        const email = getUserEmail();
        this.isLoggedUserTemplate = this.getIsLoggedUserTemplate(email);

        this._render();
    }

    _render() {
        render(template(this), this);
    }

    getIsLoggedUserTemplate(email) {
        if (email) {
            return html`
                <li class="nav-item">
                    <a class="nav-link">Welcome, ${email}</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/logout">Logout</a>
                </li>
            `;
        } else {
            return html`
                <li class="nav-item">
                    <a class="nav-link" href="/login">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/register">Register</a>
                </li>
            `;
        }
    }
}