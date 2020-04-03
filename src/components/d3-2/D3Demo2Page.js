import { json } from "d3";
import React, { useEffect, useState } from "react";
import ChartWrapper from "./ChartWrapper";
import Table from "./Table";

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

  const onUpdateData = newData => {
    setData(newData);
  };

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
          {!data || data.length === 0 ? (
            "No data :("
          ) : (
            <ChartWrapper data={data} />
          )}
        </div>
        <div style={{ background: "hotpink" }}>
          <Table data={data} onUpdateData={newData => onUpdateData(newData)} />
        </div>
      </div>
    </div>
  );
};

export default D3Demo2Page;
