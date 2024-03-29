import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

import {
  IconHome,
  IconBookmark,
  IconUser,
  IconLogout2,
  IconSearch,
} from "@tabler/icons-react";
import { useAuth } from "../../contexts/UserContext";
import { toast } from "react-toastify";

export const Navbar = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();

    logout();
    toast.success("Logout realizado com sucesso!");
    navigate("/login");
  };

  return (
    <>
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link to="/">
          Easy<span>Notes</span>
        </Link>
      </div>

      <ul>
        <li>
          <Link to="/">
            <IconHome /> Início
          </Link>
        </li>
        <li>
          <Link to="/notes/saves">
            <IconBookmark /> Salvos
          </Link>
        </li>
        <li>
          <Link to="/notes/search">
            <IconSearch /> Procurar
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <IconUser /> Perfil
          </Link>
        </li>
        <li>
          <button className={styles.button} onClick={handleLogout}>
            <IconLogout2 /> Sair
          </button>
        </li>
      </ul>
    </nav>
    <nav className={styles.nav_mobile}>
    <ul>
        <li>
          <Link to="/">
            <IconHome />
          </Link>
        </li>
        <li>
          <Link to="/notes/saves">
            <IconBookmark />
          </Link>
        </li>
        <li>
          <Link to="/notes/search">
            <IconSearch />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <IconUser />
          </Link>
        </li>
        <li>
          <button className={styles.button} onClick={handleLogout}>
            <IconLogout2 />
          </button>
        </li>
      </ul>
    </nav>
    </>
  );
};
