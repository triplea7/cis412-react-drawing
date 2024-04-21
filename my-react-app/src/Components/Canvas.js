import React, { useRef, useEffect, useState } from "react";

function Canvas({ color, size }) {
  const canvasRef = useRef(null);
  const [mouseDown, setMouseDown] = useState(false);
  let context = null;

  useEffect(() => {
    const canvas = canvasRef.current;
    context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = color;
    context.lineWidth = size;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    context.scale(rect.width / canvas.width, rect.height / canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = size;

    const startMouseDown = (e) => {
      const { offsetX, offsetY } = e;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
      setMouseDown(true);
    };

    const drawing = (e) => {
      if (!mouseDown) {
        return;
      }
      const { offsetX, offsetY } = e;
      context.lineTo(offsetX, offsetY);
      context.stroke();
    };

    const mouseUp = () => {
      context.closePath();
      setMouseDown(false);
    };

    canvas.addEventListener("mousedown", startMouseDown);
    canvas.addEventListener("mousemove", drawing);
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mouseout", mouseUp);

    return () => {
      canvas.removeEventListener("mousedown", startMouseDown);
      canvas.removeEventListener("mousemove", drawing);
      canvas.removeEventListener("mouseup", mouseUp);
      canvas.removeEventListener("mouseout", mouseUp);
    };
  }, [mouseDown, color, size]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <>
      <canvas ref={canvasRef} />
      <button onClick={clearCanvas}>Clear</button>
    </>
  );
}

export default Canvas;
