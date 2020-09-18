import React, { useEffect } from "react";

export default function Cursor(){

    // const lerp = (accum, target, roundness) => (1 - roundness) * accum + roundness * target

    useEffect(() => {
        let cursor = document.querySelector('.cursor')
        let swiper = document.querySelector('.swiper-container')
        let socials = document.querySelectorAll('#social-icons > li')

        function moveCursor(e){
            const {clientX, clientY} = e;
            const mouseX = clientX - cursor.clientWidth / 2;
            const mouseY = clientY - cursor.clientHeight / 2;
            cursor.style.top = mouseY + "px";
            cursor.style.left = mouseX + "px";
        }

        document.addEventListener('mousemove', (e) => moveCursor(e));

        const stickToCursor = function(e){
            const { offsetX: x, offsetY: y} = e;
            const { offsetWidth: width, offsetHeight: height } = this;
            const move = 8;
            const xMove = x / width * ( move * 2) - move;
            const yMove = y / height * ( move * 2) - move;
            this.querySelector('svg').style.transform = `translate3d(${xMove}px, ${yMove}px, 0px)`;
            cursor.style.opacity = 0.2;
        }

        if (swiper) {
            swiper.addEventListener('mouseenter', () => cursor.classList.add('on-swiper'))
            swiper.addEventListener('mouseleave', () => cursor.classList.remove('on-swiper'))
        }

        socials.forEach((icon) => {
            icon.addEventListener('mousemove', stickToCursor)
            icon.addEventListener('mouseleave', () => {icon.querySelector('svg').style.transform = "";  cursor.style.opacity = "";})
        })

    }, [])

    return <div className="cursor"></div>
}