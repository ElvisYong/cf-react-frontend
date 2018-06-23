import React from "react";
import {
  Grid,
  Input,
  Form,
  Dropdown,
  Button,
  Divider
} from "semantic-ui-react";

export default class Person extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person_group_list: [],
      person_group_id_create: "",
      person_group_id_upload: "",
      person_group_id_delete: "",
      personName: "",
      person_id_upload: "",
      person_id_delete: "",
      selectedFile: null,
      person_list: []
    };

    this.fileUploadHandler = this.fileUploadHandler.bind(this);
    this.piCamUploadHandler = this.piCamUploadHandler.bind(this);
    // this.multipleFileUploadHandler = this.multipleFileUploadHandler.bind(this);
    this.createPersonHandler = this.createPersonHandler.bind(this);
    this.deletePersonHandler = this.deletePersonHandler.bind(this);
    this.uploadPersonGroupChangeHandler = this.uploadPersonGroupChangeHandler.bind(
      this
    );
    this.deletePersonGroupChangeHandler = this.deletePersonGroupChangeHandler.bind(
      this
    );
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

  async deletePersonGroupChangeHandler(event, data) {
    await this.setState({ person_group_id_delete: data.value });

    const response = await fetch(
      "http://127.0.0.1:5000/person_list/" + this.state.person_group_id_delete
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

  async uploadPersonGroupChangeHandler(event, data) {
    await this.setState({ person_group_id_upload: data.value });

    const response = await fetch(
      "http://127.0.0.1:5000/person_list/" + this.state.person_group_id_upload
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
        person_group_id: this.state.person_group_id_create,
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

  async fileUploadHandler() {
    let fileName = this.state.selectedFile.name.replace(/\.[^/.]+$/, "");

    let formData = new FormData();
    formData.append("file", this.state.selectedFile);
    formData.append("fileName", fileName);
    formData.append("person_group_id", this.state.person_group_id_upload);
    formData.append("person_id", this.state.person_id_upload);

    const response = await fetch("http://127.0.0.1:5000/person", {
      method: "POST",
      body: formData
    });
    const content = await response.json();
    alert(content);
  }

  async piCamUploadHandler() {
    let formData = new FormData();
    formData.append("person_group_id", this.state.person_group_id_upload);
    formData.append("person_id", this.state.person_id_create);

    const response = await fetch("http://127.0.0.1:5000/face_pi", {
      method: "POST",
      body: formData
    });
    const content = await response.json();
    alert(content);
  }

  // upload directory if theres time
  // async multipleFileUploadHandler(event) {
  //   let formData = new FormData();

  //   formData.append("files[]", this.state.selectedFile);
  //   formData.append("person_group_id", this.state.person_group_id_upload);
  //   formData.append("person_id", this.state.person_id_create);
  // }

  async deletePersonHandler(event) {
    const response = await fetch("http://127.0.0.1:5000/person", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person_group_id: this.state.person_group_id_delete,
        person_id: this.state.person_id_delete
      })
    });
    const content = await response.json();
    return content;
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column centered>
          <Form>
            <label>Create person</label>
            <Form.Field>
              <Dropdown
                placeholder="Select person group"
                search
                selection
                fluid
                options={this.state.person_group_list}
                value={this.state.person_group_id_create}
                onChange={(event, data) => {
                  this.setState({
                    person_group_id_create: data.value
                  });
                }}
              />
            </Form.Field>
            <Form.Field>
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
            </Form.Field>
          </Form>
          <Divider />
          <Form>
            <label>Select person for upload</label>
            <Form.Field>
              <Dropdown
                placeholder="Select person group"
                search
                selection
                fluid
                options={this.state.person_group_list}
                value={this.state.person_group_id_upload}
                onChange={this.uploadPersonGroupChangeHandler}
              />
            </Form.Field>
            <Form.Field>
              <Dropdown
                placeholder="Select person for upload"
                search
                selection
                fluid
                options={this.state.person_list}
                value={this.state.person_id_upload}
                onChange={(event, data) => {
                  this.setState({ person_id_upload: data.value });
                }}
              />
            </Form.Field>
            <Form.Field>
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
            </Form.Field>
            <Form.Field>
              <label>Click this take photo using picam and upload</label>
              <Button onClick={this.piCamUploadHandler} color="teal">
                TAKE PHOTO
              </Button>
            </Form.Field>
            {/* Will do upload directory if there's time */}
            {/* <Form.Field>
              <input
                label="Upload directory"
                type="file"
                fluid
                webkitdirectory
                directory
                multiple
                onChange={this.fileChangedHandler}
                action={{
                  content: "Upload",
                  color: "teal",
                  onClick: this.multipleFileUploadHandler
                }}
              />
            </Form.Field> */}
          </Form>
          <Divider />
          <Form>
            <label>Delete person</label>
            <Form.Field>
              <Dropdown
                placeholder="Select person group"
                search
                selection
                fluid
                options={this.state.person_group_list}
                value={this.state.person_group_id_delete}
                onChange={this.deletePersonGroupChangeHandler}
              />
            </Form.Field>
            <Form.Field>
              <label>Select person for delete</label>
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
            </Form.Field>
            <Button color="red" onClick={this.deletePersonHandler}>
              Delete person
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
