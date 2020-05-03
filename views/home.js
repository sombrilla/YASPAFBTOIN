import { themeColors } from './index.js';

const Home = {
    render : async () => {
        const view =  /*html*/`
            <section class="section">
                <h1> Home </h1>
            </section>
        `
        return view
    },
    mounted : async () => {
        document.documentElement.style.setProperty('--theme-color', themeColors.home);
    }
}

export default Home;