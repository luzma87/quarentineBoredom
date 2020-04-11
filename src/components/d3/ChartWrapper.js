import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import D3Chart from "./D3Chart";

const ChartWrapper = ({ gender }) => {
  const [chart, setChart] = useState(null);
  const chartDiv = useRef(null);
  useEffect(() => {
    if (chartDiv.current) {
      setChart(new D3Chart(chartDiv.current));
    }
  }, []);

  if (chart) chart.update(gender);

  return <div ref={chartDiv} />;
};

ChartWrapper.propTypes = {
  gender: PropTypes.oneOf(["men", "women"]).isRequired,
};

export default ChartWrapper;
