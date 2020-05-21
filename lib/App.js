import { components } from '../components/index.js';

export class App {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.init();
    }

    init = () => {
        if(!this.appContainer){
            console.log('App container not found');
            return;
        }

        customElements.define('app-component', HTMLElement, { extends: 'div' });

        this.renderComponent(undefined, this.appContainer, false);
    }

    getCustomElements = (parent) => {
        const customElements = parent.getElementsByTagName('app-component');

        return customElements;
    }

    renderCustomElements = async (components) => {
        Array.prototype.map.call(components, async component => {
            const componentName = component.attributes['component'].value;
            const componentProps = JSON.parse(JSON.stringify(component.dataset));
            await this.renderComponent(componentName, component, true, componentProps);
        });
    }

    renderComponent = async (component, parent = undefined, replaceParent = false, props) => {
        const newComponent = components[component];

        if(newComponent) {
            const comp = new newComponent.component();
            await comp.start(newComponent, props);
            const customElements = this.getCustomElements(comp.template);

            if(!replaceParent){
                await parent.appendChild(comp.template);
            } else {
                await parent.parentElement.replaceChild(comp.template, parent);
            }
            await this.renderCustomElements(customElements);

        } else if (parent) {
            const customElements = this.getCustomElements(this.appContainer);
            await this.renderCustomElements(customElements);
        } else {
            console.log('Component: \'' + component + '\' could not be loaded, is it registered?');
        }
    }
}


