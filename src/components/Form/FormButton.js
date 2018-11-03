import React from "react";

export const FormButton = props =>
  <button {...props} style={{ float: "right" }} className="btn btn-info">
    {props.children}
  </button>;