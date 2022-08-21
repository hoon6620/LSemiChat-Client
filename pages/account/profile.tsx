import Layout from "../../components/layout/layout";
import { useRef, useState } from "react";
import { postFormRequest } from "../../services/common";
import { API_ROOT_URL } from "../../constants/constant";
import { UserService } from "../../services/user";


export default function UserDetail() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});
  const fileRef = useRef();
    
  const res = UserService.getInstance().getSelf()
  res.then(data => {
    setUser({
        id: data.id,
        userId: data.user_id,
        name: data.name,
        image: data.image,
        mail: data.mail,
        profile: data.profile,
      })
  })

  const fileChange = (e) => {
    if(file !== '')
      return () => {
      }
  }
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
      "userIcon",
      file,
    )
    console.log(formData)
    let response = postFormRequest("/account/icon", formData)
    response.then((r : Response) => {
      console.log(r)
    })
  }


  return (
    <Layout requiredAuth={true}>
      UserProfile
      <br/>
      <p>
      <img src={`${API_ROOT_URL}/users/${user.userId}/icon`} className="avatar avatar-32 round" alt="" />
      </p>
      <input ref = {fileRef} id = "file" type='file' onChange={handleFileOnChange} accept="image/jpeg, image/png"></input>
      <button onClick= {handleFileButtonClick}>Upload</button>
    </Layout>
  )
}