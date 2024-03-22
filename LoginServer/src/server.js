const express = require('express')
const { createHmac } = require('node:crypto');

const app = express()
const port = 3001

const db = require('./db/mysql');

const k = {
  nonce:0
}

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.post('/login-token', async(req, res) => {
  var test = false;
  //token 생성
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

  //로그인 성공 시 토큰 등록 및 반환.
  if (test) {
    const token = createHmac('sha256', k.nonce.toString())
                   .update(req.body.id)
                   .digest('hex');
    console.log(token);
    k.nonce++;
    await db.enrollToken((rows)=>{
      console.log(rows);
    }, req.body.id, token)
    return res.json(token);
  }
  return res.status(400).send();
})

app.delete('/login-token', (req, res) => {
  db.deleteToken((rows) => {
    console.log(rows);
    if (rows !== undefined)
      res.statusCode = 200;
  }, req.body.token);
  return res.send();
})


app.get('/user-id', (req, res) => {
  db.getUserId((rows) => {
    console.log(rows);
    if (rows !== undefined) {
      res.statusCode = 200;
      res.json(rows[0]);
    }else {
      res.statusCode = 400;
      res.json(rows);
    }
  }, req.query.token);
  return;
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