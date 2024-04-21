import React from "react";

function Color({ setColor }) {
  const changeColor = (event) => {
    setColor(event.target.value);
  };

  return <input type="color" onChange={changeColor} />;
}

export default Color;
