import { Component } from '../core/Component.js';
import { pagesPath } from './routerConfig.js';

export class Page extends Component {
    constructor() {
        super();
        this.basePath = pagesPath;
    }
};