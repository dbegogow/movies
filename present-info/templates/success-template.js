import { html } from 'https://unpkg.com/lit-html?module';

export default (message) => html`
        <header-component></header-component>
        <section class="notifications" style="background-color:rgba(1, 131, 29, 0.541);">
            <p class="notification-message" id="successBox">${message}</p>
        </section>
`;
