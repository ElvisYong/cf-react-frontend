import React from "react";
import { Input } from "semantic-ui-react";

export default class EditText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async handleInputChange(event) {
    await this.setState({
      text: event.target.value
    });
    console.log(this.state.text);
    const response = await fetch("http://127.0.0.1:5000/lcd", {
      method: "POST",
      "Content-Type": "application/json",
      body: {
        text: this.state.text
      }
    });
  }

  render() {
    return <Input value={this.state.text} onChange={this.handleInputChange} />;
  }
}
