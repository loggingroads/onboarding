import React from 'react';

function setCommunityData(state, communityData) {
  return Object.assign({}, state, {communityData});
}

function setGeoms(state, geoms) {
  return Object.assign({}, state, {geoms});
}

function setCountriesList(state, countries) {
  return Object.assign({}, state, {countries});
}

function setUsersActivityData(state, usersActivityData) {
  return Object.assign({}, state, {usersActivityData});
}

function setSelectedCountry(state, selectedCountry) {
  return Object.assign({}, state, {selectedCountry});
}

export default function staticReducer(state = {} , action) {
  switch (action.type) {
    case 'SET_COMMUNITY_DATA':
      return setCommunityData(state, action.communityData);
    case 'SET_GEOMS':
      return setGeoms(state, action.geoms);
    case 'SET_COUNTRIES_LIST':
      return setCountriesList(state, action.countries);
    case 'SET_SELECTED_COUNTRY':
      return setSelectedCountry(state, action.selectedCountry);
    case 'SET_USERS_ACTIVITY_DATA':
      return setUsersActivityData(state, action.usersActivityData);
    default:
      return state;
  }
}
