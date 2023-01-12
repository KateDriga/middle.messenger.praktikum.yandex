const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', (_, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../dist') });
});

app.listen(PORT, function () {
  console.log(`Messenger app listening on port ${PORT}!`);
});
