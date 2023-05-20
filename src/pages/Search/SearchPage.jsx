import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Search } from "./Search";
import styles from "./Search.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";

const api = "https://easy-notes-api-ten.vercel.app";

export const SearchPage = () => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/note/page/search?q=${search}`);

    setSearch("");
  };

  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${api}/notes/search/${query}`, {
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
  }, [query]);

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.search_container}>
        <h2>
          Resultados para: <span>{query}</span>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Procure por notas publicas:"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
              <IconSearch />
            </button>
        </form>
        </div>
        <div className={styles.container_notes}>
          {loading && (
            <p style={{ color: "#fff" }}>Carregando...</p>
          )}
          {notes.map((note) => (
            <div className={styles.note} key={note.id}>
              <h2>{note.title}</h2>
              <h3>{note.description}</h3>
              <Link to={`/note/${note.id}`}>Ver mais</Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
