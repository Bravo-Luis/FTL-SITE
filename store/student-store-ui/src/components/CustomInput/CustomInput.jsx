import * as React from "react";
import "./CustomInput.css"

export default function CustomInput({ type = "text", placeholder, onChange, title = "" }) {
    return (
      <>
        <h2 className="button-title"> {title} </h2>
        <input
          className="custom-input"
          type={type}
          alt={title + " input"}
          placeholder={placeholder}
          onChange={onChange}
        />
      </>
    );
  }