'use strict';

var mysql = require("mysql"),
    http = require('http'),
    url = require('url');
    querystring = require('querystring');


    //Start a web server on port 8888. Requests go to function handleRequest
    
http.createServer(handleRequest).listen(8888);

function handleRequest(request, response){
    //Page HTML as one big string, with placeholder "DBCONTENT" for data from 
    //the database
    var pageContent = `<html>
                        <head>
                        <meat http=equiv="Content-Type"
                        content="text/html; charset=UTF_8" />
                        </head>
                        <body>
                        <form action="/add" method="post" >
                        <input type="text" name="content">
                        <input type="submit" value="Add content" />
                        </form>
                        <div>
                        <strong>Content in database:</strong>
                        <pre>
                        DBCONTENT
                        </pre>
                        </div>
                        <form action="/" method="get">
                        <input type="text" name="q">
                        <input type="submit" value="Filter content" />
                        </form>
                        </body>
                        </html>`;

    var pathname = url.parse(request.url).pathname;

    //User wants to add content to the database (POST request to /add)
    if(pathname == '/add'){
        var requestBody = '';
        var postParameters = '';
        request.on('data',function(data){
            requestBody+=data;
        });
        request.on('end',function(){
            postParameters = querystring.parse(requestBody);
            addContentToDatabase(postParameters.content, function(){
                //Redirect back to homepage when the database has finished adding
                //the new content to the database
                response.writeHead(302, {'Locatoin':'/'});
                response.end();
            })
        })

    //User wants to read data from the databse (GET request to /)
    }else{
        //The text to use for filtering is in GET parameter "q"
        var filter = querystring.parse(url.parse(request.url).query).q;
        getContentsFromDatabase(filter, function(contents){
            response.writeHead(200, {'Content-Type': 'text/html'});
            //Poor man's templating system: Replace "DBCONTENT" in page HTML with
            //the actual content we received from the databse
            response.write(pageContent.replace('DBCONTENT', contents));
            response.end();
        });
    }
}

function getContentsFromDatabase(filter, callback){
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password: 'rourou',
        database: 'node'
    });

    var query;
    var resultAsString = '';

    if(filter){
        
    }
}