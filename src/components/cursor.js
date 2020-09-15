import React, { useEffect } from "react";

export default function Cursor(){

    useEffect(() => {
        let cursor = document.querySelector('.cursor')

        document.addEventListener('mousemove', (e) => {
            const {clientX, clientY} = e;
            const mouseX = clientX - cursor.clientWidth / 2;
            const mouseY = clientY - cursor.clientHeight / 2;
            cursor.style.transform = `translate3d( ${mouseX}px, ${mouseY}px, 0)`;
            // cursor.style.opacity = 1;
            // console.log('mouse moving')
        });

        window.addEventListener('mouseleave', () => { 
            cursor.style.opacity = 0
            console.log('mouse left doc')
        })
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = 1;
            console.log('mouse entered doc')
        })

    }, [])

    return <div className="cursor"></div>
}