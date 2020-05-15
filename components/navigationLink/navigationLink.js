import { Component } from '../../lib/Component.js';

export class NavigationLink extends Component {
    constructor() {
        super();
        this.props = {}
    }

    mounted () {
        const link = this.template.getElementsByClassName('navigation-link')[0];

        setTimeout(async () => {
            this.setProps({copy: 'asd', route: 'home'});
        }, 1000);

        link.addEventListener('click', this.clickLink);
    }

    clickLink(e) {
        const linkRoute = e.target.attributes['route'];
        if(linkRoute && linkRoute.value){
            location.hash = '/' + linkRoute.value;
        }
    }
};