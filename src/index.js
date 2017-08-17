'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"rourou",
    database:'node'
    // port: 3306 //default to 3306 if omitted.
});

connection.query(
    // 'SELECT "foo" AS first_field, "bar" AS second_field',
    'SELECT id, content FROM test',
    function(err, results, fields){
        // console.log(fields);
        if(err){
            console.log("A database error occured!");
        }else{
            console.log(results)
        }
        connection.end();
    }
);