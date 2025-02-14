"use client"

import React, { useState } from 'react'
import axios from "axios"

const page = () => {

  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    try{
      setLoading(prev => !prev);
      const response = await axios.post("/api/langchain", { input: data });
      console.log(response);
      setMsg(response.data.response);
      if(!response){
        setError("No API response");
      };
      setData(response.data);
    }catch(error) {
      console.log(error);
    }finally{
      setLoading(prev => !prev);
    }
  };

  return (
    <div>
      <div>Ask Joke</div>
        <form className='flex flex-col' onSubmit={handleSubmit}>
          <input
            className='outline-1'
            type="text"
            placeholder='Enter a Eating item'
            onChange={handleChange} 
          />
          <button className='bg-blue-500 w-20'>Submit</button>
        </form>
        <div>
          { 
            loading ? <div>Loading...</div> : 
            <div className='p-3'>
              <ol>
              {
                msg.map((item, i) => {
                  return(<li key={i}>{item}</li>)
                })
              }
              </ol>
            </div> 
          }
        </div>
    </div>
  )
}

export default page