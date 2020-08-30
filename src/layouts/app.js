import React from "react"
import "../styles/styles.scss"
import SocialIcons from "../components/socialIcons"

const App = ({ children }) => {
    return (
        <>
            <SocialIcons />
            <main>
                {children}
            </main>

            <footer>
                Copyleft ©{new Date().getFullYear()}, Steal if you must.
            </footer>
        </>
    )
}

export default App