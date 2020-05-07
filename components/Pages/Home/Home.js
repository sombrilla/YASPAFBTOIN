import { Page } from '../../../lib/Page.js';
import { themeColors } from '../../index.js';

export class Home extends Page {
    constructor(props) {
        super(props);
        this.props = props;
    };

    mounted() {
        document.documentElement.style.setProperty('--theme-color', themeColors.home);
    }
};