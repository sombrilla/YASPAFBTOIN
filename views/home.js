import Page from './page.js';
import { themeColors } from './index.js';

class Home extends Page {
    constructor(props) {
        super(props);
        this.props = props;
    };

    render() {
        return `
            <section class="section">
                <h1> Home </h1>
            </section>
        `
    }

    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.home);
    }
};

export default Home;