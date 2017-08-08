import React from 'react';
import { Route, Redirect } from 'react-router';
import Top from './containers/Top';
import List from './containers/List';

export default (
  <Route>
    <Route path="/" component={Top} />
    <Route path="/list" component={List} />
    <Route path="/list/:yearmonth" component={List} />
  </Route>
)
