import Page from './page.js';
import { themeColors } from './index.js';

class Projects extends Page {
    render() { 
        return `
            <section class="section">
                <h1> Projects </h1>
            </section>
       `
    };

    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.projects);
    };
};

export default Projects;