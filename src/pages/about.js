import React from "react"
import App from "../layouts/app"


const About = () => (
    <App>
        <div key="about" initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}>

        About page
        </div>
    </App>
)

export default About