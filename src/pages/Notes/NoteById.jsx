import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateNote.module.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import './quill-custom.css'

const api = "https://easy-notes-api-ten.vercel.app"

export const NoteById = () => {
  const [note, setNote] = useState({})
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')

  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if(token) {
      axios.get(`${api}/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setNote(response.data)

        console.log(response.data)
      })
      .catch(err => console.log(err))
    }
  }, [id])

  useEffect(() => {
    if (note.title) {
      setTitle(note.title);
    }
    if (note.description) {
      setDescription(note.description);
    }
    if (note.content) {
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    const token = localStorage.getItem("token")

    const data = {
      title,
      description,
      content,
    }

    try {
      axios.put(`${api}/notes/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        if(response) {
          toast.success(response.data.message)
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err)
      })
      .finally(() => {
        setIsSaving(false)
      })
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {!note && (
          <h2 style={{color: '#fff'}}>Você não pode acessar esta nota ou ela não existe.</h2>
        )}
        {note && (
          <form onSubmit={handleSubmit}>
          <div className={styles.form_control}>
            <h3>Título da nota:</h3>
            <input
              type="text"
              placeholder="Digite o título da nota:"
              name="title"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.form_control}>
            <h3>Descrição:</h3>
            <input
              name="description"
              type="text"
              autoComplete="off"
              placeholder="Digite a descrição da nota:"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.form_control}>
            <h3>Nota:</h3>
            <ReactQuill
              value={content}
              onChange={setContent}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline", "strike"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link"],
                  ["clean"],
                ],
              }}
            />
          </div>
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Aguarde..." : "Salvar"}
          </button>{" "}
        </form>
        )}
      </div>
    </>
  );
};
