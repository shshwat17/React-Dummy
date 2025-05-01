import React, { forwardRef, useEffect, useImperativeHandle } from "react";

export default forwardRef(function ChildRef(props, ref) {
  useImperativeHandle(ref, () => ({
    handleColorChange: () => {
      return "pink";
    },
  }));

  return <></>;
});
