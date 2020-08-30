import React from "react"
import App from "../layouts/app"


const NotFoundPage = () => (
    <App>
        <div exit={{ opacity: 0 }}  key="404">

        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn't exist... the sadness.</p>
        </div>
    </App>
)

export default NotFoundPage
