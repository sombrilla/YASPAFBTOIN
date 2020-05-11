import { app } from '../index.js';
import { componentsPath } from '../components/index.js';

export class Component {
    constructor() {
        this.componentName = undefined;
        this.template = undefined;
        this.style = undefined;
        this.loadCSS = false;
        this.basePath = componentsPath;
        this.props = {};
    }

    async start(component, props) {
        this.props = props;
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
        const templateHTML = files.template;
        const parsedHTML = new DOMParser().parseFromString(templateHTML, 'text/html');

        let tempTemplate = parsedHTML.querySelector('body > *');

        tempTemplate = await this.updateTemplateVars(tempTemplate);

        const markupStyle = parsedHTML.querySelector('style');
        
        this.template = tempTemplate;
        const styles = [files.style, markupStyle && markupStyle.innerHTML];
        styles.map(async style => style && await this.setStyle(style));
        this.updateDOM(this.template);
    }

    async updateTemplateVars(template) {
        let templateString = template.outerHTML;
        const parseVarsRegEx = /\{{2} *\w+ *\}{2}/g;
        const foundVars = templateString.match(parseVarsRegEx);
        const templateProps = this.props;

        if(foundVars){
            foundVars.map(variableFound => {
                const variable = variableFound.slice(2, -2).replace(/ /g, '');
                templateString = templateString.replace(variableFound, templateProps[variable] || '');
            });
        }

        const html = new DOMParser().parseFromString(templateString, 'text/html');

        return html.querySelector('body > *');
    }

    async updateDOM(template) {
        this.template.parentElement.replaceChild(this.template, template);
        this.template = template;
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
            app.renderComponent({component, parent: this, replaceParent: true});
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