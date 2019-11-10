import React from 'react';
import ReactDOM from 'react-dom';
import { connectRoutes } from 'redux-first-router';
// @ts-ignore
import { createHashHistory } from 'rudy-history';
import { combineReducers, applyMiddleware, compose as reduxCompose, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { restoreLocation, startPersistingLocation } from './util/standalone';
import appReducer from './redux/reducer';
import App from './app';
import routes from './routes';
import * as serviceWorker from './serviceWorker';
import './index.css';

restoreLocation();

const router: any = connectRoutes(routes, {
  createHistory: createHashHistory
});

startPersistingLocation(router.history);

const rootReducer = combineReducers({location: router.reducer, app: appReducer});
const middlewares = applyMiddleware(ReduxThunk, router.middleware);

// @ts-ignore
const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose;
const store = createStore(rootReducer, compose(router.enhancer, middlewares));

const components = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(components, document.getElementById('root'));

const unsubscribe = store.subscribe(() => {
  if (store.getState().app.initialLoadingDone) {
    hideAppLoader();
    unsubscribe();
  }
});

function hideAppLoader () {
  const loader = document.getElementById('loader');
  if (!loader) {
    throw new Error('Loader element missing in DOM');
  }
  loader.classList.add('hidden');
  setTimeout(() => {
    loader.style.display = 'none';
  }, 500);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
