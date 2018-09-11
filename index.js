const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const showdown = require('showdown');
showdown.setFlavor('github');
const converter = new showdown.Converter();

const contact = '<a id="contact" href="mailto:tom@ragle.io">contact</a>';
const home = '<a id="home" href="/">home</a>';
const footer = `<footer>${contact} ${home}</footer>`;
const footerHome = `<footer>${contact}</footer>`;


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const file = path.join(__dirname, 'articles', '1-my-first-computer.md');
  fs.readFile(file, (err, data) => {
    res.append('Content-Type', 'text/html');
    const styles = `<style>${fs.readFileSync(path.join(__dirname, 'styles.css')).toString()}</style>`;
    const text = data.toString();
    const html = converter.makeHtml(text);
    res.send(`${styles}${html}${footerHome}`);
  });
});

app.get('/:article', (req, res) => {
  const file = path.join(__dirname, 'articles', `${req.params.article}.md`);
  fs.readFile(file, (err, data) => {
    const styles = `<style>${fs.readFileSync(path.join(__dirname, 'styles.css')).toString()}</style>`;
    const text = data.toString();
    const html = converter.makeHtml(text);
    res.send(`${styles}${html}${footer}`);
  });
});

app.listen(3000);
