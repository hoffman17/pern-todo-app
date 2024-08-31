import React, { useState } from 'react';

const InputField = () => {

  const [description, setDescription] = useState("");

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:5000/todos',
      {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      // refresh page to reset fields
      window.location = '/';
    } catch (err) {
      console.error(err.message);      
    }
  }

  return (
    <>
      <h3 className='text-center mt-5'>Pern Todo List</h3>
      <form className='d-flex mt-5 gap-2' onSubmit={handleSubmitForm}>
        <input type="text" className='form-control' placeholder='Add description...' value={description} onChange={(e) => setDescription(e.target.value)} required/>
        <button className='btn btn-lg btn-primary' type='submit'>Add</button>
      </form>
    </>
  )
}

export default InputField;