import { json } from "d3";
import React, { useEffect, useState } from "react";
import ChartWrapper from "./ChartWrapper";

const D3Demo2Page = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then(res => {
        setData(res);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      <div style={{ background: "slateblue", padding: 8, fontSize: "1.5em" }}>
        Scatterplotly
      </div>
      <div
        style={{
          background: "pink",
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gridGap: 16,
          padding: 16
        }}
      >
        <div style={{ background: "red" }}>
          Chart here
          {data.length > 0 ? <ChartWrapper data={data} /> : "No data yet"}
        </div>
        <div style={{ background: "hotpink" }}>Table Here</div>
      </div>
    </div>
  );
};

export default D3Demo2Page;
