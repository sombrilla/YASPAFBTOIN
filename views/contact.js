import { themeColors } from './index.js';

const Contact = {
    render : async () => {
        const view =  /*html*/`
            <section class="section">
                <h1> Contact </h1>
            </section>
        `
        return view
    },
    mounted : async () => {
        document.documentElement.style.setProperty('--theme-color', themeColors.contact);
    }
}

export default Contact;