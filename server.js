const { createServer } = require('http');
const next = require('next');

const app = next({
    dev: process.env.NODE_ENV !== 'production'
});

const handler = app.getRequestHandler();

app.prepare().then(() => {
    createServer(handler).listen(80, '0.0.0.0', err => {
        if(err) throw err;
        console.log('Ready!');
    });
});