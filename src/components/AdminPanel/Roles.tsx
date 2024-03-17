import { FunctionComponent, useState } from 'react';
import s from './Roles.module.css';

const Roles: FunctionComponent = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:13000/api/admin/addRole', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          role,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении роли');
      }
      localStorage.setItem('role', role);
      console.log('Роль успешно добавлена');
    } catch (error) {
      console.error('Ошибка при добавлении роли:', error);
    }
  };

  return (
    <div className={s.fRAME}>
      <div className={s.roles}>Roles</div>
      <div className={s.tEXTParent}>
        <div className={s.tEXT}>
          <input
            className={s.inp}
            placeholder="Ник"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={s.tEXT1}>
          <select
            className={s.inp}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
      </div>

      <button className={s.userbtn} type="button" onClick={handleSave}>
        Сохранить
      </button>
    </div>
  );
};

export default Roles;
