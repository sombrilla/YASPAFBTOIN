import { viewsPath } from './index.js';

class Page {
    constructor() {
        this.template = undefined;
    }

    async start (page) {
        await this.setTemplate(page.filePath);

        this.mounted && this.mounted();
    }

    getFilePath(filePath, extension) {
        const basePath = viewsPath + '/';
        const componentPath = filePath + '/';
        const fullPath =  basePath + componentPath + filePath + (extension || '');

        return fullPath;
    }

    async setTemplate(templatePath) {
        const response = await fetch(this.getFilePath(templatePath, '.html'));
        const template = await response.text();
        const html =  new DOMParser().parseFromString(template, 'text/html');

        this.template = html.querySelector('section');
    }
};

export default Page;