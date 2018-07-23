var pg = require('pg');
var conString = "postgres://postgres:123@localhost:5432/arduinodb";
var parseInt = require('parse-int');
var fs = require('fs');
var exress=require('express');


//--CONNECT TO DB--//
var client = new pg.Client(conString);
client.connect();  
//--MAX SCORE QUERY--//
var answer;
const query = 
    'SELECT MAX(scores) FROM scores;';

    client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
          answer = JSON.stringify(res.rows[0]);
          console.log("the max score is"+answer);
        }
      })

      var time;
      const query2 = 
      'SELECT date FROM scores WHERE scores=(SELECT MAX(scores) FROM scores);';
      
          client.query(query2, (err, res) => {
              if (err) {
                console.log(err.stack)
              } else {
                time = JSON.stringify(res.rows[0]);
                console.log("asd"+time)
              }
            })
//--WEB SERVER--//
var app = exress();
var server=app.listen(3000,listening);

function listening(){
  console.log("Listening...")
}
app.use(exress.static("Front"));



app.get('/all',sendAll);
app.get('/time',sendTime);

function sendAll(request,response){
  const query = 
  'SELECT MAX(scores) FROM scores;';

  client.query(query, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        answer = JSON.stringify(res.rows[0]);
        console.log("QUERY FOR MAX SCORE"+answer);
      }
    })

  response.send(answer);

}


function sendTime(request,response){
 
  const query2 = 
          'SELECT date FROM scores WHERE scores=(SELECT MAX(scores) FROM scores);';
      
          client.query(query2, (err, res) => {
              if (err) {
                console.log(err.stack)
              } else {
                time = JSON.stringify(res.rows[0]);
              }
            })
            response.send(time);

}
      //--SQL QUERY FOR HIEGHST SCORE--//





      
      //--SERIAL READ--//
      var serialData;
      
      const SerialPort = require('serialport');
      const Readline = SerialPort.parsers.Readline;
      const port = new SerialPort('COM3');
      const parser = new Readline();
      port.baudRate = 9600;
      port.pipe(parser);
      parser.on('data', function(data){
        serialData=data;
        console.log(serialData);
        
       const query = 
        "INSERT INTO scores (scores, date)VALUES ("+data+", localtimestamp);";

        client.query(query, (err, res) => {
        if (err) {
          console.log(err.stack)
        } else {
            var answer = res.rows[0];
          console.log(answer);
        }
      })
    });


