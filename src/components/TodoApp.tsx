import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import type Todo from "../types/todo";
import TodoItem from "./TodoItem";
import { useLocalStorage } from "../hooks/useLocalStorage";
import "./TodoApp.css";

export default function TodoApp() {
  const [inputData, setInputData] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todo");
    return saved ? JSON.parse(saved) : [];
  }); //es para evitar que cuando cargue la pagina sobreponga un array vacio sobre
  // los datos que ya tengo, SAVED tiene los datos del INPUTDATA

  useLocalStorage("todo", inputData);

  const completedCounter = inputData.filter((e) => e.completed).length;
  const taskCounter = inputData.filter((e) => !e.completed).length;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //get the input value
    const formData = new FormData(e.currentTarget);
    const inputValue = formData.get("inputTodo") as string;
    //reset input value when submiting
    e.currentTarget.reset();
    //use the input value
    const newInputData: Todo = {
      id: Date.now(), // ID único basado en timestamp
      text: inputValue,
      date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'}),
      completed: false
    };
    setInputData([...inputData, newInputData]);
  };

  const handleDelete = (id: number) => {
    const newInputData = inputData.filter((e) => e.id !== id);
    setInputData(newInputData);
  };

  const handleComplete = (id: number) => {
    const newInputData = inputData.map((e) => {
      if (e.id == id) {
        //tomo el id y text, pero el completed = !e.completed (lo opuesto, osea true)
        return { ...e, completed: !e.completed };
      }
      return e;
    });
    setInputData(newInputData);
  };
  
  const [completedTitle, setCompletedTitle] = useState(false)
  useEffect(() => {
  if (completedCounter === 1) {
    setCompletedTitle(false); // siempre cerrado al aparecer por primera vez
  }
}, [completedCounter]);


  return (
    <div className="container">
      <div className="title-form-container">
       
        <h1><img src="/tasks.svg" alt="icon" className="icon" /> MyTasks</h1>
        
        <form onSubmit={handleSubmit}>
          <input type="text" name="inputTodo" placeholder="Add your new to-do" required/>
          <button>+</button>
        </form>
      </div>

      
      <div className="titleIncomplete"><h3 >{taskCounter > 0 ? "To-do" : "No tasks yet. Add one above!"}</h3> </div>
      {
        //incomplete</div>
        inputData.map((element) =>
          !element.completed ? (
            <TodoItem
              key={element.id}
              element={element}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
            />
          ) : null
        )
      }

      {completedCounter > 0 ? <div className="completedAccordion" onClick={()=>setCompletedTitle(!completedTitle)}><h3>Completed ({completedCounter})</h3><span>{completedTitle? '-':'+'}</span></div> : null}
      {
        // completed
        inputData.map((element) =>
          element.completed&&completedTitle? (
            <TodoItem
              key={element.id}
              element={element}
              handleComplete={handleComplete}
              handleDelete={handleDelete}
            />
          ) : null
        )
      }
    </div>
  );
}
