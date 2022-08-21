import Layout from "../../components/layout/layout";
import { useRef, useState } from "react";
import { postFormRequest } from "../../services/common";
import { API_ROOT_URL } from "../../constants/constant";


export default function UserDetail() {
  return (
    <Layout requiredAuth={true}>
      UserProfile
    </Layout>
  )
}