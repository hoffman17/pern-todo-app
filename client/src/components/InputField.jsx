import React, { useState } from 'react';

const InputField = () => {

  const [description, setDescription] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = fetch('http://localhost:5000/todos', {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      console.log(response);
      
    } catch (err) {
      console.error(err.message);      
    }
  }

  return (
    <div className='container w-50'>
    <h3 className='text-center mt-5'>Pern Todo List</h3>
    <form action="" method="POST" className='d-flex mt-5'>
      <input type="text" className='form-control' placeholder='Add description...' value={description} onChange={(e) => setDescription(e.target.value)} required/>
      <button className='btn btn-lg btn-primary' type='submit'>Add</button>
    </form>
  </div>)
}

export default InputField;