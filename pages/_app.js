import React, { useEffect } from "react";
import Cursor from "@components/cursor";
import { AnimatePresence } from "framer-motion";
import { GlobalProvider } from "@context/globalContext";
import { useAnalytics } from "@hooks/analytics";

import "@styles/styles.scss"

export default function App({ Component, pageProps, router }) {

	const { init, trackPageViewed } = useAnalytics();
	
	useEffect(() => {
		init("UA-168083571-2");
		trackPageViewed();
		router.events.on("routeChangeComplete", () => {
			trackPageViewed();
		});

	}, []);

    return (
        <GlobalProvider>
            {/* <Cursor /> */}

            <main className="app">
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
            </main>
        </GlobalProvider>
    )
}
