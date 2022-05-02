import Layout from "../../components/layout/layout";
import { useRef, useState } from "react";
import { postFormRequest } from "../../services/common";
import { API_ROOT_URL } from "../../constants/constant";


export default function UserDetail() {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');
  const fileRef = useRef();

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
    let response = postFormRequest("/account/img", formData)
    response.then((r : Response) => {
      console.log(r)
      setPreviewURL(API_ROOT_URL+r.file_path);
    })
  }


  return (
    <Layout requiredAuth={true}>
      UserProfile
      <br/>
      <input ref = {fileRef} id = "file" type='file' onChange={handleFileOnChange} accept="image/jpeg, image/png"></input>
      <button onClick= {handleFileButtonClick}>Upload</button>
      <img src={previewURL} alt="" />
    </Layout>
  )
}