import Home from './home.js';
import Projects from './projects.js';
import Contact from './contact.js';

export const routes = {
    '/': Home,
    '/home': Home,
    '/projects': Projects,
    '/contact': Contact
};

export const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};