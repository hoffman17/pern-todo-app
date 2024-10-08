import React, { useState, useEffect } from 'react';
import EditModal from './EditModal';

const ListTodos = () => {

  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos")
        .then(res => res.json());
      setTodos(response);
    } catch (err) {
      console.error(err.message);
    }
  }
  
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, 
        {
          method: "DELETE"
        }
      );
      setTodos(todos.filter(todo => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // When component is rendered invoke getTodos()
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <table className="table mt-2 text-center">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td><EditModal todo={todo}/></td>
              <td><button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ListTodos;