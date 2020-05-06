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

        this.template = html.querySelector('body');
    }

    getFilePath(name, extension) {
        const basePath = this.basePath + '/';
        const componentPath = name + '/';
        const fullPath =  basePath + componentPath + name + (extension || '');

        return fullPath;
    }
};

export default Component;