import { themeColors } from './index.js';

const Home = () => ({
    render: `
        <section class="section">
            <h1> Home </h1>
        </section>
    `,
    mounted: () => {
        document.documentElement.style.setProperty('--theme-color', themeColors.home);
    }
});

export default Home;