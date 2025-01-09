// # INIT EXPRESS
const express = require("express");
const cors = require("cors");
const app = express();

// # MIDDLEWARES IMPORTS
const errorsHandler = require("./middlewares/errorHandler");
const notFound = require("./middlewares/notFound");

// # ROUTER INPORT
const postsRouter = require("./routers/postsRouter");

// # DOTENV CONFIG
require("dotenv").config();

// # DOTENV PROCESS DATA
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;

// # CORS
app.use(cors());

// # JSON PARSER FOR BODY REQUEST
app.use(express.json());

// # PUBLIC STATIC ASSETS
app.use(express.static("public"));

// # EXPRESS ROUTING
app.use("/posts", postsRouter);

// # HOMEPAGE
app.get("/", (req, res) => {
  res.send(`<h1>SERVER DEL MIO BLOG</h1>`);
});

// # HANDLING ERRORS
app.use(errorsHandler);
app.use(notFound);

// # SERVER LISTENING
app.listen(port, () => {
  console.log(`App listening at ${domain}:${port}`);
});
