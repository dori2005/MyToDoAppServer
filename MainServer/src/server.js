import express from "express";
import dotenv from "dotenv"

import todosRoutes from "./routes/todos.js";
import loginRoutes from "./routes/accont.js";

dotenv.config();

const app = express();
const port = 3000;

app.use('/todos', todosRoutes);
app.use('/login', loginRoutes);

console.log(process.env.TEST);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  });