import { Router } from 'https://unpkg.com/@vaadin/router';
import { render } from 'https://unpkg.com/lit-html?module';

import errorTemplate from './templates/error-template.js';
import successTemplate from './templates/success-template.js';

export default (type, context, message, redirectPath, mainTemplate) => {
    const template = type === 'error'
        ? errorTemplate(message)
        : successTemplate(message);

    render(template, context);

    setTimeout(() => {
        redirectPath
            ? Router.go(redirectPath)
            : render(mainTemplate(context), context);
    }, 800);
}