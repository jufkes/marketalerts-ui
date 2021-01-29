import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import MarketScanner from './page/MarketScanner';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import ScannerAlerts from './page/ScannerAlerts';
import PriceAlerts from './page/PriceAlerts';
import ManageSymbols from "./page/ManageSymbols";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/market-scanner" />
          </Route>
          <Route path="/market-scanner" component={MarketScanner} />
          <Route path="/manage-symbols" component={ManageSymbols} />
          <Route path="/scanner-alerts" component={ScannerAlerts} />
          <Route path="/price-alerts" component={PriceAlerts} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
