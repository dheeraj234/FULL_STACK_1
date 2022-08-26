import React,{useEffect,useState} from 'react'
import axios from "axios"
// import formData from'form-data'
// import fs from'fs'
import './Display.css'
// import axios from 'axios';
const Display = (props) => {
  

  // const [data,setData]=useState([])

    // useEffect(() => { 
    //   axios.get('http://localhost:3001')
    //   .then((res)=> {console.log(res);
    //     console.log(data);
    //   setData(res.data)})
    //   .catch((err)=>console.log((err)))
    // },[]);
  

// const imageUpload=(e)=>{
//   const file=e.target.files[0];
//   console.log(file);
// }
// const onSubmited=(e)=>{
// var data = new formData();
// data.append('image_new', 'entered');
// data.append('testImage', fs.createReadStream(e.target.files[0]));

// var config = {
//   method: 'post',
//   url: 'http://localhost:3001/',
//   headers: { 
//     ...data.getHeaders()
//   },
//   data : data
// };

// axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

// }

const[data,setData]=useState([]);
const hi=(e)=>{
  // e.preventDefault();
  console.log(e.target.files[0]);
  let file=e.target.files[0];
  let formData= new FormData();
  formData.append('username',props.details.uname)
  formData.append('image34', 'new_image');
  formData.append('testImage',file);

  var config = {
    method: 'post',
    url: 'http://localhost:3001/',
    headers: { 
      "Content-type":"image/jpeg"
    },
    data : formData
  };
  axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

}
const hello=(e)=>{
  e.preventDefault();
  console.log(e);
      axios.get('http://localhost:3001/',)
      .then((res)=>{console.log(res); setData(res.data)})
      .catch((err)=>console.log(err))
      

}
  return (
    // <div>
    //     <div>
    //         <center>
    //         {visible ? <h1>{"Hello" +"  "+props.details.fname+" you have signed in "}</h1>:<h1>{"Details"}</h1>}
    //         <br/>
    //         <label>FirstName:{props.details.fname}</label>
    //         <br/>
    //         <label>UserName:{props.details.uname}</label>
    //         <br/>
    //         <label>Email-ID:{props.details.email}</label>
    //         <br/>
    //         <label>Select a file:</label>
    //         <input type="file" id='imageFile' name='imageFile' onChange={imageUpload}></input>
    //         {/* <input type="submit" /> */}

    //         <br/>
    //         <audio src={audioURL} type={audioType} controls />
    //         <br/>
    //         <button onClick={startRecording} disabled={isRecording}>start recording</button>
    //         <button onClick={stopRecording} disabled={!isRecording}>stop recording</button> 

    //         </center>
    //     </div>
    // </div>
    <div>
      <center>
        <div>hello</div>
        <div>{props.details.fname}</div>
        <div>
        <form onSubmit={hello}>
        <input type="file" onChange={hi}/>
        <input type="submit" />
       </form>
       
        {data.map((singleData)=>{
          const base64String=btoa(String.fromCharCode(...new Uint8Array(singleData.data)));
          return <img src={`data:image/jpeg;base64,${base64String}`}/>
          })}
        </div>
      </center>
    </div>
  );

  }

export default Display;