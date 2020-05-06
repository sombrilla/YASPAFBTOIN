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
        const view = routes[parsedURL] ? new routes[parsedURL]() : new routes['/home']();

        this.renderView(view);
    
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
        this.contentElement.innerHTML = await view.render();
        await view.mounted && view.mounted();
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


