import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "home"
    };
  }
  handleChange = (event, { name }) => {
    this.setState({
      activeItem: name
    });
  };

  render() {
    return (
      <Router>
        <Menu pointing secondary>
          <Menu.Item name="home" active={this.state.activeItem === "home"} onClick={this.handleChange}>
            <Link to="/">cf-react-frontend</Link>
          </Menu.Item>
          <Menu.Item name="person_group" active={this.state.activeItem === "person_group"} onClick={this.handleChange}>
            <Link to="/person_group">Person group</Link>
          </Menu.Item>
          <Menu.Item name="person" active={this.state.activeItem === "person"} onClick={this.handleChange}>
            <Link to="/person">Person</Link>
          </Menu.Item>
        </Menu>
      </Router>
    );
  }
}
