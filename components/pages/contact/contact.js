import Page from '../../../handlers/page.js';
import { themeColors } from '../../index.js';

class Contact extends Page {
    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.contact);
    }
};

export default Contact;