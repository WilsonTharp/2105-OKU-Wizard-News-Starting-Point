const postBank = require("../postBank");
const timeAgo = require('node-time-ago');
var html = require("html-template-tag");


const posts= postBank.list();
const mappingPost = posts.map(post => 
  html`<div class='news-item'>
      <p>
        <span class="news-position">${post.id}. ▲</span><a href="/posts/${post.id}">${post.title}</a>
        <small>(by ${post.name})</small>
      </p>
      <small class="news-info">
        ${post.upvotes} upvotes | ${timeAgo(post.date)}
      </small>
    </div>`
  ).join('')


const postList = () => {
return ( //when I put the html tag in front of this it ruins the page? Why?
  `
 <!DOCTYPE html>
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
  }; 

  module.exports = { postList };