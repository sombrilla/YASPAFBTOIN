import { Component } from '../../lib/Component.js';

export class NavigationLink extends Component {
    constructor() {
        super();
        this.props = {}
    }

    mounted () {
        const links = this.template.getElementsByClassName('navigation-link');
        setTimeout(async () => {
            this.props.copy = 'asd';
        }, 1000)

        Array.prototype.map.call(links, link => link.addEventListener('click', this.clickLink));
    }

    clickLink(e) {
        const linkRoute = e.target.attributes['route'];
        if(linkRoute && linkRoute.value){
            location.hash = '/' + linkRoute.value;
        }
    }
};