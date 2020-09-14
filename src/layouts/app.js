import React, { useEffect } from "react"
import "../styles/styles.scss"
import SocialIcons from "../components/socialIcons"
import Cursor from "../components/cursor"

const App = ({ children }) => {

    return (
        <>
            <SocialIcons />

            <Cursor />
               
                <main className="app">
                    {children}
                </main>

            <footer>
                Copyleft ©{new Date().getFullYear()}, Steal if you must.
            </footer>
        </>
    )
}

export default App