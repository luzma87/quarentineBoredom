import React, { Component } from "react";
import D3Chart from "./D3Chart";

export default class ChartWrapper extends Component {
  componentDidMount() {
    this.setState({ chart: new D3Chart(this.refs.chart) });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.gender);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div ref="chart" />;
  }
}
