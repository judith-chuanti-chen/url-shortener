import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Edit from './components/Edit';
import Result from './components/Result';
import NavBar from './components/NavBar';
import Wrapper from './components/Wrapper';
import UnknownError from './components/UnknownError';
import Footer from './components/Footer';
import List from './components/List';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <>
      <NavBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/url/:urlCode/edit" >
            <Wrapper><Edit /></Wrapper>
          </Route>
          <Route exact path="/unknown-error" component={UnknownError} />
          <Route exact path="/result" component={Result} />
          <Route exact path="/list" component={List}></Route>
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
