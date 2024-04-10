import express from "express";
import dotenv from "dotenv"

import todosRoutes from "./routes/todos.js";
import accontRoutes from "./routes/accont.js";
dotenv.config();

const app = express();
const port = 3000;

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
app.use('/todos', todosRoutes);
app.use('/accont', accontRoutes);

console.log(process.env.TEST);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  });
  