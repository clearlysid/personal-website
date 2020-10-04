import React, { useEffect, useRef } from "react";


export default function SmoothScroll({ children }) {

    const scroller = useRef(null);

    useEffect(() => {
        
        const scrollWrapper = scroller.current;
        
        document.querySelector('.app').style.position = "fixed";
        

        const footer = document.querySelector('.site-footer');
        if (footer) scrollWrapper.appendChild(footer);

        const scrollConfig = { ease: 0.1, current: 0, previous: 0, rounded: 0, skew: 4 };
        
        const smoothScrolling = () => {
            scrollConfig.current = window.scrollY;
            scrollConfig.previous += (scrollConfig.current - scrollConfig.previous) * scrollConfig.ease;
            scrollConfig.rounded = Math.round(scrollConfig.previous * 100) / 100;
            const skew = Number( (scrollConfig.current - scrollConfig.rounded) / window.innerWidth ) * scrollConfig.skew;
            if (scrollWrapper){scrollWrapper.style.transform = `translate3d(0, -${scrollConfig.rounded}px, 0) skewY(${skew}deg)`}
            requestAnimationFrame(() => smoothScrolling());
        };
        
        requestAnimationFrame(() => smoothScrolling());

        setTimeout(() => {
            document.body.style.height = `${scrollWrapper.offsetHeight}px`;
            // console.log(scrollWrapper.offsetHeight)
        }, 100 );
        
        // console.log(scrollWrapper.offsetHeight);

        return () => {
            document.body.style.height = "";
            document.querySelector('.app').appendChild(footer);
            document.querySelector('.app').style.position = "";
        }
    }, []);

    return (
        <div className="smooth-scroll" ref={scroller}>
            { children }
        </div>
    )
}