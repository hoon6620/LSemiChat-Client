import Link from "next/link";
import { useState } from "react";
import Layout from "../components/layout/layout";
import { getRequest } from "../services/common";

export default function Rooms() {
  const [reload, setReload] = useState(true);

  if (reload) {
    getRequest("/threads")
    .then((r: Response) => {
      console.log("asdf")
      console.log(r)
    })
    setReload(false)
  }

  return (
    <Layout requiredAuth={true}>
      Room一覧
      <p>
        <Link href="/rooms/create">
          <a>Create Room</a>
        </Link>
      </p>
    </Layout>
  )
}