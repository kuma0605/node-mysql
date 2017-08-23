'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rourou'
});

connection.query('USE node', function(err) {
    if (err) {
        console.log('Could not switch to databse node.');
    }
});

connection.query('CREATE TABLE passwords ' +
    '(id INT(11) AUTO_INCREMENT, ' +
    ' password VARCHAR(255), ' +
    ' PRIMARY KEY(id))',
    function(err) {
        if (err) {
            console.log('Could not create table "password".')
        }
    }
);

connection.query('INSERT INTO passwords (password) VALUES ("secret")');
connection.query('INSERT INTO passwords (password) VALUES ("dont_tell")');

connection.end();