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
  await db.postLoginTest((rows) => {
    if(rows.length > 0) {
      if (rows[0].pw === req.body.pw) {
        test = true;
        res.statusCode = 200;
      }else 
        res.statusCode = 400;
    }else 
      res.statusCode = 400;
  }, req.body.id);

  if (test) {
    await db.enrollToken((rows)=>{
      console.log(rows);
    }, req.body.id, data.cert)
    return res.json(data);
  }
  return res.status(400).send();
})

app.delete('/login-token', (req, res) => {
  db.deleteToken((rows) => {
    console.log(rows);
    if (rows !== undefined)
      res.statusCode = 200;
  }, req.body.id);
  return res.send();
})

app.post('/user', (req, res) => {
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
app.delete('/user', (req, res) => {
  db.postLoginTest((rows) => {
    if (rows !== undefined)
      res.statusCode = 200;
  }, req.body.id);
  return res.send("success");
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})