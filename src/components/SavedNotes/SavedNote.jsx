import { useEffect, useState } from "react";
import styles from "../Notes/Note.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const api = "https://easy-notes-api-ten.vercel.app";

export const SavedNote = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Nova variável de estado

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${api}/notes/saves`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNotes(response.data);
        setIsLoading(false); // Definir isLoading para false após obter os dados
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
        }
      })
      .catch((err) => {
        toast.success(err.response.data.message);
        const updatedNotes = notes.map((note) => {
          if (note.id === id) {
            return { ...note, isSaved: true };
          }
          return note;
        });

        setNotes(updatedNotes);

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
          const updatedNotes = notes.map((note) => {
            if (note.id === id) {
              return { ...note, isSaved: false };
            }
            return note;
          });

          setNotes(updatedNotes);

          toast.success(response.data.message);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      {isLoading && <h4 style={{ color: "#fff" }}>Carregando...</h4>}
      {!isLoading && notes.length === 0 && (
        <h4 style={{ color: "#fff" }}>Você não tem notas salvas.</h4>
      )}
      <div className={styles.container_note}>
        {notes.map((note) => (
          <div className={styles.note} key={note.id}>
            {!note.title ? <h2>Sem título</h2> : <h2>{note.title}</h2>}
            {!note.description ? (
              <p>Sem descrição</p>
            ) : (
              <p>{note.description}</p>
            )}
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
