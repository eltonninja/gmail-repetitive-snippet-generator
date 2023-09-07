const express = require("express");
const cors = require("cors");
const router = require("./route");

const app = express();

app.use(cors());

app.use(router);

app.listen(5000, () => {
  console.log(`Listening to port 5000...`);
});
