import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {Container} from '../src/components/Grid'
import Main from './pages/Main';
import Saved from './pages/Saved';
import Nav from '../src/components/Nav';

const App = () => (
  <Router>
    <div>
      <Nav />
      <Container >
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/saved" component={Saved} />
        </Switch>
      </Container>
    </div>
  </Router>
);

export default App;