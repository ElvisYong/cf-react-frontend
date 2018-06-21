import React from "react";
import {
  Grid,
  Input,
  Dropdown,
  Form,
  Button,
  Label,
  Container,
  Segment
} from "semantic-ui-react";

export default class Person extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person_group_list: [],
      person_list: [],
      person_group_id: "",
      personName: "",
      person_id_create: "",
      person_id_delete: "",
      selectedFile: null
    };

    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.createPersonHandler = this.createPersonHandler.bind(this);
    this.handlePersonGroupChange = this.handlePersonGroupChange.bind(this);
    this.deletePersonHandler = this.deletePersonHandler.bind(this);
  }

  componentDidMount() {
    fetch("http://127.0.0.1:5000/person_group_list")
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
  async handlePersonGroupChange(event, data) {
    await this.setState({ person_group_id: data.value });

    const response = await fetch(
      "http://127.0.0.1:5000/person_list/" + this.state.person_group_id
    );
    response.json().then(responseData => {
      let list = new Array();
      responseData.forEach(obj => {
        let text = obj.name;
        let value = obj.personId;
        list.push({ text: text, value: value });
      });
      this.setState({
        person_list: list
      });
    });
  }

  async createPersonHandler(event) {
    const response = await fetch("http://127.0.0.1:5000/person", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person_group_id: this.state.person_group_id,
        name: this.state.personName
      })
    });
    const content = await response.json();
    if (content) {
      alert("Created, your id is " + content.personId);
    }
  }

  fileChangedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.value
    });
  };

  async fileUploadHandler(event) {
    let fileName = this.state.selectedFile.name.replace(/\.[^/.]+$/, "");

    let formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append("fileName", fileName);
    formData.append("person_group_id", this.state.person_group_id);
    formData.append("person_id", this.state.person_id_create);

    const response = await fetch("http://127.0.0.1:5000/person", {
      method: "POST",
      body: formData
    });
    const content = await response.json();
    if (content) {
      alert("Uploaded image");
    }
  }

  async deletePersonHandler(event) {
    const response = await fetch("http://127.0.0.1:5000/person", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person_group_id: this.state.person_group_id,
        person_id: this.state.person_id_delete
      })
    });
    const content = await response.json();
    if (content) {
      alert("Deleted person");
    }
  }

  render() {
    return (
      <Grid centered columns={1}>
        <div>
          <Grid.Row>
            <Dropdown
              placeholder="Select person group"
              search
              selection
              fluid
              options={this.state.person_group_list}
              value={this.state.person_group_id}
              onChange={this.handlePersonGroupChange}
            />
          </Grid.Row>
          <Grid.Row>
            <Input
              label="Create person name"
              type="text"
              fluid
              value={this.state.personName}
              onChange={event => {
                this.setState({ personName: event.target.value });
              }}
              action={{
                content: "Create",
                color: "teal",
                onClick: this.createPersonHandler
              }}
            />
          </Grid.Row>
          <Grid.Row>
            <Dropdown
              placeholder="Select person for upload"
              search
              selection
              fluid
              options={this.state.person_list}
              value={this.state.person_id_create}
              onChange={(event, data) => {
                this.setState({ person_id_create: data.value });
              }}
            />
          </Grid.Row>

          <Grid.Row>
            <Input
              label="Upload photo"
              type="file"
              fluid
              onChange={this.fileChangedHandler}
              action={{
                content: "Upload",
                color: "teal",
                onClick: this.fileUploadHandler
              }}
            />
          </Grid.Row>

          <Grid.Row>
            <Dropdown
              placeholder="Select person for delete"
              search
              selection
              fluid
              options={this.state.person_list}
              value={this.state.person_id_delete}
              onChange={(event, data) => {
                this.setState({ person_id_delete: data.value });
              }}
            />
          </Grid.Row>
          <Button color="red" onClick={this.deletePersonHandler}>
            Delete person
          </Button>
        </div>
      </Grid>
    );
  }
}