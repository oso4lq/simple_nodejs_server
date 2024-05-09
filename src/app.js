const http = require('http');
const url = require('url');
const getUsers = require('./modules/users');
const getBooks = require('./modules/books');
const serverPort = 3003;

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    switch (parsedUrl.pathname) {

        // GET users
        case '/users':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(getUsers());
            res.end();
            break;
        // GET books
        case '/books':
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.write(getBooks());
            res.end();
            break;

        default:

            if (parsedUrl.pathname.startsWith('/users/:')) {
                const userId = parseInt(parsedUrl.pathname.split('/:').pop());
                const users = JSON.parse(getUsers());
                const user = users.find(user => user.id === userId);
                if (user) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.write(JSON.stringify(user));
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.write('User not found');
                }
                res.end();
            } else if (parsedUrl.pathname.startsWith('/books/:')) {
                const bookId = parseInt(parsedUrl.pathname.split('/:').pop());
                console.log(bookId);
                const books = JSON.parse(getBooks());
                console.log(books);
                const book = books.find(book => book.id === bookId);
                console.log(book);
                if (book) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.write(JSON.stringify(book));
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.write('Book not found');
                }
                res.end();
            } else
                if (queryParams.hello !== undefined) {
                    if (queryParams.hello !== undefined) {
                        if (queryParams.hello === '') {
                            res.statusCode = 400;
                            res.write('Enter a name');
                            res.end();
                        } else {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'text/plain');
                            res.write(`Hello, ${queryParams.hello}.\n`);
                            res.end();
                        }
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/plain');
                        res.write('Hello, World!\n');
                        res.end();
                    }
                }

                else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain');
                    res.write('Not found');
                    res.end();
                }


            break;
    }
});

server.listen(serverPort, () => {
    console.log(`Server is running on http://localhost:${serverPort}`);
});
