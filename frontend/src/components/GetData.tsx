import { date } from "astro/zod"
import React, { useEffect, useState } from "react"

const App = () => {
    const [users, setUsers] = useState([])

    const fetchUserData = () => {
        fetch("http://localhost:5000/api/alpr")
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then(data => {
                setUsers(data)
            })
    }

    useEffect(() => {
        fetchUserData()
    }, [])
    return (
        <div>

            <h1>
                Testing

            </h1>


            {users.length > 0 && (
                <ul>
                    {users.map(user => (
                        <li key={user.id}>{user.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default App;