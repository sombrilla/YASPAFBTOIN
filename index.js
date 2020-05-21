import { App } from './lib/App.js';
import { Router } from './lib/router/Router.js';

export const app = new App();
app.router = new Router(app.appContainer);
