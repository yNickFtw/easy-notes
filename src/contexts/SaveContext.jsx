import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from 'react-toastify'

export const SaveContext = createContext()

const api = "http://localhost:8080"

export function SaveProvider({ children }) {
  const [note, setNote] = useState({})
  const [isSave, setIsSave] = useState(false)

  useEffect(() => {
    async function getNoteById(token, id) {
      axios.get(`${api}/notes/${id}`, {
        headers: `Bearer ${token}`
      })
      .then((response) => {
        setNote(response.data)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }, {})

  async function handleSave(token, id) {
    axios.put(`${api}/notes/save/${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      toast.success(response.data.message)
      setIsSave(true)      
    })
  }

}