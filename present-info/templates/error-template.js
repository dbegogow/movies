import { html } from 'https://unpkg.com/lit-html?module';

export default (message) => html`
        <header-component></header-component>
        <section class="notifications">
            <p class="notification-message" id="errorBox">${message}</p>
        </section>
`;