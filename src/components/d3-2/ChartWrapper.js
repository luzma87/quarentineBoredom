import React, { Component } from "react";
import D3Chart from "./D3Chart";

export default class ChartWrapper extends Component {
  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.refs.chart, this.props.data)
    });
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.state.chart.update(nextProps.data);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <div className="chart-area" ref="chart" />;
  }
}

// import PropTypes from "prop-types";
// import React, { useEffect, useRef, useState } from "react";
// import D3Chart from "./D3Chart";

// const ChartWrapper = ({ gender }) => {
//   const [chart, setChart] = useState(null);
//   const chartDiv = useRef(null);
//   useEffect(() => {
//     if (chartDiv.current) {
//       setChart(new D3Chart(chartDiv.current));
//     }
//   }, []);

//   if (chart) chart.update(gender);

//   return <div ref={chartDiv} />;
// };

// ChartWrapper.propTypes = {
//   gender: PropTypes.oneOf(["men", "women"]).isRequired
// };

// export default ChartWrapper;
