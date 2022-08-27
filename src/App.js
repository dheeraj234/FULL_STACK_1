import './App.css';
import React,{useEffect, useState} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import Display from './Display';
import Signin from './Signin';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const formData = JSON.parse(localStorage.getItem('formData'));

function App() {
  const [details, setDetails] = useState(formData);
  const setFormDetails = (details) => {
    console.log("app",details);
    setDetails(details);
  }

  useEffect(()=>{console.log("effect",details);},[details])

  // const[information,setInformation]=useState()
  // const setInfoDetails=(info)=>{
  //   setInformation(info);
  //   setInformation(info);
  //   console.log(info);

  // }
  // console.log(information);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Home setFormDetails={setFormDetails} />} />
          <Route path="/display" element={<Display details={details}/>} />
          <Route path="/sign" element={<Signin setFormDetails={setFormDetails} />}/>
          {/* <Route path="*" element={<NoPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
