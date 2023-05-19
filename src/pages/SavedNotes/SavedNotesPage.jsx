import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import styles from "../Home/Home.module.css";
import { SavedNote } from "../../components/SavedNotes/SavedNote";

export const SavedNotesPage = () => {
  return (
    <>
      <Navbar />
      <div className="align-sidebar">
        <section className={styles.text_section}>
          <h1>Todas as notas salvas: </h1>
          <Link to="/create/note">Criar Nota</Link>
        </section>
        <SavedNote />
      </div>
    </>
  );
};
