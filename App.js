import { routes } from '../views/index.js';
import { parseRequestURL } from '../utils/parseUrl.js';

class App {
    constructor() {
        this.contentElement = document.getElementById('page_content');
    }

    goToRoute = () => {
        if(!this.contentElement) {
            console.log('Page Content not found');
            return;
        } 
    
        const request = parseRequestURL();
        const parsedURL = '/' + request.resource;
        const view = routes[parsedURL] ? new routes[parsedURL].component() : new routes['/home'].component();

        this.renderView({component: view, markup: routes[parsedURL].markup});
    
        // mutationObserver.observe(view, {
        //     attributes: true,
        //     characterData: true,
        //     childList: true,
        //     subtree: true,
        //     attributeOldValue: true,
        //     characterDataOldValue: true
        // });
        
    }
    
    renderView = async (view) => {
        const templatePath = view.markup;
        const template = await this.getTemplate(templatePath);
        this.contentElement.appendChild(template);
        await view.component.mounted && view.component.mounted();
    }

    getTemplate = async (templatePath) => {
        const response = await fetch(templatePath);
        const txt = await response.text();
        const html =  new DOMParser().parseFromString(txt, 'text/html');

        return html.querySelector('section');
    }  
    
    // mutationObserver = new MutationObserver(function(mutations) {
    //     mutations.forEach(function(mutation) {
    //       console.log(mutation);
    //     });
    // });
}

const app = new App();

window.addEventListener('hashchange', app.goToRoute);
window.addEventListener('load', app.goToRoute);


