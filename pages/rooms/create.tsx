import { useRouter } from "next/dist/client/router";
import Layout from "../../components/layout/layout";
import { postRequest } from "../../services/common";

export default function RoomCreate() {
  const router = useRouter()
  const createTempThread = (e) => {
    let response = postRequest("/threads", {
      name: "1",
      description: "",
      limit_users: 10,
      is_public: 1,
    })
    response.then((r: Response) => {
      console.log(r)
      router.replace("/rooms/" + r.id)
    })
    //useRouter().replace("/rooms/" + "faf96af6-c5e5-406e-971b-8c3cd13aaca0")
  }
  return (
    <Layout requiredAuth={true}>
      Room Create
      <button onClick= {createTempThread}>Create</button>
    </Layout>
  )
}