'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"rourou",
    database:'node'
    // port: 3306 //default to 3306 if omitted.
});

/*connection.query(
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
);*/

var query = connection.query('SELECT id, content FROM test');

/*query.on('row', function(row){
    console.log('Content of id '+ row.id+ ' is '+ row.content);
})*/

/*query.on('error',function(err){
    console.log('A database error occured:')
    console.log(err)
});

query.on('fields', function(fields){
    console.log(fields)
});*/

query.on('result',function(result){
    console.log('Received result:', result);
})

query.on('end',function(){
    console.log('Query execution has finished.');
    connection.end();
})