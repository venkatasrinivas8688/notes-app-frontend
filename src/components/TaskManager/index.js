import React, { useState } from "react";
import "./index.css";
import EachTask from "../EachTask";
import Cookies from "js-cookie";

const TaskManager = () => {
  const [tasksList, setTasksList] = useState([]);
  const [task, setTask] = useState("");

  const onChangeInput = (e) => {
    setTask(e.target.value);
  };
  const onSubmitTasks = (e) => {
    e.preventDefault();

    setTasksList((prevState) => [...prevState, task]);
    Cookies.set("name", task);
    setTask("");
  };

  return (
    <div className="task-manager">
      <form onSubmit={onSubmitTasks}>
        <h1 className="heading">Task Manager</h1>
        <div className="input-elements">
          <input type="text" value={task} onChange={onChangeInput} required />
          <div className="submit-card">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </div>
      </form>
      <div className="tasks">
        {tasksList.map((eachItem) => (
          <EachTask task={eachItem} />
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
