import styles from "./Search.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { IconSearch } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";

const api = "https://easy-notes-api-ten.vercel.app";

export const Search = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/note/page/search?q=${search}`);

    setSearch("");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${api}/notes/publics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setNotes(response.data);
          console.log(response.data);
        } else if (response.status === 400) {
          toast.error(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.search_container}>
          <h2>Todas as notas públicas: {notes.length} notas</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="search"
              placeholder="Procure por notas publicas:"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <button type="submit">
              <IconSearch />
            </button>
          </form>
        </div>
        <div className={styles.container_notes}>
          {loading && <p style={{ color: "#fff" }}>Carregando...</p>}
          {notes.map((note) => (
            <div className={styles.note}>
              <h2>{note.title}</h2>
              <h3>{note.description}</h3>
              <h4>
                Por{" "}
                <Link to={`/profile/${note.user.id}`}>{note.user.name}</Link>
              </h4>
              <Link to={`/note/${note.id}`}>Ver Mais</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
