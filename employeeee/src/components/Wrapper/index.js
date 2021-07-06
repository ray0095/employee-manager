import React from "react";


function Wrapper(props) {
  return <div className="d-flex justify-content-around flex-wrap">{props.children}</div>;
}

export default Wrapper;