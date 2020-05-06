import Page from '../page.js';
import { themeColors } from '../index.js';

class Home extends Page {
    constructor(props) {
        super(props);
        this.props = props;
    };

    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.home);
    }
};

export default Home;