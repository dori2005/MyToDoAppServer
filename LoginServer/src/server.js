const express = require('express')
const app = express()
const port = 3001

const db = require('./db/mysql');

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/login-token', async(req, res) => {
  console.log(req.body);
  var test = false;
  const data = {
    id : req.body.id,
    cert : "test"
  }
  db.postLoginTest((rows) => {
    if (rows[0].pw === req.body.pw) {
      test = true;
      console.log(test);
      res.statusCode = 200;
    }else 
      res.statusCode = 400;
  }, req.body.id);

  const testEnroll = (run) => {
    console.log(run);
    // if (run) {
    //   db.enrollToken((rows)=>{
    //     console.log("enroll success!");
    //   }, req.body.id, data.cert)
    // }
  }
  testEnroll(test);
  return res.send(JSON.stringify(data));
})

app.post('/user', (req, res) => {
  console.log(req.body);
  db.signUpTest((rows) => {
    console.log(rows);
    res.status(200).send(rows);
  }, req.body.id, req.body.pw);
})
app.get('/user/:id', (req, res) => {
  db.postLoginTest((rows) => {
    if (rows === req.query.pw) {
      res.statusCode = 200;
    }else 
      res.statusCode = 400;
  }, req.params.id);
})
app.delete('/user/:id', (req, res) => {
  db.postLoginTest((rows) => {
    if (rows === req.query.pw) {
      res.statusCode = 200;
    }else 
      res.statusCode = 400;
  }, req.params.id);
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})