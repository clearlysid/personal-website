import React, { useEffect, useRef } from "react";

export default function Cursor(){

    // const cursorRef = useRef(null);

    useEffect(() => {

        let cursor = document.querySelector('.cursor')
        document.addEventListener('mousemove', (e) => {
            const {clientX, clientY} = e;
            const mouseX = clientX - cursor.clientWidth / 2;
            const mouseY = clientY - cursor.clientHeight / 2;
            cursor.style.transform = `translate3d( ${mouseX}px, ${mouseY}px, 0)`;
            cursor.style.opacity = 1;
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = 0;
        })

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = 1;
        })

    }, [])
    

    return <div className="cursor" ></div>
}