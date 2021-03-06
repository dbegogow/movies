import { html, render } from 'https://unpkg.com/lit-html?module';
import { editMovie } from '../services/movieServices.js';
import presentInfo from '../present-info/present-info.js';

const template = (context) => html`
    <header-component></header-component>
    <form class="text-center border border-light p-5" action="#" method="post" @submit=${context.onSubmit}>
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" value="" name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" value="" name="imgUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

class EditMovie extends HTMLElement {
    connectedCallback() {
        this._render();
    }

    _render() {
        render(template(this), this);
    }

    onSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const title = formData.get('title');
        const description = formData.get('description');
        const imgUrl = formData.get('imgUrl');

        if (!title && !description && !imgUrl) {
            presentInfo('error', this.parentElement, 'All fields are empty!', '', template);
            return;
        }

        const component = this.parentElement;
        const id = component.location.params.id;

        editMovie(id, title, description, imgUrl)
            .then(() => {
                presentInfo('success', component, 'Successfully edited movie!', `/details/${id}`);
            })
            .catch(() => {
                presentInfo('error', component, 'Error! Try again to edit movie!', '', template);
            });
    }
}

export default EditMovie; 