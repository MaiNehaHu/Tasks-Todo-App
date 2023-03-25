import React from "react";
import Todo from "./Todo";

const TodoList = ({todo,toggleTask}) => {
  return (
    todo.map(task=>{
      return <Todo key={task.id} todo={task} toggleTask={toggleTask} />
    })
  );
};

export default TodoList;
