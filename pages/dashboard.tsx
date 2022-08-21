import Link from "next/link";
import Layout from "../components/layout/layout";
import { UserService } from "../services/user";

export default function DashBoard() {
  return (
    <Layout requiredAuth={true}>
      <h1>Dashboard</h1>
    </Layout>
  )
}