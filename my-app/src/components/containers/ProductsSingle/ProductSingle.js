import React, { useState } from 'react';

function Forma() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [users, setUsers] = useState([]);

  const [editIndex, setEditIndex] = useState(-1);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (editIndex === -1) {
      setUsers((prevState) => [...prevState, formData]);
    } else {
      const newUsers = [...users];
      newUsers[editIndex] = formData;
      setUsers(newUsers);
      setEditIndex(-1);
    }
    setFormData({ name: '', email: '', phone: '' });
  }

  function handleDelete(index) {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  }

  function handleEdit(index) {
    setEditIndex(index);
    setFormData(users[index]);
  }

  const userList = users.map((user, index) => (
    <li key={index}>
      {user.name}, {user.email}, {user.phone}{' '}
      <button onClick={() => handleEdit(index)}>Редактировать</button>
      <button onClick={() => handleDelete(index)}>Удалить</button>
    </li>
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Телефон:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <button type="submit">{editIndex === -1 ? 'Добавить' : 'Сохранить'}</button>
      </form>
      <ul>{userList}</ul>
      {editIndex !== -1 && (
        <div>
          <h2>Редактирование элемента</h2>
          <p>
            Имя: {formData.name}
            <br />
            Email: {formData.email}
            <br />
            Телефон: {formData.phone}
          </p>
        </div>
      )}
    </div>
  );
}

export default Forma;
