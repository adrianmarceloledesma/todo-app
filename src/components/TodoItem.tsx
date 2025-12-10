// components/TodoItem.tsx
import type Todo from '../types/todo';
import './TodoItem.css';

interface TodoItemProps {
  element: Todo;                    
  handleComplete: (id: number) => void;  
  handleDelete: (id: number) => void;    
}

export default function TodoItem({ element, handleComplete,handleDelete}: TodoItemProps) {
  return (           
    <div className='todo-item' key={element.id}>
      <p className="date">{element.completed?`Completed: ${element.date}`:element.date}</p>
        <input type="checkbox" checked={element.completed} onChange={() => handleComplete(element.id)} className='checkbox'/>
        <p className={element.completed ? 'completed' : 'incompleted'}>{element.text}</p>{" "}
        <button onClick={() => handleDelete(element.id)} className='delete-but'> ✗ </button>
    </div>
  );
}