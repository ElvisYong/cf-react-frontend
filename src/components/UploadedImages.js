import React from "react";
import { Image, Grid } from "semantic-ui-react";
import UriBase from "../HostUrl";

export default class UploadedImages extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrls: []
    };
  }

  componentDidMount() {
    fetch(UriBase + "/all_image")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          imageUrls: data
        });
      });
  }

  render() {
    let urls = this.state.imageUrls;

    let images = urls.map(url => {
      return (
        <Grid.Column>
          <Image src={url} />
        </Grid.Column>
      );
    });

    return <Grid columns={5}>{images}</Grid>;
  }
}
