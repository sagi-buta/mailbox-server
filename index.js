require("dotenv").config();
require("./DL/dbConnect").connect();
const express = require("express");
const app = express();
const PORT = 7000;

app.use(express.json());
app.use(require("cors")());

const mainrouter = require("./ROUTERS/mainrouter.router");
mainrouter(app);

app.listen(PORT, () => console.log(` Server is listening on ${PORT}`));
