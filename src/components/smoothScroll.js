import React, { useEffect } from "react";


export default function SmoothScroll({ children }) {

    useEffect(() => {
        const scrollConfig = { ease: 0.1, current: 0, previous: 0, rounded: 0, skew: 4 };
        const skewScrolling = () => {
            const scrollWrapper = document.querySelector('.scroll');
            scrollConfig.current = window.scrollY;
            scrollConfig.previous += (scrollConfig.current - scrollConfig.previous) * scrollConfig.ease;
            scrollConfig.rounded = Math.round(scrollConfig.previous * 100) / 100;
            const skew = Number( (scrollConfig.current - scrollConfig.rounded) / window.innerWidth ) * scrollConfig.skew;
            if (scrollWrapper){scrollWrapper.style.transform = `translate3d(0, -${scrollConfig.rounded}px, 0) skewY(${skew}deg)`}
    
            requestAnimationFrame(() => skewScrolling());
        };
        
        requestAnimationFrame(() => skewScrolling());
    }, []);

    useEffect(() => {
        document.body.style.height = `${document.querySelector('.scroll').getBoundingClientRect().height + 240}px`;
        return () => {document.body.style.height = '100%'}
    }, []);

    return (
        <div className="scroll">
            { children }
        </div>
    )
}