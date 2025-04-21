import React, { memo } from "react";
import "./progressBar.css";
const ProgressBar = (props = {}) => {
  const { progress } = props;
  return (
    <div className="progressBar">
      <div
        style={{
          ...(progress > 0 && {
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "green",
            borderRadius: "500px",
          }),
        }}
      />
    </div>
  );
};

export default memo(ProgressBar);
