import { themeColors } from './index.js';

const Contact = () => ({
    render:`
        <section class="section">
            <h1> Contact </h1>
        </section>
    `,
    mounted: () => {
        document.documentElement.style.setProperty('--theme-color', themeColors.contact);
    }
});

export default Contact;