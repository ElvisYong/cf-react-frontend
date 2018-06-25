import React from "react";
import UriBase from "../HostUrl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Dropdown, Grid } from "semantic-ui-react";

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      person_group_list: [],
      person_group_id: "",
      data: []
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
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
  async onChangeHandler(event, data) {
    await this.setState({
      person_group_id: data.value
    });

    const response = await fetch(
      UriBase + "/graph/" + this.state.person_group_id
    );

    response.json().then(responseData => {
      this.setState({
        data: responseData
      });
    });
  }

  render() {
    return (
      <Grid centerd columns={2}>
        <Grid.Column centerd>
          <label>Select person group</label>
          <Dropdown
            placeholder="Select person group"
            search
            selection
            fluid
            options={this.state.person_group_list}
            value={this.state.person_group_id}
            onChange={this.onChangeHandler}
          />
        </Grid.Column>
        <Grid.Column>
          <BarChart
            width={600}
            height={300}
            data={this.state.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="registered_faces" />
          </BarChart>
        </Grid.Column>
      </Grid>
    );
  }
}
