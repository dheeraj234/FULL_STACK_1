import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";

// import Home from './Home'
import axios from 'axios'

const Signin = (props) => {
  const navigate = useNavigate();

  const[credentials,setCredentials]=useState({
    email:'',
    password:''
  });
  function handleChange(e){
    const {name,value}=e.target;
    setCredentials((prevState) => { return {...prevState, [name]:value} });
  }

  // let data={}
    const onSubmitted=(e)=>{ 
      e.preventDefault();
              axios.post("http://localhost:3001/login",{credentials},{
          headers:{
            'Content-type':'application/json'
          }
        })
        .then((res)=>{
           props.setFormDetails(res.data);
           
           navigate(`/display `);
        })
        .catch((err)=>console.log(err));
    }

  return (
    <div>
      <center>
        <h1>Welcome to the Sign in page</h1>
        <form onSubmit={onSubmitted}>
        <label>email-id</label>
        <input type="text" onChange={handleChange} value={credentials.email} name="email"/>
        <br/>
        <label> Password</label>
        <input type="password" onChange={handleChange}  value={credentials.password} name="password"/>
        <br/>
        <input type="submit" />
        </form>
      </center>
    </div>
  )
}

export default Signin