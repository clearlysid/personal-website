import React, { useEffect } from "react";

export default function Cursor(){

    useEffect(() => {

        const lerp = (a, b, n) => (1 - n) * a + n * b;
       
        let cur = document.querySelector('.cursor');
        let mouse = { x: 0, y: 0 };
        window.addEventListener('mousemove', e => mouse = { x: e.clientX, y: e.clientY });
        
        let curStyles = {
            x: { previous: 0, current: 0, amt: 0.2 },
            y: { previous: 0, current: 0, amt: 0.2 },
            scale: { previous: 0.2, current: 0.2, amt: 0.15 },
            opacity: { previous: 1, current: 1, amt: 0.1 }
        };

        const curMove = () => {
            curStyles.x.previous = curStyles.x.current = mouse.x - cur.offsetWidth / 2;
            curStyles.y.previous = curStyles.y.previous = mouse.y - cur.offsetHeight / 2;
            requestAnimationFrame(() => curRender());
            window.removeEventListener('mousemove', curMove);
        };

        const curGrow = () => curStyles['scale'].current = 1;
        const curShrink = () => curStyles['scale'].current = 0.2;
        const curFade = () => curStyles['opacity'].current = 0.2;
        const curUnfade = () => curStyles['opacity'].current = 1;

        const curRender = () => {
            curStyles['x'].current = mouse.x - cur.offsetWidth / 2;
            curStyles['y'].current = mouse.y - cur.offsetHeight / 2;

            for (const key in curStyles ) {curStyles[key].previous = lerp(curStyles[key].previous, curStyles[key].current, curStyles[key].amt);}
            cur.style.transform = `translate3d(${(curStyles['x'].previous)}px, ${curStyles['y'].previous}px, 0) scale(${curStyles['scale'].previous})`;
            cur.style.opacity = curStyles['opacity'].previous;
            requestAnimationFrame(() => curRender());
        }

        window.addEventListener('mousemove', curMove);


        // add anim triggers here
        let cards = document.querySelectorAll('.card')

        if (cards) {
            cards.forEach((card) => {
                card.addEventListener('mouseenter', () => curGrow())
                card.addEventListener('mouseleave', () => curShrink())
            });
        }

        let socialIcons = document.querySelectorAll('#social-icons > li')

        const stickToCursor = function(e){
            const { offsetX: x, offsetY: y} = e;
            const { offsetWidth: width, offsetHeight: height } = this;
            const move = 4;
            const xMove = x / width * ( move * 2) - move;
            const yMove = y / height * ( move * 2) - move;
            this.querySelector('svg').style.transform = `translate3d(${xMove}px, ${yMove}px, 0px)`;
            curFade();
        }

        socialIcons.forEach((icon) => {
            icon.addEventListener('mousemove', stickToCursor)
            icon.addEventListener('mouseleave', () => {
                icon.querySelector('svg').style.transform = ""
                curUnfade();
            })
        })

    }, [])

    return <div className="cursor"></div>
}