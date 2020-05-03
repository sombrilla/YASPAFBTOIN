import { routes } from '../views/index.js';
import { parseRequestURL } from '../utils/parseUrl.js';

const goToRoute = async () => {
    const content = document.getElementById('page_content') || null;
    const request = parseRequestURL();
    const parsedURL = '/' + request.resource;

    const page = routes[parsedURL] || routes['home'];

    content.innerHTML = await page.render();
    await page.mounted && page.mounted();
}

window.addEventListener('hashchange', goToRoute);
window.addEventListener('load', goToRoute);


