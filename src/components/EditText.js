import React from "react";
import { Input } from "semantic-ui-react";
import UriBase from "../HostUrl";

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

    let formData = new FormData();
    formData.append("text", this.state.text);

    const response = await fetch(UriBase + "/lcd", {
      method: "POST",
      body: formData
    });
  }

  render() {
    return <Input value={this.state.text} onChange={this.handleInputChange} />;
  }
}
