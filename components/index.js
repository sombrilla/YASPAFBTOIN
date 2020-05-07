import Home from './pages/home/home.js';
import Projects from './pages/projects/projects.js';
import Contact from './pages/contact/contact.js';
import Navigation from './navigation/navigation.js';

export const componentsPath = './components';

export const components = {
    home: { name: 'home', component: Home },
    projects: { name: 'projects', component: Projects },
    contact: { name: 'contact', component: Contact },
    navigation: { name: 'navigation', component: Navigation },
}

export const themeColors = {
    home: '#0af',
    projects: 'red',
    contact: 'green'
};