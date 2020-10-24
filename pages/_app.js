import Cursor from "../components/cursor";
import Navigation from "../components/navigation";
import { isMobile } from "react-device-detect";
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { GlobalProvider } from '../context/globalContext';
import SocialIcons from '../components/socialIcons';

// import "react-notion/src/styles.css";
// import "prismjs/themes/prism-tomorrow.css";

import "../styles/styles.scss";

export default function App({ Component, pageProps, router }) {

    return (
		<GlobalProvider>
			{!isMobile && <Cursor />}
            
			{/* <Navigation /> */}
			<SocialIcons />

            <main className="app">

				<AnimatePresence exitBeforeEnter>
					<Component {...pageProps} key={router.route} />
				</AnimatePresence>
	

               
            </main>

		</GlobalProvider>
    );
}