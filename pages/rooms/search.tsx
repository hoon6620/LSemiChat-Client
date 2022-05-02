import Layout from "../../components/layout/layout";
import { RoomService } from "../../services/room";



export default function RoomSearch() {
  //全てのroomsデータ取得
  let threadData : Array<object>;
  RoomService.getInstance().getAll().then((res)=>{
    threadData = res.threads;
    for(var i = 0; i < threadData.length; i++) {
      console.log(threadData[i])
    }
  }).catch((e) => {
    console.log(e);
  });
  
  return (
    <Layout requiredAuth={true}>
      Search Room
    </Layout>
  )
}