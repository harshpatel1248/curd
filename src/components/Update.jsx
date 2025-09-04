import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Update() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`)
      .then((res) => {
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        console.log(res.data);
      })
      .catch(err => {
        console.error(err);
        alert("Failed to update user. Please try again.");
      });

  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/users/${id}`, { name, email, phone })
      .then(() => {
        alert("User updated successfully!");
        navigate("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="create-container">
      <h2 className="h1 update-h1">Update User</h2>
      <form onSubmit={handleSubmit} className="create-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Phone:</label>
        <input type="text"
          value={phone}
          maxLength={10}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*$/.test(value)) {
              setPhone(value);
            }
          }} />

        <button type="submit" className="add">Update User</button>
      </form>
    </div>
  );
}

export default Update;
