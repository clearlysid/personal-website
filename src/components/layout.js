import React from "react"

const Layout = ({ children }) => {
    return (
        <>

            <main>{children}</main>
            <footer>
                this is footer ©{new Date().getFullYear()}, Built with Gatsby
            </footer>
        </>
    )
}

export default Layout