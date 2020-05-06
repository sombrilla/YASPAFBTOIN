import { routes } from './components/index.js';
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
        const page = requestedRoute;
        
        this.renderPage(page);
    }
    
    renderPage = async (page) => {
        const pageComponent = new page.component();
        await pageComponent.start(page);

        this.contentElement.innerHTML = '';
        this.contentElement.appendChild(pageComponent.template);
    }
}

const app = new App();

window.addEventListener('hashchange', app.goToRoute);
window.addEventListener('load', app.goToRoute);


