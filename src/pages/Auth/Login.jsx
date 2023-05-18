import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { IconLogin } from "@tabler/icons-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/UserContext";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    axios
      .post("http://localhost:8080/users/authenticate", data)
      .then((response) => {
        if (response) {
          toast.success(response.data.message);
          login(
            response.data.user.response.token,
            response.data.user.response.id
          );
          navigate("/");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data);
      });
  };

  return (
    <>
      <div className={styles.container_auth}>
        <div className={styles.logo}>
          <h2>
            Easy<span>Notes</span>
          </h2>
          <p>
            Entre na EasyNotes e organize sua vida de forma simples e eficiente!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form_control}>
            <input
              type="email"
              placeholder="Digite seu email:"
              name="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.form_control}>
            <input
              type="password"
              placeholder="Digite sua senha:"
              name="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.btn_auth}>
            Entrar <IconLogin />
          </button>
          <p>
            Ainda não tem uma conta? <Link to="/register">Clique aqui</Link>
          </p>
        </form>
      </div>
    </>
  );
};
