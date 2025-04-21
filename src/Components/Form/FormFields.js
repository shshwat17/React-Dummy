import React, { memo, useCallback, useState } from "react";
import "./formFields.css";
const FormFields = () => {
  const [fieldRow, setFieldRow] = useState([{ id: 1, val: "" }]);

  const remove = useCallback((id) => {
    setFieldRow((prev) => prev?.filter((val) => val?.id != id));
  }, []);

  const add = useCallback(() => {
    setFieldRow((prev) => [...prev, { id: prev?.length + 1, val: "" }]);
  }, []);

  const handleChange = useCallback(({ event, id }) => {
    setFieldRow((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, val: event.target.value } : item
      )
    );
  }, []);
  return (
    <div className="container">
      {fieldRow?.map((val) => (
        <div className="fieldRow" key={val?.id}>
          <input
            type="text"
            onChange={(event) => handleChange({ event, id: val?.id })}
            value={val?.val}
          />
          <button onClick={() => remove(val?.id)}>Remove</button>
        </div>
      ))}
      <button onClick={add}>Add Input</button>
      <button>Submit</button>
    </div>
  );
};
export default memo(FormFields);
