import React, { useEffect } from "react";
import Cursor from "@components/cursor";
import Navigation from "@components/navigation";
import { isMobile } from "react-device-detect";
import { AnimatePresence, AnimateSharedLayout } from "framer-motion"
import { GlobalProvider } from "@context/globalContext";
import SocialIcons from "@components/socialIcons";
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
            {/* {!isMobile && <Cursor />} */}

            {/* <Navigation /> */}
            {/* <SocialIcons /> */}

            <main className="app">
                <AnimatePresence exitBeforeEnter>
                    <Component {...pageProps} key={router.route} />
                </AnimatePresence>
            </main>
        </GlobalProvider>
    )
}
