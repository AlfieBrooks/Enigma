import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

const app = express();
const port = 443

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/config', (req, res) => {
  res.send({features:{cuck:true}});
});

app.post('/signup', (req, res) => {
  if (req.body && req.body.accountName && req.body.accountPassword){
    res.end("signup Sucessful")
  }
  res.status(400).json({ error: 'no credentials posted' })
})

connect();

function listen() {
  // var BookSchema = mongoose.Schema({
  //   name: String,
  //   price: Number,
  //   quantity: Number
  // });
  // var Book = mongoose.model('enigmatest', BookSchema);
  // var book1 = new Book({ name: 'a fucker and his database 2', price: 10, quantity: 25 });
  // book1.save(function (err, book) {
  //   if (err) return console.error(err);
  //   console.log(book.name + " saved to bookstore collection.");
  // });
  // Book.findById('5dfd4ec4f30c6e1eecfa5f4e', function(err, arr) {console.log(err, arr)})
  // Book.update({_id:'5dfd4ec4f30c6e1eecfa5f4e' }, {name: 'A fucker and his dattabase Part 3'}, { multi: false }, function(err){ console.log(err)})
  app.listen(port);
  console.log('App started on port ' + port);
}

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect('mongodb://35.246.119.118:27017/enigmatest', { keepAlive: 1, useNewUrlParser: true });
}