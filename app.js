const express = require("express");
const postBank = require("./postBank");
const {postList} = require("./views/postList");
// const {postDetails} = require("./views/postDetails"); couldn't figure this guy out
const app = express();
const morgan = require("morgan");
var timeAgo = require('node-time-ago');
var html = require("html-template-tag");

app.use(morgan('dev'));

app.use(express.static('public'));

// app.get("/", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  res.send(postList(posts));
  });

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const singlePostRoute = 
    `<div class='news-item'>
        <p>
          </span>${post.title}
          <small>(by ${post.name})</small>
        </p>
        <p>
          ${post.content} <br>
          <small>${timeAgo(post.date)}</small>
        </p>
      </div>`
      if (!post.id) {
        // If the post wasn't found, just throw an error
        throw new Error('Not Found')
      }
      res.send(`<!DOCTYPE html>
      <html>
      <head>
        <title>Wizard News</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div class="news-list">
          <header><img src="/logo.png"/>Wizard News</header>
          ${singlePostRoute}
        </div>
      </body>
    </html>`);
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(404).send(html `<!DOCTYPE html>
    <html>
    <head>
      <title>Wizard News</title>
      <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
      <div class="error">
       <h1 class="errortTitle">PAGE NOT FOUND</h1>
       <img src="https://media3.giphy.com/media/5ftsmLIqktHQA/giphy.gif" />
       <p>Ah ah ah, you didn't say the magic words.</p>
      </div>
    </body>
  </html>`);
  })


  const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
