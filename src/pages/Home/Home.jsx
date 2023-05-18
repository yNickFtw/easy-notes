import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";
import { Note } from "../../components/Notes/Note";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="align-sidebar">
        <section className={styles.text_section}>
          <h1>Todas as notas criadas: </h1>
          <Link to="/create/note">Criar Nota</Link>
        </section>
        <Note />
      </div>
    </>
  );
};
