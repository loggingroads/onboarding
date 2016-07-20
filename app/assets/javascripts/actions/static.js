import React from 'react';

export const SET_COMMUNITY_DATA = 'SET_COMMUNITY_DATA';
export const SET_USERS_ACTIVITY_DATA = 'SET_USERS_ACTIVITY_DATA';
export const SET_ELEMENTS_LIST = 'SET_ELEMENTS_LIST';

export function setCommunityData(data) {
  /* return function(dispatch) {
    $.get('url').then(function(comunnityData){
      return {
        type: SET_COMMUNITY_DATA,
        comunnityData
      }
    })
  }; */
  return {
    type: SET_COMMUNITY_DATA,
    communityData: {title: 'test', quantity: 33.2, percentage: true}
  };
}

export function setUsersActivityData(data) {
  /* return function(dispatch) {
    $.get('url').then(function(usersActivityData){
      return {
        type: SET_USERS_ACTIVITY_DATA,
        usersActivityData
      }
    })
  }; */
  return {
    type: SET_USERS_ACTIVITY_DATA,
    usersActivityData: [
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33}
    ]
  };
}

export function setElementsList(data) {
  /* return function(dispatch) {
    $.get('url').then(function(elementsList){
      return {
        type: SET_ELEMENT_LIST,
        elementsList
      }
    })
  }; */
  return {
    type: SET_ELEMENTS_LIST,
    elementsList: [
      {name: 'First', start_date: '2016-11-11', htag: ['Tag 1', 'Tag 2']},
      {name: 'Second', start_date: '2016-11-13', htag: ['Tag 1', 'Tag 3']},
      {name: 'Third', start_date: '2016-11-14', htag: ['Tag 1']},
      {name: 'Forth', start_date: '2016-11-19', htag: ['Tag 1', 'Tag 2']}
    ]
  };
}


