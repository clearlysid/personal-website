import React from "react"
import { Link } from "gatsby"
import "../styles/styles.scss"

const App = ({ children }) => {
    return (
        <>
            <nav>
                <ul>
                    <li><Link to="/blog">blog</Link></li>
                    <li><Link to="/about">about</Link></li>
                    <li><Link to="/">home</Link></li>
                </ul>
            </nav>

            <main>{children}</main>
            <footer>
                this is footer ©{new Date().getFullYear()}, Built with Gatsby
            </footer>
        </>
    )
}

export default App