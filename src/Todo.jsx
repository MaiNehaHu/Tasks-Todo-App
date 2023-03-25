import React from "react";
import "./Todo.css";
const Todo = ({ todo, toggleTask }) => {
  /**input radio handling */
  function handleToggle() {
    toggleTask(todo.id);
  }
  return (
    <div id="tasks-todo">
      <label>
        <div id="name">{todo.name}</div>

        <input
          className="radio"
          type="checkbox"
          checked={todo.complete}
          onChange={handleToggle}
          class="larger"
        ></input>
      </label>
    </div>
  );
};

export default Todo;
