import { FunctionComponent } from "react";
import s from "./StartPage.module.css";
import { Link } from "react-router-dom";

const StartPage: FunctionComponent = () => {
  return (
    <div className={s.homepage}>
      <section className={s.subHeaderFrame}>
        <div className={s.subHeaderFrameItem} />
      </section>
      <section className={s.cTACircle} />
      <section className={s.mainTextFrame}>
        <div className={s.subtextFrame}>
          <div className={s.nameText}>
            <h1 className={s.h1}>Блог</h1>
          </div>
          <div className={s.div}>
            Слоган приложения о том как это приложение спасает мир
          </div>
        </div>
        <div className={s.loginButtonsFrame}>
          <div className={s.signInButtonGroup}>
            <button className={s.btn}>
              <div className={s.email}>Продолжить с email</div>
            </button>
            <button className={s.btn1}>
              <div className={s.div1}>Продолжить с Вконтакте</div>
            </button>
            <button className={s.btn2}>
              <div className={s.google}>Продолжить с Google</div>
            </button>
          </div>
          <div className={s.div2}>
            <span>{`Уже есть аккаунт? `}</span>
            <Link to="/login" className={s.span}>
              Войдите.
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartPage;
