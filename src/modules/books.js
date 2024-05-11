const fs = require('fs');
const path = require('path');

const getBooks = () => {
    const filePath = path.join(__dirname, '../data/books.json');
    return fs.readFileSync(filePath);
};

module.exports = getBooks;