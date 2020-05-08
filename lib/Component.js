import { app } from '../App.js';
import { componentsPath } from '../components/index.js';

export class Component {
    constructor() {
        this.componentName = undefined;
        this.template = undefined;
        this.style = undefined;
        this.loadCSS = false;
        this.basePath = componentsPath;
    }

    async start (component) {
        await this.setComponentName(component.name);
        this.loadCSS = component.loadCSS;
        await this.setTemplate(component.name);

        this.mounted && this.mounted();
    }

    async setComponentName(name) {
        this.componentName = name;
    }

    async setTemplate(templatePath) {
        const files = {
            template: await this.fetchFile(templatePath, '.html'),
            style: this.loadCSS && await this.fetchFile(templatePath, '.css'),
        };
        const template = files.template;

        const html =  new DOMParser().parseFromString(template, 'text/html');

        this.template = html.querySelector('body > *');

        const cssStyle = files.style;
        const markupStyle = html.querySelector('style') && html.querySelector('style').innerHTML || null;

        cssStyle && await this.setStyle(cssStyle);
        markupStyle && await this.setStyle(markupStyle);

        const childComponents = app.getCustomElements(html);

        Array.prototype.map.call(childComponents, async component => await this.setChildComponentsTemplate(component));
    }

    async setStyle(style) {
        if(!this.style) {
            const styleElement = document.createElement('style');
            styleElement.setAttribute('scoped', '');
            
            styleElement.innerHTML = style;
            this.template.appendChild(styleElement);
            this.style = styleElement;
        } else {
            this.style.innerHTML += style;
        }
    }

    async setChildComponentsTemplate(component) {
        if (component.attributes['component'].value !== this.componentName) {
            app.renderComponent(component);
        } else {
            console.log('Tried to mount component:\'' +  this.componentName +  '\' inside the same component.');
        }
    }

    async fetchFile(fileName, extension) {
        const filePath = this.getFilePath(fileName, extension);
        const response = await fetch(filePath)
                                .then(res => {
                                    if (!res.ok) { 
                                        throw new Error();
                                    };

                                    return res.text();
                                })
                                .catch(e => console.log('File not found: ' + filePath))

        return response;
    }

    getFilePath(name, extension) {
        const basePath = this.basePath + '/';
        const componentPath = name + '/';
        const fullPath =  basePath + componentPath + name + (extension || '');

        return fullPath;
    }
};