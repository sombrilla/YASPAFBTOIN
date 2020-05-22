import { Component } from '../../lib/core/Component.js';

export class CopyUpdater extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    mounted() {
        setTimeout(() => this.props.copy = 'I updated!', 3000);
    }
}