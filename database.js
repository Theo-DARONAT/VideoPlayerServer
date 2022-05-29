var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors')
var app = express();
var router = express.Router();
var prep = require('pg-prepared')
var port = 8000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

history = "/history";
bookmark = "/bookmark";

const { Client } = require('pg');
const client = new Client({
  user: 'magicarpe',
  host: '',
  database: 'data',
  password: '',
  port: 5432,
});

client.connect();

client.query('create table if not exists history(link    VARCHAR(64));', (err, res) => {});

client.query('create table if not exists bookmark(link    VARCHAR(64));', (err, res) => {});

app.listen(port, function(){
    var message = "server running on port: " + port;
    console.log(message);
});

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

app.post(history + '/add', function(request, response){
    console.log("POST History request");
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    console.log(request.body)
    
    var req = prep('insert into history \n values (${link});');

    client.query(req({link: request.body.link}), (err, res) => {
        if (err)
            response.status(400).send("Error while adding datas");
        else
            response.status(200).send()
    });
});

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

app.post(bookmark + '/add', function(request, response){
    console.log("POST Bookmark request");
    response.set('Access-Control-Allow-Origin', 'http://localhost:4200');

    var req = prep('insert into bookmark \n values (${link});');

    client.query(req({link: request.body.link}), (err, res) => {
        if (err)
            response.status(400).send("Error while adding datas");
        else
            response.status(200).send();
    });
});