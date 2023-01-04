import 'reflect-metadata';
import App from './app';

console.log('Notification V2 service');

process.on('uncaughtException', (err) => {
    console.error(`
    --------------------
    Unhandled Exception:
    ${err.message}
    --------------------
    `);
});

process.on('unhandledRejection', (err) => {
    console.error(`
    --------------------
    Unhandled Rejection:
    ${err}
    --------------------
    `);
});

const app: App = new App();
app.start();
module.exports = app;