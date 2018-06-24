import React from "react";
import { Button, Grid, Form, Dropdown, Divider } from "semantic-ui-react";
import EditText from "./EditText";

const RenderImage = props => {
  if (!props.show) {
    return null;
  }
  return <img src={props.url} />;
};

export default class Face extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person_group_list: [],
      person_group_id: "",
      showImage: false,
      imageUrl: ""
    };

    this.onClickHandler = this.onClickHandler.bind(this);
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

  async onClickHandler() {
    const response = await fetch("http://127.0.0.1:5000/face", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person_group_id: this.state.person_group_id
      })
    });

    const content = await response.json();
    console.log(content);
    if (content) {
      alert("Picture taken, you are: " + content.name);
      this.setState({
        imageUrl: content.imageUrl,
        showImage: true
      });
    }
    alert("Something went wrong");
  }

  render() {
    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Form>
            <Form.Field>
              <label>Select person group</label>
              <Dropdown
                placeholder="Select person group"
                search
                selection
                fluid
                options={this.state.person_group_list}
                value={this.state.person_group_id}
                onChange={(event, data) => {
                  this.setState({
                    person_group_id: data.value
                  });
                }}
              />
            </Form.Field>
            <Form.Field>
              <Button color="teal" onClick={this.onClickHandler}>
                TAKE PHOTO
              </Button>
            </Form.Field>
          </Form>
          <Divider/>
          <Form>
            <Form.Field>
              <label>Edit the lcd</label>
              <EditText/>
            </Form.Field>
          </Form>
          <RenderImage show={this.state.showImage} url={this.state.imageUrl} />
        </Grid.Column>
      </Grid>
    );
  }
}
