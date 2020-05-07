import { components } from './components/index.js';
import Router from './router/router.js';

const appContainer = document.getElementById('app');

class App {
    constructor() {
        this.router = new Router(appContainer);
        this.startUp();
    }

    startUp = async () => {
        if(!appContainer){
            console.log('App not found');
            return;
        }

       customElements.define('app-component', HTMLElement, { extends: 'div' });

       this.getCustomElements();
    }

    getCustomElements = async (parent = undefined) => {
        const customComponents = parent ? parent.getElementsByTagName('app-component') : appContainer.getElementsByTagName('app-component');

        if(!parent) {
            console.log(customComponents)
            Array.prototype.map.call(customComponents, async component => await this.renderComponent(component));
        }

        return customComponents;
    }

    renderComponent = async (component, parent = undefined) => {
        const componentName = typeof component !== "string" ? component.attributes['component'].value : components[component].name;
        const tempComponent = !parent ? component : parent;

        if(componentName && components[componentName]) {
            const newComponent = new components[componentName].component();
            await newComponent.start(components[componentName]);
            tempComponent.appendChild(newComponent.template);
        } else {
            console.log('Component: \'' + componentName + '\' could not be loaded, is it registered?');
        }

    }
}

export const app = new App();


