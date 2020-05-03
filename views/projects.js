import { themeColors } from './index.js';

const Projects = {
    render : async () => {
        const view =  /*html*/`
            <section class="section">
                <h1> Projects </h1>
            </section>
        `
        return view
    },
    mounted : async () => {
        document.documentElement.style.setProperty('--theme-color', themeColors.projects);
    }
}

export default Projects;