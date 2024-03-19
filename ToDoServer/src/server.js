const express = require('express')
const app = express()
const port = 3000

const db = require('./db/mysql');

app.use(express.json());
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:8081', 'http://localhost:19006']
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', async(req, res) => {
  const params = {
    Token : req.query.token,
  };
  const queryString = new URLSearchParams(params).toString();
  
  console.log(queryString);

  await fetch('http://localhost:3001/login-token',{
    method: "GET"
  })
  .then((response) => {
    if (response.status === 200)
      return response.json();
  }).then((data) => {
    user_id = data[0];
    console.error(data[0]);
  })
  .catch((error) => {
    console.error('Error message:', error.message);
  })

  // db.getAllTest((rows) => {
  //   console.log(rows);
  //   res.json(rows);
  // });
})

app.post('/test2', (req, res) => {
  console.log("call post");
  Object.keys(req.body).forEach((time)=> {
    db.postTest((rows) => {
      res.statusCode = 200;
    }, time, req.body[time]);
  });
  res.send('test pass');
})

app.patch('/test2', (req, res) => {
  console.log("call patch");
  Object.keys(req.body).forEach((time)=> {
    db.patchTest((rows) => {
      console.log(rows);
      res.statusCode = 200;
    }, time, req.body[time].text, req.body[time].complete);
  });
  res.send('test pass');
});

app.delete('/test2', (req, res) => {
  console.log(req.body);
  Object.keys(req.body).forEach((time)=> {
    db.deleteTest((rows) => {
      console.log(rows);
      res.statusCode = 200;
    }, time);
  });
  res.send('test pass');
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})