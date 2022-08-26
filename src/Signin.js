import React, { useState } from 'react'
import { useNavigate} from "react-router-dom";

// import Home from './Home'
import axios from 'axios'

const Signin = () => {
  const navigate = useNavigate();

  const[credentials,setCredentials]=useState({
    username:'',
    password:''
  });
  const[info,setInfo]=useState('');
  function handleChange(e){
    const {name,value}=e.target;
    setCredentials((prevState) => { return {...prevState, [name]:value} });
  }

  // let data={}
    const onSubmitted=(e)=>{ 
      e.preventDefault();
      
      // props.setInfoDetails(info);
        axios.post("http://localhost:3001/login",{credentials},{
          headers:{
            'Content-type':'application/json'
          }
        })
        .then((res)=>{
          let data=res.data.username;
           setInfo(res.data.username);
           console.log(data);
          //  navigate(`/display `)
        })
        .catch((err)=>console.log(err))
        // props.setInfoDetails(info);
        // console.log(data);
        // setInfo(data);
        console.log(info);

    }

  return (
    <div>
      <center>
        <h1>Welcome to the Sign in page</h1>
        <form onSubmit={onSubmitted}>
        <label>UserName</label>
        <input type="text" onChange={handleChange} value={credentials.username} name="username"/>
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