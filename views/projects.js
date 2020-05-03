import { themeColors } from './index.js';

const Projects = () => ({
    render:`
        <section class="section">
            <h1> Projects </h1>
        </section>
    `,
    mounted: () => {
        document.documentElement.style.setProperty('--theme-color', themeColors.projects);
    }
});

export default Projects;