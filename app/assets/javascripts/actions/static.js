import React from 'react';

export const SET_COMMUNITY_DATA = 'SET_COMMUNITY_DATA';
export const SET_USERS_ACTIVITY_DATA = 'SET_USERS_ACTIVITY_DATA';

export function setCommunityData(data) {
  // return function(dispatch) {
  //   $.get('url').then(function(comunnityData){
  //     return {
  //       type: SET_COMMUNITY_DATA,
  //       comunnityData
  //     }
  //   })
  // };
  return {
    type: SET_COMMUNITY_DATA,
    communityData: {title: 'test', quantity: 33.2, percentage: true}
  };
}

export function setUsersActivityData(data) {
  // return function(dispatch) {
  //   $.get('url').then(function(usersActivityData){
  //     return {
  //       type: SET_USERS_ACTIVITY_DATA,
  //       usersActivityData
  //     }
  //   })
  // };
  return {
    type: SET_USERS_ACTIVITY_DATA,
    usersActivityData: [
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33},
      {name: 'Pepi', roads: 33},
    ]
  };
}


