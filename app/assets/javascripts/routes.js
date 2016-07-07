import React from 'react';
import { Route, Redirect, IndexRoute } from 'react-router';
import CommunityDataContainer from './containers/static/CommunityDataContainer';

export default () => (
    <Route path="/"  component={CommunityDataContainer}>
        <Redirect path="*" to="/" />
    </Route>
);
