import { useEffect, useState } from "react";
import styles from "./Note.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const api = "https://easy-notes-api-ten.vercel.app";

export const Note = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${api}/notes/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotes(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSave(id) {
    const token = localStorage.getItem("token");

    axios
      .put(`${api}/notes/save/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          toast.success(response.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.success(err.response.data.message);
        window.location.reload();
        console.log(err);
      });
  }

  function handleUnsave(id) {
    const token = localStorage.getItem("token");

    axios
      .put(`${api}/notes/unsave/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          toast.success(response.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        toast.success(err.response.data.message);
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      {!notes && <h4 style={{ color: "#fff" }}>Carregando...</h4>}
      {notes.length == 0 && (
        <h4 style={{ color: "#fff" }}>Você não tem notas criadas.</h4>
      )}
      <div className={styles.container_note}>
        {notes.map((note) => (
          <div className={styles.note} key={note.id}>
            {!note.title ? <h2>Sem título</h2> : <h2>{note.title}</h2>}
            {!note.description ? <p>Sem descrição</p> : <p>{note.description}</p>}
            <div className={styles.button_section}>
              <Link to={`/note/${note.id}`}>Ver Mais</Link>
              {note.isSaved && (
                <button onClick={() => handleUnsave(note.id)}>Desfazer</button>
              )}
              {!note.isSaved && (
                <button onClick={() => handleSave(note.id)}>Salvar</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
