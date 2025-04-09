import React from 'react'

export default function Putapi() {

    const handleput = () => {
        fetch("https://gorest.co.in/public/v2/users",{
            method: 'PUT',
            body: JSON.stringify({
                
            })
        })
    }

  return (
    <div>
    <h1>Delete Data</h1>
    <button onClick={handleput}>Delete</button>
  </div>

  )
}
