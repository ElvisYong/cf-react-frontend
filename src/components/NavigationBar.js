import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "person_group"
    };
  }

  handleChange = (event, { name }) => {
    this.setState({
      activeItem: name
    });
  };

  render() {
    return (
      <Menu pointing secondary>
        <Link to="/">
          <Menu.Item name="person_group" onClick={this.handleChange}>
            cf-react-frontend
          </Menu.Item>
        </Link>
        <Link to="/person_group">
          <Menu.Item
            name="person_group"
            active={this.state.activeItem === "person_group"}
            onClick={this.handleChange}
          >
            Person group
          </Menu.Item>
        </Link>
        <Link to="/person">
          <Menu.Item
            name="person"
            active={this.state.activeItem === "person"}
            onClick={this.handleChange}
          >
            Person
          </Menu.Item>
        </Link>
        <Link to="/train">
          <Menu.Item
            name="train"
            active={this.state.activeItem === "train"}
            onClick={this.handleChange}
          >
            Train
          </Menu.Item>
        </Link>
        <Link to="/face">
          <Menu.Item
            name="face"
            active={this.state.activeItem === "face"}
            onClick={this.handleChange}
          >
          Scan face
          </Menu.Item>
        </Link>
        <Link to="/uploaded_images">
          <Menu.Item
            name="image"
            active={this.state.activeItem === "image"}
            onClick={this.handleChange}
          >
          Gallery
          </Menu.Item>
        </Link>
        <Link to="/graph">
          <Menu.Item
            name="graph"
            active={this.state.activeItem === "graph"}
            onClick={this.handleChange}
          >
          Graph
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}
