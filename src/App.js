import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import $ from 'jquery';
import First from './components/first/First';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div>
          <First source="https://api.github.com/users/octocat/gists"/>
        </div>

      </div>
    );
  }

//   getInitialState() {
//   return {
//     username: ''
//   };
// }

//   componentDidMount() {
//     this.serverRequest = $.get("http://jsonplaceholder.typicode.com/users", function (result) {
//       var username = result[0].name;
//     this.setState({
//       username: username
//     });
//   });
// }

}
export default App;
