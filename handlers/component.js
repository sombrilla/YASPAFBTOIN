import { app } from '../App.js';
import { componentsPath } from '../components/index.js';

class Component {
    constructor() {
        this.componentName = undefined;
        this.template = undefined;
        this.basePath = componentsPath;
    }

    async start (component) {
        await this.setComponentName(component.name);
        await this.setTemplate(component.name);

        this.mounted && this.mounted();
    }

    async setComponentName(name) {
        this.componentName = name;
    }

    async setTemplate(templatePath) {
        const response = await fetch(this.getFilePath(templatePath, '.html'));
        const template = await response.text();
        const html =  new DOMParser().parseFromString(template, 'text/html');

        const childComponents = html.getElementsByTagName('app-component');

        this.template = html.querySelector('body > *');
        Array.prototype.map.call(childComponents, async component => await this.setChildComponentsTemplate(component));
    }

    async setChildComponentsTemplate(component) {
        if (component.attributes['component'].value !== this.componentName) {
            component && app.renderComponent(component);
        } else {
            console.log('Tried to mount component:\'' +  this.componentName +  '\' inside the same component.');
        }
    }

    getFilePath(name, extension) {
        const basePath = this.basePath + '/';
        const componentPath = name + '/';
        const fullPath =  basePath + componentPath + name + (extension || '');

        return fullPath;
    }
};

export default Component;