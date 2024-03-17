import { FunctionComponent, useEffect, useState } from "react";
import s from "./Users.module.css";

interface User {
  id: number;
  username: string;
}

const Users: FunctionComponent = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:13000/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className={s.fRAME}>
      <div className={s.users}>Users</div>
      {users.map((user) => (
        <section key={user.id} className={s.user}>
          <div>{user.username}</div>
        </section>
      ))}

      <div className={s.textParent}>
        <button className={s.userbtn} type="button" onClick={getUsers}>
          Полный список
        </button>
      </div>
    </div>
  );
};
export default Users;
