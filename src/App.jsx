import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import "./App.css";

const LOCAL_STORAGE_KEY = "tasks"; /**key name*/

const getItems = () => {
  let list =
    localStorage.getItem("tasks"); 
    /**With the help of keyname we are getting the list */
  
    console.log(list);
  
    if (list) {
    return JSON.parse(localStorage.getItem("tasks"));
    /**localStorage.setItems("key", "value") 
     * JSON.parse bcz Local Storage stores strings only
     * but we are working with different variables
    */
  } else {
    return [];
  }
};

function App() {
  const [tasks, setTasks] = useState(getItems());
  const todoRef = useRef(); /**to get refernce of input field */

  function Random() {
    return Math.floor(Math.random() * Math.pow(10,10));
  }

  function handleAdd() {
    const name = todoRef.current.value; /**to get the value in input field */
    if (name === "") return;

    let key = Random(); /**to get random key */

    setTasks((prevTodos) => {
      return [...prevTodos, { id: key, name: name, complete: false }];
      /**key should be unique so generating using random*/
      /**This is getting passed as tasks to TodoList */
    });
    console.log(name);
  }

  function handleClearTasks() { /**handle radio checked tasks*/
    const newTasks = tasks.filter((todo) => !todo.complete);
    /**updating the list withe the tasks which are not completed*/
    setTasks(newTasks);
  }

   /**Handling radio toggle */
   function toggleTask(id) {
    const newTasks = [...tasks]; /**coopying in another array*/
    const todo = newTasks.find((todo) => todo.id === id);

    todo.complete = !todo.complete;
    setTasks(newTasks); /**updating list with only not done tasks*/
  }

  function handleClearAll(){ /**own code */
  const newTasks = [];   /**updating the list with no tasks */
  setTasks(newTasks);
}

  /**Local stroage */

  /**Everytime anything changes It will get called
   * It will store it into local storage
   * But if we refresh it will get lost */
   /**That's why we use another some code in the starting of the component code*/

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    /**localStorage.setItems("key", "value") 
     * "value" is stringify bcz Local Storage stores strings only
    */
  }, [tasks]); /**From tasks array*/


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
