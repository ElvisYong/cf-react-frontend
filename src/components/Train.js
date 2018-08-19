import React from "react";
import { Button, Grid, Form, Dropdown } from "semantic-ui-react";
import UriBase from "../HostUrl";

export default class Train extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person_group_list: [],
      person_group_id: ""
    };

    this.onClickTrain = this.onClickTrain.bind(this);
    this.onClickStatus = this.onClickStatus.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
  }

  componentDidMount() {
    fetch(UriBase + "/person-group-list")
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

  async onClickTrain() {
    const response = await fetch(UriBase + "/person-group", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person_group_id: this.state.selectedGroup
      })
    });
    if (response.status === 200) {
      alert('Training');
    }
    else{
      alert('Training failed');
    }
  }

  async onClickStatus() {
    const response = await fetch(UriBase + "/status/" + this.state.selectedGroup);
    const content = await response.json();
    alert("Data training is " + content.status);
  }

  async onClickDelete() {
    const reposne = await fetch(UriBase + "/status", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person_group_id: this.state.selectedGroup
      })
    });
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column centered>
          <Form>
            <label>Select person group</label>
            <Form.Field>
              <Dropdown
                placeholder="Select person group"
                search
                selection
                name="selectedPerson"
                options={this.state.person_group_list}
                value={this.state.selectedGroup}
                onChange={(event, data) => {
                  this.setState({
                    selectedGroup: data.value
                  });
                }}
              />
            </Form.Field>
            <Button onClick={this.onClickTrain} color="teal">
              Train
            </Button>
            <Button onClick={this.onClickStatus} color="green">
              Status
            </Button>
            <Button onClick={this.onClickDelete} color="red">
              Delete
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
