import React from 'react';

function setCommunityData(state, communityData) {
  let newState = Object.assign({}, state, {communityData});
  return newState;
}

function setUsersActivityData(state, usersActivityData) {
  let newState = Object.assign({}, state, {usersActivityData});
  return newState;
}

export default function staticReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_COMMUNITY_DATA':
      return setCommunityData(state, action.communityData);
    case 'SET_USERS_ACTIVITY_DATA':
      return setUsersActivityData(state, action.usersActivityData);
    default:
      return state;
  }
}
