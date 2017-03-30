import React from 'react';

export const SET_COMMUNITY_DATA = 'SET_COMMUNITY_DATA';
export const SET_USERS_ACTIVITY_DATA = 'SET_USERS_ACTIVITY_DATA';
export const SET_EVENTS_LIST = 'SET_EVENTS_LIST';
export const SET_GEOMS = 'SET_GEOMS';
export const SET_COUNTRIES_LIST = 'SET_COUNTRIES_LIST';
export const SET_SELECTED_COUNTRY = 'SET_SELECTED_COUNTRY';

export function setCommunityData() {
  const tag = $('#parallax').length > 0 && $('#parallax').data('hashtag') !== undefined ? $('#parallax').data('hashtag') : 'logging-roads';
  const url = 'https://loggingroads.org/hashtags/'+tag;

  return function(dispatch) {
    $.get(url).then(function(communityData){
      dispatch({
        type: SET_COMMUNITY_DATA,
        communityData
      });
    })
  };
}

export function setUsersActivityData(data) {
  const tag = $('#parallax').length > 0 && $('#parallax').data('hashtag') !== undefined ? $('#parallax').data('hashtag') : 'logging-roads';
  const url = 'https://loggingroads.org/hashtags/'+tag + '/users';

  return function(dispatch) {
    $.get(url).then(function(usersActivityData){
      dispatch({
        type:  SET_USERS_ACTIVITY_DATA,
        usersActivityData
      });
    })
  };
}

export function setGeoms(data) {
  const url = './world.geo.json';
  return function(dispatch) {
    $.get(url).then(function(geoms){
      dispatch({
        type:  SET_GEOMS,
        geoms: geoms.features
      });
    })
  };
}

export function setCountriesList(data) {
  const url = './api/v1/countries';
  return function(dispatch) {
    $.get(url).then(function(countries){
      dispatch({
        type:  SET_COUNTRIES_LIST,
        countries
      });
    })
  };
}

export function setSelectedCountry(data) {
  return function(dispatch) {
    dispatch({
      type:  SET_SELECTED_COUNTRY,
      selectedCountry: data
    });
  };
}
