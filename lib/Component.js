import { componentsPath } from '../components/index.js';
import { Observer } from './Observer.js';

export class Component {
    constructor() {
        this.componentName = undefined;
        this.template = undefined;
        this.templateString = undefined;
        this.style = undefined;
        this.loadCSS = false;
        this.basePath = componentsPath;
        this.props = {};
    }

    async start(component, props) {
        this.loadCSS = component.loadCSS;
        await this.setComponentName(component.name);
        await this.setProps(props);
        await this.setTemplate(component.name);

        this.mounted && this.mounted();
    }

    async setComponentName(name) {
        this.componentName = name;
    }

    async setProps(props) {
        this.props = new Observer();
        this.props.add_callback(async () => {
            this.templateString && await this.updateTemplateVars();
        });

        if(props){
            Object.keys(props).map(function(key) {
                this.props[key] = props[key];
            }, this);
        }
    }

    async setTemplate(templatePath) {
        const files = {
            template: await this.fetchFile(templatePath, '.html'),
            style: this.loadCSS && await this.fetchFile(templatePath, '.css'),
        };
        const templateHTML = files.template;
        const parsedHTML = new DOMParser().parseFromString(templateHTML, 'text/html');
        const tempTemplate = parsedHTML.querySelector('body > *');
        const markupStyle = parsedHTML.querySelector('style');

        this.templateString = tempTemplate.outerHTML;
        await this.updateTemplateVars();
        
        const styles = [files.style, markupStyle && markupStyle.innerHTML];
        styles.map(async style => style && await this.setStyle(style));
    }

    async updateTemplateVars() {
        let templateString = this.templateString;
        const templateProps = this.props;
        const parseVarsRegEx = /\{{2} *\w+ *\}{2}/g;
        const foundVars = templateString.match(parseVarsRegEx);

        if(foundVars){
            foundVars.map(variableFound => {
                const variable = variableFound.slice(2, -2).replace(/ /g, '');
                templateString = templateString.replace(variableFound, templateProps[variable] || '');
            });
        }

        const html = new DOMParser().parseFromString(templateString, 'text/html');

        this.updateDOM(html.querySelector('body > *'));
    }

    async updateDOM(template) {
        if(!this.template){
            this.template = template;
        }

        if(this.template.outerHTML !== template.outerHTML) {
            this.template.parentElement.replaceChild(template, this.template);
            this.template = template;
            this.template.appendChild(this.style);
        }
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