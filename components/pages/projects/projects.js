import { Page } from '../../../lib/Page.js';
import { themeColors } from '../../index.js';

export class Projects extends Page {
    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.projects);
    };
};