const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
 
app.set('view engine', 'ejs');

const showdown = require('showdown');
showdown.setFlavor('github');
const converter = new showdown.Converter();

app.use(express.static(path.join(__dirname, 'public')));

const formatArticle = (md) => {
  if (!md) return '';
  const html = converter.makeHtml(md);
  if (!html) return '';
  return `<div class="article">${html}</div>`;
}

const formatArticlePage = (md) => {
  const article = formatArticle(md);
  const main = `<main>${article}</main>`;
  return `${main}`;
};

const formatHomePage = (md) => {
  const article = formatArticle(md);
  const main = `<main>${article}</main>`;
  return `${main}`;
};

app.get('/', (req, res) => {
  const file = path.join(__dirname, 'articles', '5-world-simulator.md');
  fs.readFile(file, (err, data) => {
    res.append('Content-Type', 'text/html');
    const text = data.toString();
    const content = formatHomePage(text);
    res.render('index', { content });
  });
});

app.get('/articles/:article', (req, res) => {
  const file = path.join(__dirname, 'articles', `${req.params.article}.md`);
  fs.readFile(file, (err, data) => {
    const text = data.toString();
    const content = formatArticlePage(text);
    res.render('index', { content });
  });
});

app.listen(process.env.PORT || 3000);
