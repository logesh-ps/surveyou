import React from "react";

function Field({ input, label, meta: { error, touched } }) {
  return (
    <div>
      <label>{label}</label>
      <input style={{ marginBottom: "5px" }} {...input} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
}

export default Field;
