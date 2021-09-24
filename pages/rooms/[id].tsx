import { useEffect } from "react";
import Layout from "../../components/layout/layout";
import { Socket } from "../../components/socket/socket";

export default function RoomDialog() {
  let ws: Socket;
  useEffect(()=>{
    ws = new Socket({thread:(window.location.pathname).replace('/rooms/', ''), acceptFunc: ()=>{}});
  })
  return (
    <Layout requiredAuth={true} ws={ws}>
      Dialog
    </Layout>
  )
}