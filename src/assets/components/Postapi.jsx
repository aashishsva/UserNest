import React, {useState } from "react";

export default function Postapi() {
  const [tdata, setTdata] = useState(undefined);
  function postperson(e) {
    const token = "47ef6ec4867a025957a627c6690bec334a103abbfde6cb261a6d101d6bd4f870"
    fetch("https://gorest.co.in/public/v2/users", {
      method: "POST",
      body: JSON.stringify({
        name: "Aashish",
        email: "aashish@gmail.com",
        gender: "male",
        status: "active",
      }),
      headers: {
        "Authorization" : `Bearer ${token}`,
         "content-type": "application/json; charset=UTF-8"
         },
    })
      .then((res) => res.json())

      .then((data) => {
        setTdata(data)
        console.log(data);
      })

      .catch(console.log);
      
      e.preventDefault();
  }
  return (
    <div>
      <h1>Data</h1>
      <input type="button" value="Post" onClick={postperson} />
        <br />
        <p>{tdata}</p>
    </div>
  );
}
