import React, { useState } from "react";
import ChartWrapper from "./ChartWrapper";
import GenderDropdown from "./GenderDropDown";

const D3DemoPage = () => {
  const [chosenGender, setChosenGender] = useState("women");
  return (
    <div>
      <div style={{ background: "slateblue", padding: 8, fontSize: "1.5em" }}>
        Barchartly
      </div>
      <div style={{ padding: 32 }}>
        <div>
          <GenderDropdown onChange={ev => setChosenGender(ev.target.value)} />
        </div>
        <div>
          <ChartWrapper gender={chosenGender} />
        </div>
      </div>
    </div>
  );
};

export default D3DemoPage;
