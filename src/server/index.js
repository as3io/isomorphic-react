import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import App from '../shared/App';
import { fetchPopularRepos } from '../shared/api';

const app = express();
app.use(cors());
app.use(express.static('public'));

app.get('*', (req, res, next) => {
  fetchPopularRepos().then((data) => {
    const html = renderToString(<App data={data} />);
    res.send(`
      <!DOCTYPE html>
      <html lang="en" dir="ltr">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
          <title>Isomorphic React App</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
        </head>

        <body>
          <div id="app">${html}</div>
        </body>
      </html>
    `);
  });
});

const port = process.env.PORT || 3028;
app.listen(port, () => {
  process.stdout.write(`Server listening on port ${port}.\n`);
});
