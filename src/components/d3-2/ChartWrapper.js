import PropTypes from "prop-types";
import React, { Component } from "react";
import D3Chart from "./D3Chart";

export default class ChartWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null,
    };
  }

  componentDidMount() {
    const { data, onUpdateName } = this.props;
    this.setState({
      chart: new D3Chart(this.chart, data, onUpdateName),
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { chart } = prevState;
    if (chart) {
      chart.update(nextProps.data, nextProps.activeName);
    }
    return null;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        className="chart-area"
        ref={(c) => {
          this.chart = c;
        }}
      />
    );
  }
}

// import React, { Component, memo, useEffect, useRef, useState } from "react";
// const ChartWrapper = ({ data, onUpdateName, activeName }) => {
//   const [chart, setChart] = useState(null);
//   const chartDiv = useRef(null);
//   useEffect(() => {
//     if (chartDiv.current) {
//       setChart(new D3Chart(chartDiv.current, data, onUpdateName));
//     }
//   }, [data, onUpdateName]);

//   if (chart) chart.update(data, activeName);

//   return <div ref={chartDiv} />;
// };

ChartWrapper.defaultProps = {
  activeName: "",
};

ChartWrapper.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      age: PropTypes.string.isRequired,
      height: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onUpdateName: PropTypes.func.isRequired,
  activeName: PropTypes.string,
};

// const areEqual = (prevProps, nextProps) => {
//   console.log({ prevProps, nextProps });
//   if (prevProps.data.length !== nextProps.data.length) return false;
//   if (prevProps.activeName !== nextProps.activeName) return false;
//   return true;
// };

// export default memo(ChartWrapper, areEqual);
