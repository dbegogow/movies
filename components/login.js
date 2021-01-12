import { html, render } from 'https://unpkg.com/lit-html?module';
import { loginUser } from '../services/authServices.js';
import presentInfo from '../present-info/present-info.js';

const template = (context) => html`
    <header-component></header-component>
    <form class="text-center border border-light p-5" action="#" method="post" @submit=${context.onSubmit}>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>
    
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
`;

class Login extends HTMLElement {
    connectedCallback() {
        this._render();
    }

    _render() {
        render(template(this), this);
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const email = formData.get('email');
        const password = formData.get('password');

        if (!email) {
            presentInfo('error', this.parentElement, 'Email field cannot be empty!', '', template);
            return;
        }

        if (password.length < 6) {
            presentInfo('error', this.parentElement, 'Password must be at least 6 symbols!', '', template);
            return;
        }

        loginUser(email, password)
            .then(() => {
                presentInfo('success', this.parentElement, 'Successfully loggedin!', '/');
            })
            .catch(() => {
                presentInfo('error', this.parentElement, 'Error! Try again to loggedin!', '', template);
            });
    };
}

export default Login;