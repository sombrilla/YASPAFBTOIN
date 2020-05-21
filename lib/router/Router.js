import { app } from '../../index.js';
import { routes } from './routerConfig.js';

export class Router {
    constructor(container) {
        this.appContainer = container;
        this.container = undefined;
        // this.currentPage = undefined;

        this.createPageContainer();

        window.addEventListener('hashchange', this.goToRoute);
        window.addEventListener('load', this.goToRoute);
    }

    createPageContainer = async () => {
        const pageContainer = document.createElement('div');
        pageContainer.setAttribute('id', 'page_container');

        await this.appContainer.appendChild(pageContainer);
        this.container = pageContainer;
    }

    goToRoute = () => {
        const request = this.parseRequestURL().resource;
        const requestedRoute = routes[request] || routes.default;
        const page = requestedRoute;

        this.container.innerHTML = '';
        app.renderComponent(page, this.container, false);
    }

    parseRequestURL = () => {
        const url = location.hash.slice(1).toLowerCase() || '/';
        const r = url.split("/");
        const request = {
            resource: null,
            id: null,
            verb: null,
        };
        request.resource = r[1];
        request.id = r[2];
        request.verb = r[3];
    
        return request;
    }
}