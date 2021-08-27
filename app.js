const express = require("express");
const postBank = require("./postBank");
const app = express();
const morgan = require("morgan");

app.use(morgan('dev'));

app.use(express.static('public'));

// app.get("/", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => {
  const posts = postBank.list();
  console.log(posts)
  const mappingPost = posts.map(post => 
    `<div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
          <small>(by ${post.name})</small>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
      </div>`
    ).join('')

  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${mappingPost}
    </div>
  </body>
</html>`)
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
          <small>${post.date}</small>
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
    res.status(404).send(`<!DOCTYPE html>
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


const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
