import React from "react";
import {
  Grid,
  Form,
  Button,
} from "semantic-ui-react";
import UriBase from "../HostUrl";

export default class PersonGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person_group_list: [],
      selectedGroup: "",
      newGroupId: "",
      newGroupName: "",
      newGroupData: ""
    };

    this.handleCreateSubmit = this.handleCreateSubmit.bind(this);
  }

  componentDidMount() {
    fetch(UriBase + "/person_group_list")
      .then(response => {
        return response.json();
      })
      .then(data => {
        let list = new Array();
        data.forEach(obj => {
          let text = obj.personGroupId;
          list.push({ text: text, value: text });
        });

        this.setState({
          person_group_list: list
        });
      });
  }

  handleInputChange = event => {
    const name = event.target.name;

    this.setState({
      [name]: event.target.value
    });
  };

  async handleCreateSubmit() {
    const response = await fetch(UriBase + "/person_group", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person_group_id: this.state.newGroupId,
        name: this.state.newGroupName,
        user_data: this.state.newGroupData
      })
    });
    const content = await response.json();
    if (content) {
      alert("Created group");
    }
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column centered>
          <Form onSubmit={this.handleCreateSubmit}>
            <Form.Field>
              <label>Person group id</label>
              <input
                name="newGroupId"
                value={this.state.newGroupId}
                onChange={this.handleInputChange}
                placeholder="Group Id"
              />
            </Form.Field>
            <Form.Field>
              <label>Group name</label>
              <input
                name="newGroupName"
                value={this.state.newGroupName}
                onChange={this.handleInputChange}
                placeholder="Group name"
              />
            </Form.Field>
            <Form.Field>
              <label>Group data (Optional)</label>
              <input
                name="newGroupData"
                value={this.state.newGroupData}
                onChange={this.handleInputChange}
                placeholder="Describe the group"
              />
            </Form.Field>
            <Button color="teal" type="submit">
              Create group
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
