import { json } from "d3";
import React, { useEffect, useState } from "react";
import ChartWrapper from "./ChartWrapper";
import Table from "./Table";

const D3Demo2Page = () => {
  const [data, setData] = useState([]);
  const [activeName, setActiveName] = useState(null);

  useEffect(() => {
    json("https://udemy-react-d3.firebaseio.com/children.json")
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onUpdateData = (newData) => setData(newData);

  const onUpdateName = (newActiveName) => setActiveName(newActiveName);

  return (
    <div>
      <div style={{ background: "slateblue", padding: 8, fontSize: "1.5em" }}>
        Scatterplotly
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 2fr",
          gridGap: 16,
          padding: 16,
        }}
      >
        <div
          style={{
            border: "solid 2px #999",
            padding: 8,
            borderRadius: 8,
          }}
        >
          Chart here
          {!data || data.length === 0 ? (
            "No data :("
          ) : (
            <ChartWrapper
              data={data}
              onUpdateName={(newName) => onUpdateName(newName)}
            />
          )}
        </div>
        <Table
          data={data}
          activeName={activeName}
          onUpdateData={(newData) => onUpdateData(newData)}
        />
      </div>
    </div>
  );
};

export default D3Demo2Page;
