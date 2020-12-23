import React, {Component} from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from './containers/Main/Main';
import classes from './App.module.css';

class App extends Component {
  render () {
    return (
      <div className={classes.App}>
        <Navbar/>
        <Main/>
      </div>
    );
  }
}

export default App;