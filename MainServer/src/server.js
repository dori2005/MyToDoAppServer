const express = require("express");
const app = express();
const port = 3000;

const todosRoutes = require("./routes/todos");
const loginRoutes = require("./routes/login");

app.use('/todos', todosRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  })