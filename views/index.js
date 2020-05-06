import Home from './home/home.js';
import Projects from './projects/projects.js';
import Contact from './contact/contact.js';

export const viewsPath = './views';

export const routes = {
    default: {
        component: Home,
        filePath: 'home',
    },
    'home': { 
        component: Home,
        filePath: 'home',
    },
    'projects': {
        component: Projects,
        filePath: 'projects',
    },
    'contact': {
        component: Contact,
        filePath: 'contact',
    },
};

export const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};