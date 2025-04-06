import React from "react";
import "./index.css";

const EachTask = ({ task }) => {
  return (
    <div className="card">
      <p>{task}</p>
      <i class="bi bi-trash3"></i>
    </div>
  );
};

export default EachTask;
