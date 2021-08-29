const postBank = require("../postBank");
const timeAgo = require('node-time-ago');
var express = require('express');
const app = express();
var html = require("html-template-tag");

//Not sure how to set this page up to work as a module. 
// Can't get anything to show up, or req is not defined 
// (I'm not sure how to pass req from app into this module).

const post = postBank.find(req.params.id);
const singlePostRoute = 
html `<div class='news-item'>
    <p>
      </span>${post.title}
      <small>(by ${post.name})</small>
    </p>
    <p>
      ${post.content} <br>
      <small>${timeAgo(post.date)}</small>
    </p>
  </div>`

const postDetails = () => { //pass in props?? I know it's not react but how do I get res/req in here?

      if (!post.id) {
        // If the post wasn't found, just throw an error
        throw new Error('Not Found')
      }
      res.send(html `<!DOCTYPE html>
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
  

  app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(404).send( html `<!DOCTYPE html>
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
}
;

module.exports = { postDetails };