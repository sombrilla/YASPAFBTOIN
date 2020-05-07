import { Component } from './Component.js';
import { pagesPath } from '../router/routerConfig.js';

export class Page extends Component {
    constructor() {
        super();
        this.basePath = pagesPath;
    }
};