'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import CommunityDataContainer from './containers/static/CommunityDataContainer';
import UsersActivityDataContainer from './containers/static/UsersActivityDataContainer';
import DataViewContainer from './containers/static/DataViewContainer';


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

$('#parallax').ready( function() {

  ['total-roads', 'total-tagged', 'user-changes'].map(element => {
    ReactDOM.render(
      <Provider store={store}>
        <CommunityDataContainer data={element} />
      </Provider>,
      document.getElementById(element)
    );
  });

  ['ranking', 'latest-activity'].map(element => {
    ReactDOM.render(
      <Provider store={store}>
        <UsersActivityDataContainer data={element} />
      </Provider>,
      document.getElementById(element)
    );
  });
});

['campaign-main'].map( element => {
  $('#' + element).ready( function() {
    ReactDOM.render(
      <Provider store={store}>
        <DataViewContainer data={{}} />
      </Provider>,
      document.getElementById('data-view')
    );
  });
});





