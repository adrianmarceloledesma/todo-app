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
    <div className='todo-item'>
      <span className="date">{element.date}</span>
      <p key={element.id} >
        <input type="checkbox" checked={element.completed} onChange={() => handleComplete(element.id)} className='checkbox'/>
        <span className={element.completed ? 'completed' : ''}>{element.text}</span>{" "}
        <button onClick={() => handleDelete(element.id)} className='delete-but'> ✗ </button>
      </p>
    </div>
  );
}