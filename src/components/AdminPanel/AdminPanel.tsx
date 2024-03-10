import { FunctionComponent, useEffect, useState } from "react";
import s from "./Admin.module.css";
import Users from "./Users";
import Roles from "./Roles";
import { Link } from "react-router-dom";

interface User {
  id: number;
  username: string;
  // Другие свойства пользователя...
}

interface Post {
  id: number;
  title: string;
  // Другие свойства поста...
}

const AdminiPanel: FunctionComponent = () => {
  return (
    <div className={s.admin}>
      <form className={s.fRAMEParent}>
        <div className={s.fRAME}>
          <Users />
          <Roles />
        </div>
      </form>
      <div className={s.adminChild} />
      <div className={s.frameParent}>
        <div className={s.wrapper}></div>
      </div>
      <Link to="/home" className={s.back}>
        <div>Назад</div>
      </Link>
    </div>
  );
};

export default AdminiPanel;
