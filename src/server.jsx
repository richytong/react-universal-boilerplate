import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
import routes from './routes';
import Layout from './components/Layout';
import createStore from './store';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/*', async (req, res) => {
  const context = {};
  const store = createStore();

  let match;
  for (const route of routes) {
    match = matchPath(req.url, route);
    if (match) {
      if (route.component.dataFetch) {
        const params = Object.keys(match.params).length === 0 ? undefined : match.params;
        await store.dispatch(route.component.dataFetch(params));
      }
      break;
    }
  }

  const jsx = (
    <ReduxProvider store={ store }>
      <StaticRouter context={ context } location={ req.url }>
        <Layout />
      </StaticRouter>
    </ReduxProvider>
  );

  const reactDom = renderToString(jsx);
  const reduxState = store.getState();
  const helmetData = Helmet.renderStatic();
  const bundleUrl = `//${req.headers.host}/app.bundle.js`; // serving bundle from this webserver
  const statusCode = context.status || 200;

  res.writeHead(statusCode, { 'Content-Type': 'text/html' });
  return res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      ${helmetData.title.toString()}
      ${helmetData.meta.toString()}
    </head>
    
    <body>
      <div id="app">${reactDom}</div>
      <script>
        window.REDUX_DATA = ${JSON.stringify(reduxState)}
      </script>
      <script src="${bundleUrl}"></script>
    </body>
    </html>
  `);
});

app.listen(3000, () => console.log('Server started and listening on port 3000')); // eslint-disable-line no-console
