import Page from './page.js';
import { themeColors } from './index.js';

class Contact extends Page {
    render() { 
        return `
            <section class="section">
                <h1> Contact </h1>
            </section>
        `
    }

    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.contact);
    }
};

export default Contact;