const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
  console.log(`CAPT'N Dummy Metrics listening on ${PORT}`);
});