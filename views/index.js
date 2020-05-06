import Home from './home/home.js';
import Projects from './projects/projects.js';
import Contact from './contact/contact.js';

export const routes = {
    '/': {
        component: Home,
        markup: './views/home/home.html',
    },
    '/home': { 
        component: Home,
        markup: './views/home/home.html',
    },
    '/projects': {
        component: Projects,
        markup: './views/projects/projects.html',
    },
    '/contact': {
        component: Contact,
        markup: './views/contact/contact.html',
    },
};

export const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};