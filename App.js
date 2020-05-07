import { routes, components } from './components/index.js';
import { parseRequestURL } from './utils/parseUrl.js';

class App {
    constructor() {
        this.contentElement = document.getElementById('app');
        this.currentPage = undefined;
    }

    goToRoute = () => {
        if(!this.contentElement) {
            console.log('App not found');
            return;
        } 
    
        const request = parseRequestURL().resource;
        const requestedRoute = routes[request] || routes.default;
        const page = requestedRoute;

        this.renderPage(page);
    }
    
    renderPage = async (page) => {
        const pageComponent = new page.component();
        await pageComponent.start(page);

        this.contentElement.innerHTML = '';
        this.contentElement.appendChild(pageComponent.template);
    }

    renderComponent = async (component) => {
        const componentName = component.attributes['component'].value;
        if(componentName && components[componentName]) {
            const newComponent = new components[componentName].component();
            await newComponent.start(components[componentName]);
            component.appendChild(newComponent.template);

        } else {
            console.log('Component: \'' + componentName + '\' could not be loaded, is it registered?');
        }

    }
}

export const app = new App();

customElements.define('app-component', HTMLElement, { extends: 'div' });

window.addEventListener('hashchange', app.goToRoute);
window.addEventListener('load', app.goToRoute);


