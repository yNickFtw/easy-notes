import { useState } from "react";
import axios from "axios";
import styles from "./CreateNote.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

export const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const data = {
      title,
      description,
      note,
    };

    const token = localStorage.getItem("token");

    axios
      .post("http://localhost:8080/notes/", data, {
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
            <textarea
              name="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Aguarde..." : "Salvar"}
          </button>{" "}
        </form>
      </div>
    </>
  );
};
