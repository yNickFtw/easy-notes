import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "./CreateNote.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import "./quill-custom.css"; // Importe o arquivo CSS personalizado

const api = "https://easy-notes-api-ten.vercel.app";

export const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const data = {
      title,
      description,
      content,
      isPublic,
    };    

    const token = localStorage.getItem("token");

    axios
      .post(`${api}/notes/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response) {
          toast.success(response.data.message);
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false); // Restaura o estado do botão para habilitado
      });
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
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
      </div>
    </>
  );
};
