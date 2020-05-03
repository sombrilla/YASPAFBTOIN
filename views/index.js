import Home from '../views/home.js';
import Projects from '../views/projects.js';
import Contact from '../views/contact.js';

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