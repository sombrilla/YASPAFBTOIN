import Page from '../../../handlers/page.js';
import { themeColors } from '../../index.js';

class Projects extends Page {
    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.projects);
    };
};

export default Projects;