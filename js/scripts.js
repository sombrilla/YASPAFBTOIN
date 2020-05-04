import { routes } from '../views/index.js';
import { parseRequestURL } from '../utils/parseUrl.js';

const goToRoute = async () => {
    const content = document.getElementById('page_content');

    if(!content) {
        console.log('Page Content not found');
        return;
    } 

    const request = parseRequestURL();
    const parsedURL = '/' + request.resource;
    const view = routes[parsedURL] ? routes[parsedURL]() : routes['/home']();

    content.innerHTML = await view.render;
    await view.mounted && view.mounted();
}

window.addEventListener('hashchange', goToRoute);
window.addEventListener('load', goToRoute);
