import React, {useState } from "react";

export default function Deleteapi() {
  const [tdata, setTdata] = useState(undefined);

    function deltePerson(e){
        e.preventDefault();

        const userid = 7820888;
        const token = "47ef6ec4867a025957a627c6690bec334a103abbfde6cb261a6d101d6bd4f870";

        fetch(`https://gorest.co.in/public/v2/users/${userid}`,{
            method: "DELETE",
            headers: {
                "Authorization" : `Bearer ${token}`,
                "content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            setTdata(data);
        })
        .catch((err) => {
            console.log(err);
        })

    }

  return (
    <div>
      <h1>Data</h1>
      <input type="button" value="Post" onClick={deltePerson} />
        <br />
        <p>{tdata}</p>
    </div>
  );
}
