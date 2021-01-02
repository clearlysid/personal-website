import { useEffect, useState } from "react"

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        function handleResize() {
            const mobile = window.innerWidth > 700 ? false : true
            setIsMobile(mobile)
        }

        window.addEventListener("resize", handleResize)

        handleResize()

        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return isMobile
}
