import { Home } from './Pages/Home/Home.js';
import { Projects } from './Pages/Projects/Projects.js';
import { Contact } from './Pages/Contact/Contact.js';
import { Navigation } from './Navigation/Navigation.js';
import { Background } from './Background/Background.js';

export const componentsPath = './components';

export const components = {
    home: { name: 'home', component: Home },
    projects: { name: 'projects', component: Projects },
    contact: { name: 'contact', component: Contact },
    navigation: { name: 'navigation', component: Navigation },
    background: { name: 'background', component: Background },
}

export const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};