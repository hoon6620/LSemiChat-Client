import { API_ROOT_URL } from '../constants/constant'

export async function getRequest(path: string): Promise<any> {
  const res = await fetch(newRequest(path, "GET"))
  return res.json()
}

export async function postRequest(path: string, body?: object) {
  const res = await fetch(newRequest(path, "POST", body))
  return res.json()
}

export async function putRequest(path: string, body?: object) {
  const res = await fetch(newRequest(path, "PUT", body))
  return res.json()
}

export async function deleteRequest(path: string) {
  const res = await fetch(newRequest(path, "DELETE"))
  return res
}

export async function postFormRequest(path: string, body?: FormData) {
  const res = await fetch(new Request(`${API_ROOT_URL}${path}`, {
    method: "POST",
    credentials: "include",
    body: body
  }))
  return res.json()
}

const newRequest = (path: string, method: "GET" | "POST" | "PUT" | "DELETE", body?: object) => {
  return new Request(`${API_ROOT_URL}${path}`, {
    method: method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}