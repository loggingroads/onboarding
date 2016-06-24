'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';
import Routes from './routes';
import CommunityDataContainer from './containers/static/CommunityDataContainer';


/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const middlewareRouter = routerMiddleware(hashHistory);
const store = createStore(
  reducer,
  // The router middleware MUST be before thunk otherwise the URL changes inside
  // a thunk function won't work properly
  applyMiddleware(middlewareRouter),
  applyMiddleware(thunk)
);

/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
const history = syncHistoryWithStore(hashHistory, store);

// $('#app').ready( function() {
//   ReactDOM.render(
//     <Provider store={store}>
//       {Routes(store)}
//     </Provider>,
//     document.getElementById('app')
//   );
// });

