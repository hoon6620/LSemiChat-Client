import { useEffect, useRef, useState } from "react";
import Layout from "../../components/layout/layout";
import { Socket } from "../../components/socket/socket";
import { API_ROOT_URL } from "../../constants/constant";
import { postFormRequest, postRequest } from "../../services/common";

export default function RoomDialog() {
  let ws: Socket;
  let roomId: String
  useEffect(()=>{
    roomId = (window.location.pathname).replace('/rooms/', '');
    ws = new Socket({thread:roomId, acceptFunc: ()=>{}});
  })

  function SendMessage(msg: string, grade: number) {
    ws.sendMessage(msg, grade);
  }

  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const [fileName, setFileName] = useState('');
  const fileRef = useRef();

  const handleFileOnChange = event => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (e) => {
      setFile(file);
      //setPreviewURL(reader.result);
      console.log(reader)
    }
    if(file)
    {
      reader.readAsDataURL(file);
    }
  }

  const handleFileButtonClick  = (e) => {
    const formData = new FormData();
    formData.append(
      "threadIcon",
      file,
    )
    let response = postFormRequest("/threads/" + roomId + "/icon", formData)
    response.then((r : Response) => {
      setPreviewURL(API_ROOT_URL+ "/threads/" + roomId + "/icon/");
      setFileName(r.message)
    })
  }
  return (
    <Layout requiredAuth={true} ws={ws}>
      Dialog
      <br/>
      <input ref = {fileRef} id = "file" type='file' onChange={handleFileOnChange} accept="image/jpeg, image/png"></input>
      <button onClick= {handleFileButtonClick}>Upload</button>
      <div>{fileName}</div>
      <img src={previewURL} alt="" />
    </Layout>
  )
}