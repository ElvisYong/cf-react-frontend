import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import Header from "./Header";
import Main from "./Main";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <NavigationBar />
        <Main />
      </div>
    );
  }
}

export default App;
