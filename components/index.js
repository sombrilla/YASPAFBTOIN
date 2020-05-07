import { Home } from './Pages/Home/Home.js';
import { Projects } from './Pages/Projects/Projects.js';
import { Contact } from './Pages/Contact/Contact.js';
import { Navigation } from './Navigation/Navigation.js';
import { Background } from './Background/Background.js';

export const componentsPath = './components';

export const components = {
    home: { name: 'Home', component: Home },
    projects: { name: 'Projects', component: Projects },
    contact: { name: 'Contact', component: Contact },
    navigation: { name: 'Navigation', component: Navigation },
    background: { name: 'Background', component: Background },
}

export const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};