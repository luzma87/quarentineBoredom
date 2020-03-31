import React from "react";
import ChartWrapper from "./ChartWrapper";

const D3DemoPage = () => (
  <div>
    <div style={{ background: "slateblue", padding: 8, fontSize: "1.5em" }}>
      Barchartly
    </div>
    <div style={{ padding: 32 }}>
      <ChartWrapper />
    </div>
  </div>
);

export default D3DemoPage;
