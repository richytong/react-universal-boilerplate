import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import Helmet from 'react-helmet';
import routes from './routes';
import Layout from './components/Layout';
import createStore, { initializeSession } from './store';

const app = express();

app.use(express.static(path.resolve(__dirname, '../dist')));

app.get('/*', async (req, res) => {
  const context = {};
  const store = createStore();

  store.dispatch(initializeSession());

  const dataFetchDispatchToStorePromises = routes.reduce((memo = [], route) => {
    const match = matchPath(req.url, route);
    if (match && route.component.dataFetch) {
      return [...memo, store.dispatch(route.component.dataFetch(match.params))];
    }
    return memo;
  }, []);

  await Promise.all(dataFetchDispatchToStorePromises);

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

  res.writeHead(200, { 'Content-Type': 'text/html' });
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
