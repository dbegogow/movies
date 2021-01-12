import { html, render } from 'https://unpkg.com/lit-html?module';
import { addMovie } from '../services/movieServices.js';
import presentInfo from '../present-info/present-info.js';

const template = (context) => html`
    <header-component></header-component>
    <form class="text-center border border-light p-5" action="#" method="post" @submit=${context.onSubmit}>
        <h1>Add Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Title" name="title" value="">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Description" name="description"></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" name="imgUrl" value="">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
`;

class AddMovie extends HTMLElement {
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

        if (!title || !description || !imgUrl) {
            presentInfo('error', this.parentElement, 'Cannot have empty fields!', '', template);
            return;
        }

        addMovie(title, description, imgUrl)
            .then(() => {
                presentInfo('success', this.parentElement, 'Successfully added new movie!', '/');
            })
            .catch(() => {
                presentInfo('error', this.parentElement, 'Error! Try again to add new movie!', '', template);
            });
    }
}

export default AddMovie; 