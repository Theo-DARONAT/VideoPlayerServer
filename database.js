//Use body parser to encode and decode json request
var bodyParser = require('body-parser');
//Use express
var express = require('express');
//Use cors to catch CORS errors
var cors = require('cors')
var app = express();
//Use pg-prepared to handle sql injections
var prep = require('pg-prepared')
var port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Base url for history request and bookmarks request
history = "/history";
bookmark = "/bookmark";

//create a client for postgres server
const { Client } = require('pg');
const client = new Client({
  user: '',
  host: '',
  database: 'youreliefdata', // name of the database
  password: '',
  port: 5432,
});

client.connect();

// Create table in the case that you are using the app for the first time
// Otherwise we want to keep history and bookmarks
client.query('create table if not exists history(link    VARCHAR(64));', (err, res) => {});

client.query('create table if not exists bookmark(link    VARCHAR(64));', (err, res) => {});

//Start listening
app.listen(port, function(){
    var message = "server running on port: " + port;
    console.log(message);
});

//Get history request, we want to return all the history
app.get(history, function(request, response){
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    console.log("GET History request");
    client.query('SELECT * from history', (err, res) => {
        if (err)
            response.status(400).send("Error while getting datas");
        else{
            response.json(res.rows);
        }
    });
});

//Post history request, we want to add a new link to the history table 
app.post(history + '/add', function(request, response){
    console.log("POST History request");
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    console.log(request.body)
    
    //Prepare insert request for history table
    var req = prep('insert into history \n values (${link});');
    
    client.query(req({link: request.body.link}), (err, res) => {
        if (err)
            response.status(400).send("Error while adding datas");
        else
            response.status(200).send()
    });
});

//Get bookmark request, we want to return all bookmarks
app.get(bookmark, function(request, response){
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    console.log("GET Bookmark request");
    client.query('SELECT * from bookmark', (err, res) => {
        if (err)
            response.status(400).send("Error while getting datas");
        else
            response.json(res.rows);
    });
});

//Post bookmark request, we want to add a new link to the bookmarks table
app.post(bookmark + '/add', function(request, response){
    console.log("POST Bookmark request");
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');

    //Prepare insert request for bookmarks table
    var req = prep('insert into bookmark \n values (${link});');

    client.query(req({link: request.body.link}), (err, res) => {
        if (err)
            response.status(400).send("Error while adding datas");
        else
            response.status(200).send();
    });
});
