const express = require("express");
const books = require('./routes/api/books');
const app = express();
app.use('/', books);
const connectDB = require('./config/db');
const port = process.env.PORT || 3001;

connectDB();
app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

const html = `
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <section>
      Hello from Render1!
    </section>
  </body>
</html>
`
