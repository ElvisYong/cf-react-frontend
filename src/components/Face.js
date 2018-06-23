import React from "react";
import { Button } from "semantic-ui-react";

export default class Face extends React.Component{
  constructor(props){
    super(props);
    
    this.onClickHandler = this.onClickHandler.bind();
  }

  async onClickHandler(){
    alert("Taking picture...");

    const response = await fetch("http://127.0.0.1:5000/face",{
      method: "POST"
    });
    
    const content = await response.json();
    if(content){
      alert("Picture taken, you are: " + content.name);
    }
  }

  render(){
    <Button color="teal" onClick={this.onClickHandler}>
      TAKE PHOTO
    </Button>
  }
}