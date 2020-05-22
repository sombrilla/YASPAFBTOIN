import { Component } from '../../lib/core/Component.js';

export class AnimatedTitle extends Component {
    constructor() {
        super();
    }
    
    mounted() {
        const titleElement = this.template.querySelector('.title');
        const titleString = titleElement.innerHTML;

        titleElement.innerHTML = '';

        for(let i = 0; i < titleString.length; i++){
            const charElement = document.createElement('div');
            const char = titleString[i];
            charElement.classList.add('character');
            charElement.style.transitionDelay = `${i * 25 + 100}ms`;
            charElement.innerHTML = char;
            titleElement.appendChild(charElement);
            requestAnimationFrame(() => charElement.style.opacity = 1);
        }
    }
};