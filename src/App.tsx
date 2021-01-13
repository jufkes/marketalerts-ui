import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import MarketScanner from './page/MarketScanner';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={MarketScanner} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
