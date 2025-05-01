import React, { useState } from "react";
import { useRef } from "react";
import ChildRef from "./childRef";

export default function ReactForwardRef() {
  const ref = useRef(null);
  const [color, setColor] = useState("red");

  const handleClick = () => {
    if (ref?.current?.handleColorChange) {
      setColor(ref?.current?.handleColorChange());
    }
  };
  return (
    <>
      <h1>React Forward Ref</h1>
      <div style={{ backgroundColor: color }}>myColour</div>
      <button onClick={handleClick}>Change Colour</button>
      <ChildRef ref={ref} setColor={setColor} />
    </>
  );
}
