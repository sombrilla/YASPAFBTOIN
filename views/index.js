import Home from './home/home.js';
import Projects from './projects/projects.js';
import Contact from './contact/contact.js';

export const viewsPath = './views';

export const components = {
    home: { name: 'home', component: Home },
    projects: { name: 'projects', component: Projects },
    contact: { name: 'contact', component: Contact },
}

export const routes = {
    default: components.home,
    'home': components.home,
    'projects': components.projects,
    'contact': components.contact,
};

export const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};