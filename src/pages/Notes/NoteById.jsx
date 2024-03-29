import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CreateNote.module.css";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { IconUserCircle } from '@tabler/icons-react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./quill-custom.css";

const api = "https://easy-notes-api-ten.vercel.app";

export const NoteById = () => {
  const [note, setNote] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();
  const { id } = useParams();

  const userId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${api}/notes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setNote(response.data);
            console.log(userId);
            console.log(response.data);
          } else if (response.status === 400) {
            setError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(true);
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [id]);

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
    if (note.isPublic !== undefined) {
      setIsPublic(note.isPublic);
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const token = localStorage.getItem("token");

    const data = {
      title,
      description,
      content,
      isPublic,
    };

    try {
      axios
        .put(`${api}/notes/${id}`, data, {
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
          toast.error(err.response.data.message);
          console.log(err);
        })
        .finally(() => {
          setIsSaving(false);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {loading && (
          <p style={{ color: "#fff" }}>Carregando...</p>
        )}
        {error && (
          <h2 style={{ color: "#fff" }}>
            Você não pode acessar esta nota ou ela não existe.
          </h2>
        )}
        {!error && note.userId === userId && (
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
            <div
              className={`${styles.form_control} ${styles.form_control_checkbox}`}
            >
              <p>Você quer que essa nota seja pública?</p>
              <label className={styles.checkbox_label}>
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkbox_custom}></span>
              </label>
            </div>
            <button type="submit" disabled={isSaving}>
              {isSaving ? "Aguarde..." : "Salvar"}
            </button>{" "}
          </form>
        )}
        <div className={styles.container_html}>
          {note.isPublic && note.userId !== userId && (
            <>
            <div className={styles.profile_section}>
              <div className={styles.image_section}>
              <IconUserCircle />
              </div>
              <h3>por {note.user.name}</h3>
            </div>
            <div className={styles.info_note}>
              <h2 className={styles.title_note}>{note.title}</h2>
              <h3 className={styles.description_note}>{note.description}</h3>
              </div>
              <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
