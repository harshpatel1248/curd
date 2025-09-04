import { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((res) => setData(res.data))
            .catch((error) => console.log(error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:5000/users/${id}`)
                .then(() => setData(data.filter(user => user.id !== id)))
                .catch(err => console.log(err));
        }
    };

    return (
        <>
            <h1 className='h1'>List Of Users</h1>

            <span className="div">
                <button className='add' onClick={() => navigate('/create')}>ADD</button>
            </span>

            <table className='my-table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th className='action'>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email || "-"}</td>
                            <td>{user.phone || "-"}</td>
                            <td className='btn'>
                                <button onClick={() => navigate(`/read/${user.id}`)}>Read</button>
                                <button onClick={() => navigate(`/update/${user.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Home;
