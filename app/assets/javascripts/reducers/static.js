import React from 'react';

function setCommunityData(state, communityData) {
  const newState = Object.assign({}, state, {communityData});
  return newState;
}

function setUsersActivityData(state, usersActivityData) {
  const newState = Object.assign({}, state, {usersActivityData});
  return newState;
}

function setElementsList(state, elementsList) {
  const newState = Object.assign({}, state, {elementsList});
  return newState;
}

export default function staticReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_COMMUNITY_DATA':
      return setCommunityData(state, action.communityData);
    case 'SET_USERS_ACTIVITY_DATA':
      return setUsersActivityData(state, action.usersActivityData);
    case 'SET_ELEMENTS_LIST':
      return setElementsList(state, action.elementsList);
    default:
      return state;
  }
}
