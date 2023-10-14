import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListWithDetails from './components/ListWithDetails';
import LogIn from './components/LogIn';
import './App.css';
import DataList from './components/DataList';
import React from 'react';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" exact component={LogIn} />
        <Route path="/data-list" component={ListWithDetails} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
