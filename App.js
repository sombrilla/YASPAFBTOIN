import { routes, viewsPath } from './views/index.js';
import { parseRequestURL } from './utils/parseUrl.js';

class App {
    constructor() {
        this.contentElement = document.getElementById('app');
    }

    goToRoute = () => {
        if(!this.contentElement) {
            console.log('App not found');
            return;
        } 
    
        const request = parseRequestURL().resource;
        const requestedRoute = routes[request] || routes.default;
        const component = new requestedRoute.component();
        const filePath = requestedRoute.filePath;

        this.renderView({component, filePath});
    }
    
    renderView = async (view) => {
        const basePath = viewsPath + '/';
        const componentPath = view.filePath + '/';
        const markupPath =  basePath + componentPath + view.filePath + '.html';
        const template = await this.getTemplate(markupPath);

        this.contentElement.innerHTML = '';
        this.contentElement.appendChild(template);
        view.component.setViewReference(template);
        await view.component.mounted && view.component.mounted();
    }

    getTemplate = async (templatePath) => {
        const response = await fetch(templatePath);
        const txt = await response.text();
        const html =  new DOMParser().parseFromString(txt, 'text/html');

        return html.querySelector('section');
    }
}

const app = new App();

window.addEventListener('hashchange', app.goToRoute);
window.addEventListener('load', app.goToRoute);


