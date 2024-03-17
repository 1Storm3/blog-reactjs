import { FunctionComponent, useCallback, useEffect, useState } from "react";
import Notification1 from "../Notification1";
import { Link, useNavigate } from "react-router-dom";
import s from "./HomePage.module.css";
import { useAuth } from "../../Auth";

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  author: string;
}

interface User {
  username: string | undefined;
}

const HomePage: FunctionComponent = () => {
  const { logout,role } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responsePosts = await fetch(
          "http://localhost:13000/api/posts"
        );
        if (!responsePosts.ok) {
          throw new Error("Ошибка при получении");
        }

        const postsData = await responsePosts.json();
        setPosts(postsData);
        const responseUser = await fetch(
          `http://localhost:13000/api/user/${postsData[0].author}`
        );
        const userData = await responseUser.json();
        setAuthor(userData.username);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const logouting = () => {
    logout();
  };
  const handleAdminAuth = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:13000/api/admin/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Передайте токен доступа для аутентификации
        },
      });
      if (!response.ok) {
        throw new Error("Доступ запрещен");
      }

      navigate("/admin");
    } catch (error: any) {
      console.error("Ошибка доступа:", error.message);
      // Обработка ошибки доступа
    }
  }, [accessToken]);

  const onProfileContainerClick = useCallback(() => {
    navigate("/profile");
  }, [navigate]);

  return (
    <div className={s.signUp}>
      <div className={s.mainFrame}>
        <div className={s.div}>Привет, {username}!</div>
        <div className={s.profile}>
          <div className={s.menu}>
            <input
              type="checkbox"
              id="burger_checkbox"
              className={s.burger_checkbox}
            ></input>
            <label htmlFor="burger_checkbox" className={s.burger}></label>
            <ul className={s.menu_list}>
              <li>
                <Link to="/" className={s.menu_item}>
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/" className={s.menu_item}>
                  О нас
                </Link>
              </li>
              <li>
                <Link to="/" className={s.menu_item}>
                  Команда
                </Link>
              </li>
              <li>
                <Link to="/" className={s.menu_item}>
                  Контакты
                </Link>
              </li>
              {role === "admin" && (
                <div className={s.menu_item} onClick={handleAdminAuth}>
                  Админка
                </div>
              )}
              <Link to="/login" onClick={logouting} className={s.menu_item}>
                Выход
              </Link>
            </ul>
          </div>
          <Link to="/profile">
            <img
              className={s.textFrameIcon}
              loading="eager"
              alt=""
              src="/ellipse-3@2x.png"
            />
          </Link>
        </div>
      </div>
      <section className={s.group}>
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
        <Notification1 />
      </section>
      <section className={s.profileFrame}>
        <div className={s.profile} onClick={onProfileContainerClick}>
          <img
            className={s.personalizedFrameIcon}
            loading="eager"
            alt=""
            src="/ellipse-4@2x.png"
          />
          <div className={s.nameAndHourTextFrame}>
            <div className={s.evgenyStorm}>Evgeny Storm</div>
            <div className={s.hourAgo}>1 hour ago</div>
          </div>
        </div>
        <div className={s.goodMorning}>Good morning!</div>
        <div className={s.rectangleFrame}>
          <img
            className={s.uniformShapeFrame}
            loading="eager"
            alt=""
            src="/rectangle-8@2x.png"
          />
          <img
            className={s.uniformShapeFrame1}
            loading="eager"
            alt=""
            src="/rectangle-9@2x.png"
          />
        </div>
      </section>
      {posts.map((post) => (
        <section className={s.profileFrame} key={post._id}>
          <p> {author}</p>
          <p> {post.title}</p>
          <p> {post.content}</p>
          <p> {post.createdAt}</p>
        </section>
      ))}
    </div>
  );
};

export default HomePage;
