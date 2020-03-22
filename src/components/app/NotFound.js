import React from "react";
import CustomIcon from "../_common/CustomIcon";

const NotFound = () => (
  <div className="full-screen">
    <div style={{ marginBottom: 32, fontSize: "3em" }}>Not found</div>
    <div>
      <CustomIcon icon={["fad", "ghost"]} size="6x" />
    </div>
  </div>
);

export default NotFound;
