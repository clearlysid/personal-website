import React, { useEffect } from "react";

export default function Cursor(){

    useEffect(() => {
        let cursor = document.querySelector('.cursor')

        function moveCursor(e){
            const {clientX, clientY} = e;
            const mouseX = clientX - cursor.clientWidth / 2;
            const mouseY = clientY - cursor.clientHeight / 2;
            cursor.style.top = mouseY + "px";
            cursor.style.left = mouseX + "px";
        }

        document.addEventListener('mousemove', (e) => moveCursor(e));

    }, [])

    return <div className="cursor-wrapper"><div className="cursor"></div></div>
}