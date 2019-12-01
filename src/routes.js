import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';
import Info from './pages/Info';

export default function Routes() {

  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component ={ Main } />
        <Route path="/repository/:repository" component ={Repository} />
        <Route path="/info" component ={Info} />
      </Switch>
    </BrowserRouter>
  );
}
