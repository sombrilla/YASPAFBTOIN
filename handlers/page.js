import Component from './component.js';
import { pagesPath } from '../components/index.js';

class Page extends Component {
    constructor() {
        super();
        this.basePath = pagesPath;
    }
};

export default Page;