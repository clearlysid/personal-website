import React, { useEffect } from "react"

// import { initGA, logPageView } from "./analytics";

export default function Layout({ children }) {

	// useEffect(() => {
	// 	if (!window.GA_INITIALIZED) {
	// 		initGA();
	// 		window.GA_INITIALIZED = true
	// 	  }
	// 	  logPageView();
	// }, []);

	return <>{children}</>

}