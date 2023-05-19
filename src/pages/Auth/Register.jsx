import { Link, useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { IconLogin } from "@tabler/icons-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const api = "https://easy-notes-api-ten.vercel.app"

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const data = {
      name,
      email,
      password,
      confirmPassword,
    };

    if (password !== confirmPassword) {
      toast.error("As senhas não conferem!");
      return;
    }

    axios
      .post(api + "/users/register", data)
      .then((response) => {
        if (response) {
          toast.success(response.data.message);
          console.log(response.data);
          navigate("/login");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      })
      .finally(() => {
        setIsSaving(false)
      })
  };

  return (
    <>
      <div className={styles.container_auth}>
        <div className={styles.logo}>
          <h2>
            Easy<span>Notes</span>
          </h2>
          <p>
            Cadastre-se na EasyNotes e organize sua vida de forma simples e
            eficiente!
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.form_control}>
            <input
              type="text"
              placeholder="Digite seu nome:"
              name="name"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
          <div className={styles.form_control}>
            <input
              type="password"
              placeholder="Confirme sua senha:"
              name="confirmPassword"
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.btn_auth}>
          {isSaving ? "Aguarde..." : "Cadastrar-se"}
          </button>
          <p>
            Já tem uma conta? <Link to="/login">Clique aqui</Link>
          </p>
        </form>
      </div>
    </>
  );
};
