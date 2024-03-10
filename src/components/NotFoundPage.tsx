import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Link to="/">
        <img
          src="https://oknadzen.ru/images/404.jpg" // Замените URL на реальный URL изображения с ошибкой 404
          alt="404 Not Found"
          style={{ maxWidth: "100%", height: "100%" }}
        />
      </Link>
    </div>
  );
};

export default NotFoundPage;
