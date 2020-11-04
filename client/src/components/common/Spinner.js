import React from "react";
import spinner from "../../img/Spinner-1s-200px.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </div>
  );
};
