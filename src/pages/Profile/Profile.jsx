import styles from "./Profile.module.css";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import axios from "axios";
import { IconUser } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const api = "https://easy-notes-api-ten.vercel.app";

export const Profile = () => {
  const [loggedUser, setLoggedUser] = useState({ notes: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${api}/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLoggedUser(response.data);
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, {});

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1>Perfil</h1>
        {loading ? (
          <p style={{ color: "#fff" }}>Carregando...</p>
        ) : (
          <>
            <div className={styles.container_profile}>
              <div className={styles.profile_name}>
                <IconUser
                  size={"6em"}
                  style={{
                    border: "5px solid #fff",
                    borderRadius: "100%",
                    padding: "14px",
                  }}
                />
                <h2>{loggedUser.name}</h2>
              </div>
              <h2>{loggedUser.notes.length} notas criadas</h2>
            </div>
            <div className={styles.container_notes_user}>
              {loggedUser.notes.map((note) => (
                <div className={styles.note} key={note.id}>
                  <h2>{note.title}</h2>
                  <h3 style={{ color: "#ccc" }}>{note.description}</h3>
                  <Link to={`/note/${note.id}`}>Ver mais</Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};
