import React from "react";
import {
  Button,
  Grid,
  Form,
  Dropdown,
  Divider,
  Message,
  Icon
} from "semantic-ui-react";
import EditText from "./EditText";
import UriBase from "../HostUrl";

const RenderImage = props => {
  if (!props.show) {
    return null;
  }
  return <img src={props.url} />;
};

const LoadingIcon = props =>{
  if(props.isLoading){
    return <Icon name="circle notched" loading />
  }
  return null
}

const HiddenMessage = props => {
  if (!props.hidden) {
    if (props.isLoading) {
      return (
        <Message icon>
          <LoadingIcon isLoading={props.isLoading}/>
          <Message.Content>
            Hello {props.name}! Confidence level is : {props.confidence}
          </Message.Content>
        </Message>
      );
    }
  }
  return null;
};

export default class Face extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person_group_list: [],
      person_group_id: "",
      showImage: false,
      hiddenMessage: true,
      isLoading: false,
      imageUrl: "",
      confidence: ""
    };

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  componentDidMount() {
    fetch(UriBase + "/person-group-list")
      .then(response => {
        return response.json();
      })
      .then(data => {
        let list = [];
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
    await this.setState(prevState => ({
      hiddenMessage: !prevState.hiddenMessage,
      isLoading: !prevState.isLoading,
    }));
    const response = await fetch(UriBase + "/face", {
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
      this.setState(prevState => ({
        imageUrl: content.imageUrl,
        showImage: true,
        confidence: content.confidence,
        isLoading: !prevState.isLoading
      }));
    }
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
          <Divider />
          <Form>
            <Form.Field>
              <label>Edit the lcd</label>
              <EditText />
            </Form.Field>
          </Form>
          <Grid.Column>
            <HiddenMessage
              hidden={this.state.hiddenMessage}
              name={this.state.name}
              confidence={this.state.confidence}
            />
          </Grid.Column>
          <Grid.Column>
            <RenderImage
              show={this.state.showImage}
              url={this.state.imageUrl}
            />
          </Grid.Column>
        </Grid.Column>
      </Grid>
    );
  }
}
