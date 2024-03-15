import s from "./LoginPage.module.css";

import React, { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";

const LoginPage: FunctionComponent = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onFrameButtonClick = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!username || !password) {
      setErrorMessage("Пожалуйста, введите логин и пароль");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          setErrorMessage("Неправильно введенные данные");
          setPassword("");
        } else {
          throw new Error("Ошибка входа");
        }
      } else {
        const data = await response.json();
        const { access_token, refresh_token, user } = data;
        login(access_token, refresh_token, user.username, user.role[0]);
        navigate("/home");
      }
    } catch (error: any) {
      console.error("Ошибка входа:", error.message);
      setErrorMessage("Неверный логин или пароль!");
    }
  };

  return (
    <div className={s.loginPage}>
      <div className={s.loginFrame}>
        <section className={s.textComponentParent}>
          <div className={s.textComponent}>
            <h1 className={s.h1}>Имя</h1>
          </div>
          <div className={s.div}>
            Слоган приложения о том как это приложение спасает мир
          </div>
        </section>
        <form className={s.frameButton} onSubmit={onFrameButtonClick}>
          <input
            className={s.input}
            placeholder="Введите логин"
            value={username}
            onChange={onLoginChange}
          />
          <input
            className={s.input}
            placeholder="Введите пароль"
            type="password"
            value={password}
            onChange={onPasswordChange}
          />
          <button type="submit" className={s.btn2}>
            <div className={s.div3}>Войти</div>
          </button>
          {errorMessage && <div className={s.error}>{errorMessage}</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
