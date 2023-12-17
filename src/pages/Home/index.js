import React from 'react'
import useCheckLoggedIn from "../../hooks/useCheckLoggedIn";

const Home = () => {

    const isLoggedIn = useCheckLoggedIn()

    return <div>
        <h1>Home</h1>
        <p>Logged in: {isLoggedIn.toString()}</p>
    </div>
}

export default Home