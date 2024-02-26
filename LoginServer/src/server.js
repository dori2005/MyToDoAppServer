const express = require('express')
const app = express()
const port = 3000

const db = require('./db/mysql');

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/login-token', (req, res) => {
  console.log("call post");
  var data = {}
  db.postLoginTest((rows) => {
    if (rows === req.body.pw) {
      data = {
        id : req.body.id,
        cert : "test"
      };
      res.statusCode = 200;
    }else 
      res.statusCode = 400;
  }, req.body.id);
  db.enrollCertification((rows)=>{
    console.log("enroll success!");
  },data)
  res.send(data);
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})