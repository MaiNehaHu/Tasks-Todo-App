import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

const LOCAL_STORAGE_KEY = "tasks"; /**key name*/

const getItems = () => {
  let list =
    localStorage.getItem(
      "tasks"
    ); /**With the helpof keyname we are getting the list */
  console.log(list);
  if (list) {
    return JSON.parse(localStorage.getItem("tasks"));
  } else {
    return [];
  }
};

function App() {
  const [tasks, setTasks] = useState(getItems());
  const todoRef = useRef(); /**to get refernce of input field */

  function Random() {
    return Math.floor(Math.random() * 100001);
  }

  function handleAdd() {
    const name = todoRef.current.value; /**to get the value in input field */
    if (name === "") return;

    let key = Random();

    setTasks((prevTodos) => {
      return [...prevTodos, { id: key, name: name, complete: false }];
      /**key should be unique so it is just name*/
      /**This is getting passed as tasks to TodoList */
    });
    console.log(name);
  }

  function handleClearTasks() {
    const newTasks = tasks.filter((todo) => !todo.complete);
    setTasks(newTasks);
  }

  /**Local stroage */

  /**Everytime anything changes It will get called
   * It will store it into local storage
   * But if we refresh it will get lost */
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  /**That's why we use another useEffect above this */

  /**Handling radio toggle */
  function toggleTask(id) {
    const newTasks = [...tasks];
    const todo = newTasks.find((todo) => todo.id === id);

    todo.complete = !todo.complete;
    setTasks(newTasks);
  }
  function handleClearAll(){ /**own code */
    const newTasks = [];
    setTasks(newTasks);
  }

  return (
    <div className="container">
      <div>
        <h1>
          {" "}
          <span id="count">
            {
              tasks.filter(
                (todo) => !todo.complete /**flag of complete if false*/
              ).length
            }
          </span>
          <span id="msg"> left to do </span>
        </h1>
      </div>
      <div className="main-div">
        <input ref={todoRef} type="text" name="task" id="task-todo" />

        <button
          onClick={() => handleAdd()}
          id="add"
          className="button-50"
          role="button"
        >
          Add
        </button>

        <button
          onClick={handleClearTasks}
          id="remove"
          className="button-50"
          role="button"
        >
          Clear Completed
        </button>
        <button
          onClick={handleClearAll}
          id="removeall"
          className="button-50"
          role="button"
        >
          Clear All
        </button>
      </div>
      <div className="todo-list">
        <TodoList todo={tasks} toggleTask={toggleTask} />
      </div>
    </div>
  );
}

export default App;
