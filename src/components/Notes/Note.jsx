import { useEffect, useState } from "react";
import styles from "./Note.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const api = "https://easy-notes-api-ten.vercel.app";

export const Note = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleSave(id) {
    const token = localStorage.getItem("token");
    const updatedNotes = [...notes];
    const noteIndex = updatedNotes.findIndex((note) => note.id === id);

    // Atualizar apenas a propriedade isButtonLoading usando o setNotes
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[noteIndex] = { ...newNotes[noteIndex], isButtonLoading: true };
      return newNotes;
    });

    axios
      .put(`${api}/notes/save/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          toast.success(response.data.message);
          setNotes((prevNotes) => {
            const newNotes = [...prevNotes];
            newNotes[noteIndex] = {
              ...newNotes[noteIndex],
              isButtonLoading: false,
              isSaved: true,
            };
            return newNotes;
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setNotes((prevNotes) => {
          const newNotes = [...prevNotes];
          newNotes[noteIndex] = {
            ...newNotes[noteIndex],
            isButtonLoading: false,
            isSaved: false,
          };
          return newNotes;
        });
        console.log(err);
      });
  }

  function handleUnsave(id) {
    const token = localStorage.getItem("token");
    const updatedNotes = [...notes];
    const noteIndex = updatedNotes.findIndex((note) => note.id === id);

    // Atualizar apenas a propriedade isButtonLoading usando o setNotes
    setNotes((prevNotes) => {
      const newNotes = [...prevNotes];
      newNotes[noteIndex] = { ...newNotes[noteIndex], isButtonLoading: true };
      return newNotes;
    });

    axios
      .put(`${api}/notes/unsave/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          toast.success(response.data.message);
          setNotes((prevNotes) => {
            const newNotes = [...prevNotes];
            newNotes[noteIndex] = {
              ...newNotes[noteIndex],
              isButtonLoading: false,
              isSaved: false,
            };
            return newNotes;
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setNotes((prevNotes) => {
          const newNotes = [...prevNotes];
          newNotes[noteIndex] = {
            ...newNotes[noteIndex],
            isButtonLoading: false,
            isSaved: true,
          };
          return newNotes;
        });
        console.log(err);
      });
  }

  function deleteNote(id) {
    const token = localStorage.getItem("token");
  
    try {
      axios
        .delete(`${api}/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response) {
            toast.success(response.data.message);
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  }  

  return (
    <div className={styles.container}>
      {isLoading && <h4 style={{ color: "#fff" }}>Carregando...</h4>}
      {!isLoading && notes.length === 0 && (
        <h4 style={{ color: "#fff" }}>Você não tem notas criadas.</h4>
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
              <button className={styles.delete_btn} onClick={() => deleteNote(note.id)}>Excluir</button>
              <button
                onClick={() =>
                  note.isSaved ? handleUnsave(note.id) : handleSave(note.id)
                }
                disabled={note.isButtonLoading}
              >
                {note.isButtonLoading
                  ? "Aguarde..."
                  : note.isSaved
                  ? "Desfazer"
                  : "Salvar"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
