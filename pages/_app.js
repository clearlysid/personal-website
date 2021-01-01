import React, { useEffect } from "react"
import { GlobalProvider } from "@context/globalContext"
import { useGoogleAnalytics } from "@hooks/useGoogleAnalytics"
import styled from "styled-components"
import Navigation from "@components/navigation"

import "@styles/resets.css"
import "@styles/global.css"
import "@styles/notion.css"

const StyledApp = styled.main`
    margin: 0 auto;
    width: 100vw;
    z-index: 1;
`

export default function App({ Component, pageProps, router }) {
    const { init, trackPageViewed } = useGoogleAnalytics()

    useEffect(() => {
        init("UA-168083571-2")
        trackPageViewed()
        router.events.on("routeChangeComplete", () => {
            trackPageViewed()
        })
    }, [])

    return (
        <GlobalProvider>
            <Navigation />
            <StyledApp className="app">
                {/* <AnimatePresence exitBeforeEnter> */}
                <Component {...pageProps} key={router.route} />
                {/* </AnimatePresence> */}
            </StyledApp>
        </GlobalProvider>
    )
}
