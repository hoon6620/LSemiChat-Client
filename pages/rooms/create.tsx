import { useRouter } from "next/dist/client/router";
import Layout from "../../components/layout/layout";
import { postFormRequest, postRequest } from "../../services/common";
import { useRef, useState } from "react";

export default function RoomCreate() {
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const [limitUser, setLimitUser] = useState(2);
  const [isPublic, setIsPublic] = useState(false);
  const [file, setFile] = useState(null);
  const [icon, setIcon] = useState('');
  const fileRef = useRef();

  const router = useRouter()

  const createTempThread = (e) => {
    console.log(roomName)
    console.log(description)
    console.log(limitUser)
    console.log(isPublic)
    //return;
    let response = postRequest("/threads", {
      name: roomName,
      description: description,
      limit_users: limitUser,
      is_public: isPublic ? 1 : 0,
    })
    response.then((r: Response) => {
      console.log(r)
      if(file === null) return;
      const formData = new FormData();
      formData.append(
        "threadIcon",
        file,
      )
      let response = postFormRequest("/threads/" + r.id + "/icon", formData)
      response.then((r: Response) => {
        router.replace("/rooms/" + r.id)
      })

    })
  }

  const handleFileOnChange = event => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = (e) => {
      setFile(file);
      setIcon(reader.result.toString())
      console.log(file)
    }
    if(file)
    {
      reader.readAsDataURL(file);
    }
  }
  
  return (
    <Layout requiredAuth={true}>
      <h1>Room Create</h1>
      <p>
        <div>
          <img className="avatar avatar-32 round border" src={icon} alt="" />
        </div>
        <div>
          <input ref = {fileRef} id = "file" type='file' onChange={handleFileOnChange} accept="image/jpeg, image/png"></input>
        </div>
      </p>

      <p>
        <div>Room name</div>
        <input type="text" className="text" onChange={(e)=>{setRoomName(e.target.value)}} value={roomName}/>
      </p>

      <p>
        <div>Description</div>
        <input type="text" className="text" onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
      </p>
      
      <p>
        <div>limit users : {limitUser}</div>
        <input type="range" min={2} max={30} onChange={(e)=>{setLimitUser(parseInt(e.target.value, 10))}} value={limitUser}/>
      </p>
      
      <p>
        <div>Is {isPublic ? "Public" : "Private"}</div>
        <input type="checkbox" onChange={(e)=>{setIsPublic(e.target.checked)}} checked={isPublic}/>
      </p>
      
      <p>
        <button onClick= {createTempThread}>Create</button>
      </p>
    </Layout>
  )
}