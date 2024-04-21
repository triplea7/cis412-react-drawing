import React, { useState } from "react";
import Canvas from "./Components/Canvas";
import Color from "./Components/Color";
import "/Users/alyssaantonian/Desktop/cis412/cis412-react-drawing/my-react-app/src/index.css";

function App() {
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(15);

  const clickErase = () => {
    setColor("#ffffff");
  };

  return (
    <div className="app">
      <h1>Welcome to React Draw!</h1>
      <Canvas color={color} size={size} />
      <button onClick={() => clickErase()}>Erase</button>
      <div>
        Color:&nbsp;
        <Color setColor={setColor} />
        &nbsp; Pen Size:&nbsp;
        <input
          type="range"
          min="1"
          max="30"
          onChange={(e) => {
            setSize(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default App;
