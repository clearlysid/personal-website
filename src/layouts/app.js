import React, { useEffect } from "react"
import "../styles/styles.scss"
import SocialIcons from "../components/socialIcons"
import Cursor from "../components/cursor"
import BackButton from "../components/backButton"

const App = ({ children , back}) => {
    
    useEffect(() => {
        const scrollConfig = {
            ease: 0.1,
            current: 0,
            previous: 0,
            rounded: 0,
            skew: 4
        };
        
        const skewScrolling = () => {
            scrollConfig.current = window.scrollY;
            scrollConfig.previous += (scrollConfig.current - scrollConfig.previous) * scrollConfig.ease;
            scrollConfig.rounded = Math.round(scrollConfig.previous * 100) / 100;

            const skew = Number( (scrollConfig.current - scrollConfig.rounded) / window.innerWidth ) * scrollConfig.skew;

            document.querySelector('.scroll').style.transform = `translate3d(0, -${scrollConfig.rounded}px, 0) skewY(${skew}deg)`;
            requestAnimationFrame(() => skewScrolling());
        };

        requestAnimationFrame(() => skewScrolling());
    }, []);

    useEffect(() => document.body.style.height = `${document.querySelector('.scroll').getBoundingClientRect().height}px`, []);

    return (
        <>
            <SocialIcons />

            <Cursor />

            {back === true && <BackButton />}
               
            <main className="app">
                <div className="scroll">
                    {children}

                    <footer>
                        Copyleft ©{new Date().getFullYear()}, Steal if you must.
                    </footer>
                </div>
                
            </main>

           
        </>
    )
}

export default App