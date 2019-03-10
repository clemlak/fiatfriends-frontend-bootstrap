import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../header';
import Footer from '../footer';
import Home from '../home';
import Payment from '../payment';
import History from '../history';
import Team from '../team';

const App = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/payment" component={Payment} />
        <Route path="/history" component={History} />
        <Route path="/team" component={Team} />
      </Switch>
      <Footer />
    </div>
  </Router>
);

export default App;
