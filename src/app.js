const http = require('http');
const url = require('url');
const getUsers = require('./modules/users');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    if (req.url === '/users') {
        res.status = 200;
        res.header = 'Content-Type: application/json';
        res.write(getUsers());
        res.end();
    } else if (queryParams.hello !== undefined) {
        if (queryParams.hello === '') {
            res.status = 400;
            res.write('Enter a name');
            res.end();
        } else {
            res.status = 200;
            res.header = 'Content-Type: text/plain';
            res.write(`Hello, ${queryParams.hello}.\n`);
            res.end();
        }
    } else {
        res.status = 200;
        res.header = 'Content-Type: text/plain';
        res.write('Hello, World!\n');
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
