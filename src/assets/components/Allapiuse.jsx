import React, { useEffect, useState } from "react";

export default function CrudApp() {
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const url = "http://localhost:3001/users";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !gender || !age) {
      setMessage("Please fill all fields");
      return;
    }

    const userData = { id, name, email, gender, age };

    if (isEditing) {
      fetch(`${url}/${id}`, {
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((updatedUser) => {
          const updatedData = data.map((user) =>
            user.id === id ? updatedUser : user
          );
          setData(updatedData);
          setMessage("User updated successfully!");
          setIsEditing(false);
          clearForm();
        })
        .catch(console.log);
    } else {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((newUser) => {
          setData([...data, newUser]);
          setMessage("User added successfully!");
          clearForm();
        })
        .catch(console.log);
    }
  };

  const clearForm = () => {
    setId("");
    setName("");
    setEmail("");
    setGender("");
    setAge("");
    setMessage("");
  };

  const handleEdit = (user) => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setGender(user.gender);
    setAge(user.age);
    setIsEditing(true);
    setMessage("");
  };

  const handleDelete = (id) => {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);
        setMessage("User deleted successfully!");
      })
      .catch(console.log);
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-primary mb-4">User Management</h2>

      {message && <div className="alert alert-info text-center">{message}</div>}

      <form
        onSubmit={handleSubmit}
        className="row g-3 mb-5 bg-light p-4 rounded shadow"
      >
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter ID"
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Name"
          />
        </div>
        <div className="col-md-2">
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter Age"
          />
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className="btn btn-primary w-100">
            {isEditing ? "Update User" : "Add User"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={() => {
                setIsEditing(false);
                clearForm();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email or gender..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(
                (user) =>
                  user.name.toLowerCase().includes(searchTerm) ||
                  user.email.toLowerCase().includes(searchTerm) ||
                  user.gender.toLowerCase().includes(searchTerm)
              )
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.age}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(user)}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
