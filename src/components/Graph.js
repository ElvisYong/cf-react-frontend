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

export default class Graph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch(UriBase + "/graph")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          data: data
        });
      });
  }

  render() {
    return (
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
    );
  }
}
