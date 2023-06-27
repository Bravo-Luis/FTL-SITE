import * as React from "react";

export default function CustomInput({ type = "text", placeholder, onChange, title = "" }) {
    return (
      <>
        <h2> {title} </h2>
        <input
          type={type}
          alt={title + " input"}
          placeholder={placeholder}
          onChange={onChange}
        />
      </>
    );
  }