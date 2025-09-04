import React, { useState , useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();


    const maxId = users.length ? Math.max(...users.map(u => u.id)) : 0;
    const newUser = { id: maxId + 1, name, email, phone };

    axios.post("http://localhost:5000/users", newUser)
      .then(() => {
        alert("User added successfully!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          maxLength={10}

          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setPhone(value);
            }
          }}
        />

        <button type="submit" className="add">Add User</button>
      </form>
    </div>
  );
}

export default Create;
