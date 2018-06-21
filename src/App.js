import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Person from "./components/Person";

class App extends Component {
  render() {
    return (
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
            integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"
          />
        </head>
        <div className="App">
          <NavigationBar />
          <Person />
        </div>
      </html>
    );
  }
}

export default App;
