import React, { useEffect } from "react"
import "../styles/styles.scss"
import SocialIcons from "../components/socialIcons"
import Cursor from "../components/cursor"
import { isMobile } from 'react-device-detect';

const App = ({ children }) => {

    useEffect(() => {
        // setTimeout(() => {document.querySelector('.loader').style.display = 'none'}, 1000)

        // Use Context to pass prop in cursor based on route
    })

    return (
        <>
            {/* <div className="loader"></div> */}
            { !isMobile && <Cursor />}

            <SocialIcons />
            
            <main className="app">
                {children}
                <footer className="site-footer">Copyleft ©{new Date().getFullYear()}, Built with Notion, Gatsby and GSAP.</footer> 
            </main>
        </>
    )
}

export default App