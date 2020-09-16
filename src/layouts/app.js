import React from "react"
import "../styles/styles.scss"
import SocialIcons from "../components/socialIcons"
import Cursor from "../components/cursor"
import BackButton from "../components/backButton"
import { isMobile } from 'react-device-detect';

const App = ({ children , back}) => {

    return (
        <>
            <SocialIcons />

            { !isMobile && <Cursor />}
    

            {back === true && <BackButton />}
               
            <main className="app">
                
                    {children}

                    <footer>Copyleft ©{new Date().getFullYear()}, Steal if you must.</footer>
            </main>
        </>
    )
}

export default App