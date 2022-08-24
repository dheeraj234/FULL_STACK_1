import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

import './Home.css';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const Home = (props) => {
  // const [hello,setHello]=useState(false)y
  const [formDetails, setFormDetails] = useState({
    fname: '',
    uname: '',
    email: '',
    password: '',
    confirmpassword:'',
  });

  const [validation, setValidation] = useState({
    firstNameError:'',
    userNameError:'',
    emailAddressError: "",
    passwordError: "",
    passwordConfirmationError: ""
  });
 

  const navigate = useNavigate();

  const signup=(e)=>{
    e.preventDefault();
    const signupData=JSON.stringify(formDetails);
    localStorage.setItem("formData",signupData);    
    props.setFormDetails(formDetails);
    console.log(formDetails);
    navigate(`/display`);
    Axios.post("http://localhost:3001/app/signup",{formDetails}).then(()=>{alert("successfully insert")}).catch(err => {console.log(err);});
    
  }

  function handleblur(e){
    const {name, value}= e.target;
    validate(name, value);
  }

  function validate(name,value) {
    if(name === 'fname' || name === 'uname'){
      if (value?.trim() === ""){
        name === 'fname' ?
         setValidation((prevState) => { return {...prevState, firstNameError: "First Name is required" } }) 
         : setValidation((prevState) => { return {...prevState, userNameError: "username is required" } }) ;
        
      } 
    }else if(name === 'email'){
      let emailAddressError = "";
      if (value?.trim() === "") emailAddressError = "Email Address is required";
      else if (!emailValidator.test(value)) emailAddressError = "Email is not valid";
      setValidation((prevState) => { return {...prevState, emailAddressError } })
    }else{
      if(name === 'password'){
        let passwordError = "";
        if (value?.trim() === "") passwordError = "Password is required";
        else if (!passwordValidator.test(value))
          passwordError =
            "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!";
        setValidation((prevState) => { return {...prevState, passwordError } })
      }else {
        let passwordConfirmationError = "";
        if (formDetails.password !== formDetails.confirmpassword)
          passwordConfirmationError = "Password does not match Confirmation";
        setValidation((prevState) => { return {...prevState, passwordConfirmationError } });
      }
    }
  }

  function handleChange(e){
    const {name,value}=e.target;
    setFormDetails((prevState) => { return {...prevState, [name]:value} });
  }

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('formData'));
    if(formData === undefined) navigate('');
    if(formData && formData.fname !== '') {
      navigate('/display');
    }
  }, []);

  return (
    <div className='container'>
      <center>
      <h1 className='register'>Register</h1>
      <form onSubmit={signup}>
          <div className='form-group'>
            <input 
                type='text' 
                name='fname'
                value={formDetails.fname} 
                onBlur={handleblur} 
                onChange={handleChange} 
                id='fname' 
                placeholder='firstname' 
                required/>
                <br />
                {validation.firstNameError && (
                <div className="errorMsg">{validation.firstNameError}</div>
                )}
          </div>
          <div className='form-group'>
            <input 
                type='text' 
                name='uname'
                value={formDetails.uname}
                onBlur={handleblur} 
                onChange={handleChange} 
                id='uname' 
                placeholder='username' 
                required/>
                <br />
                {validation.lastNameError && (
                <div className="errorMsg">{validation.userNameError}</div>
                )}
          </div>
          <div className='form-group'>
            <input 
                type='email' 
                name='email'
                value={formDetails.email} 
                onBlur={handleblur} 
                onChange={handleChange}
                id='email' 
                placeholder='Email Address' 
                required/>
                <br />
                {validation.emailAddressError && (
                <div className="errorMsg">{validation.emailAddressError}</div>
                )}
          </div>
          <div className='form-group'>
            <input 
              type='password' 
              name='password'
              value={formDetails.password} 
              onBlur={handleblur} 
              onChange={handleChange}
              id='password' 
              placeholder='password' 
              required/>
              <br />
              {validation.passwordError && (
              <div className="errorMsg">{validation.passwordError}</div>
              )}
          </div>
          <div className='form-group'>
            <input 
              type='password' 
              name='confirmpassword'
              value={formDetails.confirmpassword} 
              onBlur={handleblur} 
              onChange={handleChange}
              id='confirmpassword' 
              placeholder='confirmpassword' 
              required/>
              <br />
              {validation.passwordConfirmationError && (
              <div className="errorMsg">
              {validation.passwordConfirmationError}
              </div>
              )}
          </div>
          <div className='form-group'>
            <button type='submit' className='signup'>Sign Up</button>
          </div>
      </form>
      </center>
    </div>
  );
 
}

export default Home;