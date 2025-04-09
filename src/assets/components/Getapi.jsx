import React, { useEffect, useState } from "react";

export default function Getapi() {
  const [tdata, setTdata] = useState([]);
  useEffect(() => {
    fetch("https://gorest.co.in/public/v2/users")
      .then((res) => res.json())
      .then((data) => setTdata(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>Data</h1>
      <table border="1px solid black" width="100%">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
          </tr>
        </thead>
        <tbody>
          {tdata.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
            <td>{item.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
