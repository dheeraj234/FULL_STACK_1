import React,{useState,useEffect} from 'react'

import './Display.css'
import axios from 'axios';


const Display = (props) => {
  
  let formData=props.details
  let x=JSON.stringify(formData);
    const [visible, setVisible] = useState(true);
    const [pic,setPic]=useState({
      profile:''
    });

    function imageUpload(e) {
      axios.post("http://localhost:3001")
 
  };

  // const [data,setData]=useState({})

    useEffect(() => {
      // axios.get('http://localhost:3001')
      // .then((res)=> setData(res.data))
      // .catch((err)=>console.log((err)))
     
    });

    let [size,audioType,audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    let audioData={
      audioclipUrl:audioURL,
      audioclipType:audioType,
      audioClipSize:Number(size)/1024
    };
    localStorage.setItem("audioData",JSON.stringify(audioData));

  

  return (
    <div>
        <div>
            <center>
            {visible ? <h1>{"Hello" +"  "+props.details.fname+" you have signed in "}</h1>:<h1>{"Details"}</h1>}
            <br/>
            <label>FirstName:{props.details.fname}</label>
            <br/>
            <label>UserName:{props.details.uname}</label>
            <br/>
            <label>Email-ID:{props.details.email}</label>
            <br/>
            <label>Select a file:</label>
            <input type="file" id='imageFile' name='imageFile' onChange={imageUpload}></input>
            {/* <input type="submit" /> */}

            <br/>
            <audio src={audioURL} type={audioType} controls />
            <br/>
            <button onClick={startRecording} disabled={isRecording}>start recording</button>
            <button onClick={stopRecording} disabled={!isRecording}>stop recording</button> 

            </center>
        </div>
    </div>
  );

  }
  const useRecorder = () => {
    const [audioURL, setAudioURL] = useState("");
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);
    const[size,setSize]=useState();
    const [audioType,setAudioType]=useState();
  
    useEffect(() => {
      // Lazily obtain recorder first time we're recording.
      if (recorder === null) {
        if (isRecording) {
          requestRecorder().then(setRecorder, console.error);
        }
        return;
      }
  
      // Manage recorder state.
      if (isRecording) {
        recorder.start();
      } else {
        recorder.stop();
      }
  
      // Obtain the audio when ready.
      const handleData = e => {
        console.log(e);
        setAudioURL(URL.createObjectURL(e.data));
        setSize(e.data.size);
        setAudioType(e.data.type)
      };
  
      recorder.addEventListener("dataavailable", handleData);
      return () => recorder.removeEventListener("dataavailable", handleData);
    }, [recorder, isRecording]);
  
    const startRecording = () => {
      setIsRecording(true);
    };
  
    const stopRecording = () => {
      setIsRecording(false);
    };
    console.log(audioURL);
  
    return [size,audioType,audioURL, isRecording, startRecording, stopRecording];
  };
  
  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }
export default Display;