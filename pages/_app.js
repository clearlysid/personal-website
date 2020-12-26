import React, { useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import { GlobalProvider } from "@context/globalContext"
import { useAnalytics } from "@hooks/analytics"
import { createGlobalStyle } from "styled-components"
import styled from "styled-components"

import "@styles/resets.css"
import "@styles/fonts.css"
import "@styles/notion.css"

const GlobalStyle = createGlobalStyle`
	body {
		width: 100vw;
		position: relative;
		margin: 0;
		padding-top: max(100px, 12vh);
		overscroll-behavior-y: none;
		min-height: 99vh;
		overflow-x: hidden;
	}

	::selection {
		background: rgb(255, 231, 185);
	}

	* {
		font-family: "hk_grotesk", sans-serif;
	}

	code {
		font-family: "Inconsolata", monospace;
		font-size: inherit;
	}

	p > code {
		background: #f5f5f5;
		padding: 0.18em 0.4em;
		font-size: 0.9em;
	}

	span {
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: "Manrope", sans-serif;
		font-weight: 700;
		color: #222222;
	}

	h1 {
		font-size: max(32px, min(4.2vw, 42px));
		line-height: 1.6em;
		padding-bottom: 0.6em;
	}

	h2 {
		font-size: max(24px, min(3.2vw, 32px));
		line-height: 1.6em;
		margin-top: 1.4em;
		padding-bottom: 0.4em;
	}

	h3 {
		font-size: max(18px, min(2.4vw, 24px));
		line-height: 1.6em;
		margin-top: 1.4em;
		padding-bottom: 0.4em;
	}

	h4 {
		font-size: max(18px, min(2vw, 22px));
		letter-spacing: -0.02em;
		line-height: 1.4em;
		font-weight: 400;
	}

	p,
	ul,
	ol {
		font-size: max(16px, min(1.8vw, 20px));
		font-weight: 300;
		line-height: 1.6em;
		color: #333333;
		letter-spacing: -0.02em;
		font-feature-settings: "salt" on;
		a {
			border-bottom: 0.09em solid #444444;
		}
	}

	p {
		margin-bottom: 1.2em;
	}
	li {
		font-size: inherit;
		span {
			font-size: inherit;
		}
	}

	pre {
		background: #f5f5f5 !important;
		padding: 1rem 2rem !important;
		font-size: 16px;
		line-height: 1.4em;
		overflow-x: scroll;
		color: #333333;
		tab-size: 4;
		border-radius: 4px;
		margin-top: 1rem;
		margin-bottom: 1rem;
	}

	ul,
	ol {
		padding-left: 2rem;
		li {
			margin-bottom: 0.4em;
		}
	}

	ol > ol,
	ul > ol {
		padding-left: 2rem;
		list-style: lower-latin;
	}

	ul {
		list-style: disc;
	}
	ol {
		list-style: decimal;
	}
	ul + *:not(ul),
	ol + *:not(ol) {
		margin-top: 2em;
	}
`

const StyledApp = styled.main`
    top: 0;
    left: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
    margin: 0 auto;
`

export default function App({ Component, pageProps, router }) {
    const { init, trackPageViewed } = useAnalytics()

    useEffect(() => {
        init("UA-168083571-2")
        trackPageViewed()
        router.events.on("routeChangeComplete", () => {
            trackPageViewed()
        })
    }, [])

    return (
        <GlobalProvider>
            <GlobalStyle />
            <StyledApp className="app">
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
            </StyledApp>
        </GlobalProvider>
    )
}
