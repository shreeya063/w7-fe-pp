import React, { useState } from 'react'
import useField from '../hooks/useField';
import useLogin from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const email = useField("email");
  const password = useField("password");
  const navigate = useNavigate();

    const{login, error} = useLogin("/api/users/login");

    const handleFormSubmit = async(e)=>{
        e.preventDefault();

    
    await login ({
        email: email.value,
        password: password.value
    });
    if(!error){
        console.log("Login success");
        navigate("/");
        //console.log("error is:",error);
        
    
        
    }else{
        console.log("Login Failed", error)
    }
};

    
  return (
    <div className='login'>
        <h2>Log In</h2>
        <form onSubmit={handleFormSubmit}>
            <label>Email: </label>
            <input {...email}/>
            <br/>
            <br/>
            <label>Password: </label>
            <input {...password} />
            <br/>
            <button>Log in</button>
        </form>
    </div>
  )
}

export default Login;