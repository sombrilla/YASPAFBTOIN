import { Component } from '../../lib/core/Component.js';

export class Navigation extends Component {
    constructor(props) {
        super(props);
        this.props = {
            test: 'Home',
        }
    }
    
    mounted() {
        const links = this.template.getElementsByClassName('navigation-link');

        Array.prototype.map.call(links, link => link.addEventListener('click', this.clickLink));
    }
};