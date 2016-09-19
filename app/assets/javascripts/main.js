'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
//HOME
import CommunityDataContainer from './containers/home/CommunityDataContainer';
import UsersActivityDataContainer from './containers/home/UsersActivityDataContainer';
//SHARE
import Modal from './containers/Modal';
import OpenModal from './containers/OpenModal';
//CAMPAINGS
import CampaignsPageContainer from './containers/CampaignsPageContainer';
import CampaignsDetailPageContainer from './containers/CampaignsDetailPageContainer';
//EVENTS
import EventsPageContainer from './containers/EventsPageContainer';
import EventsDetailPageContainer from './containers/EventsDetailPageContainer';
//DOWNLOAD
import DownloadMap from './containers/home/DownloadMapContainer';
//TASK
import TasksPageContainer from './containers/TasksPageContainer';
import TasksPageDetailContainer from './containers/TasksPageDetailContainer';

/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */
const reducer = combineReducers({
  ...reducers
});

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    /* Redux dev tool, install chrome extension in
    * https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi */
    typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

$(document).ready(function () {
  if ( $('.home').length ) {
    /* Home page */
    $('#communityData').ready( function() {
      /* It always runs this callback, that's why we need to establish
      a condition to avoid issues */
      if ($('#communityData')[0]) {
        /* Community data */
        ['communityData'].map(element => {
          ReactDOM.render(
            <Provider store={store}>
              <CommunityDataContainer data={element} />
            </Provider>,
            document.getElementById(element)
          );
        });
      }
    });
  }
});

$(document).ready(function () {
  if ( $('.home').length ) {
    /* Home page */
    $('#downloads').ready( function() {
      /* It always runs this callback, that's why we need to establish
      a condition to avoid issues */
      if ($('#downloads')[0]) {
        /* Community data */
        ['downloads'].map(element => {
          ReactDOM.render(
            <Provider store={store}>
              <DownloadMap data={element} />
            </Provider>,
            document.getElementById(element)
          );
        });
      }
    });
  }
});

/*
  Please, keep this code here. We will need it in the near future, once
  we will know wich endpoint should we show here.
 */
// $('#latestActivity').ready( function() {
//   /* It always runs this callback, that's why we need to establish
//   a condition to avoid issues */
//   if ($('#latestActivity')[0]) {
//     /* Users activity data */
//     ['latestActivity'].map(element => {
//       ReactDOM.render(
//         <Provider store={store}>
//           <UsersActivityDataContainer data={element} />
//         </Provider>,
//         document.getElementById(element)
//       );
//     });
//   }
// });

$('#ranking').ready( function() {
  /* It always runs this callback, that's why we need to establish
  a condition to avoid issues */
  if ($('#ranking')[0]) {
    /* Users activity data */
    ['ranking'].map(element => {
      ReactDOM.render(
        <Provider store={store}>
          <UsersActivityDataContainer data={element} />
        </Provider>,
        document.getElementById(element)
      );
    });
  }
});

/* Breadcrumbs */
$(document).ready(function () {
  if ( $('#share-modal').length ) {
    ReactDOM.render(
      <Provider store={store}>
        <Modal/>
      </Provider>,
      document.getElementById('share-modal')
    );
  }
});

$(document).ready(function () {
  if ( $('#open-modal').length ) {
    ReactDOM.render(
      <Provider store={store}>
        <OpenModal/>
      </Provider>,
      document.getElementById('open-modal')
    );
  }
});
//
// /* Campaigns index */
// $('#campaignsIndex').ready( function() {
//   /* It always runs this callback, that's why we need to establish
//   a condition to avoid issues */
//   if ($('#campaignsIndex')[0]) {
//     /* Campaigns data */
//     ['campaignsIndex'].map( element => {
//       $('#' + element).ready( function() {
//         ReactDOM.render(
//           <Provider store={store}>
//             <CampaignsPageContainer data={{}} />
//           </Provider>,
//           document.getElementById('data-table-view')
//         );
//       });
//     });
//   }
// });
//
// /* Campaigns detail */
// $('#campaignsDetail').ready( function() {
//   /* It always runs this callback, that's why we need to establish
//   a condition to avoid issues */
//   if ($('#campaignsDetail')[0]) {
//     /* Campaigns data */
//     ['campaignsDetail'].map( element => {
//       $('#' + element).ready( function() {
//         ReactDOM.render(
//           <Provider store={store}>
//             <CampaignsDetailPageContainer data={{}} />
//           </Provider>,
//           document.getElementById('data-table-view')
//         );
//       });
//     });
//   }
// });

// /* Mapathon page */
// $('#eventsIndex').ready( function() {
//   /* It always runs this callback, that's why we need to establish
//   a condition to avoid issues */
//   if ($('#eventsIndex')[0]) {
//
//     /* Campaigns data */
//     ['eventsIndex'].map( element => {
//       $('#' + element).ready( function() {
//         ReactDOM.render(
//           <Provider store={store}>
//             <EventsPageContainer data={{}} />
//           </Provider>,
//           document.getElementById('data-table-view')
//         );
//       });
//     });
//   }
// });

/* Events detail */
$('#eventsDetail').ready( function() {
  /* It always runs this callback, that's why we need to establish
  a condition to avoid issues */
  if ($('#eventsDetail')[0]) {

    /* Campaigns data */
    ['eventsIndex'].map( element => {
      $('#' + element).ready( function() {
        ReactDOM.render(
          <Provider store={store}>
            <EventsDetailPageContainer data={{}} />
          </Provider>,
          document.getElementById('data-table-view')
        );
      });
    });
  }
});

/* Tasks page */
$('#tasksIndex').ready( function() {
  /* It always runs this callback, that's why we need to establish
  a condition to avoid issues */
  if ($('#tasksIndex')[0]) {

    /* Campaigns data */
    ['tasksIndex'].map( element => {
      $('#' + element).ready( function() {
        ReactDOM.render(
          <Provider store={store}>
            <TasksPageContainer data={{}} />
          </Provider>,
          document.getElementById('data-table-view')
        );
      });
    });
  }
});

/* Tasks detail */
$('#tasksDetail').ready( function() {
  /* It always runs this callback, that's why we need to establish
  a condition to avoid issues */
  if ($('#tasksDetail')[0]) {

    /* Campaigns data */
    ['tasksDetail'].map( element => {
      $('#' + element).ready( function() {
        ReactDOM.render(
          <Provider store={store}>
            <TasksPageDetailContainer data={{}} />
          </Provider>,
          document.getElementById('data-table-view')
        );
      });
    });
  }
});
