import React, { useEffect, useRef } from 'react';
import { useGlobalStateContext } from '../context/globalContext';

export default function Cursor(){

	const cursorRef = useRef(null);

	const { cursorType } = useGlobalStateContext();

    useEffect(() => {

        const lerp = (a, b, n) => (1 - n) * a + n * b;

        let cursor = cursorRef.current;
        let mouse = { x: 0, y: 0 };
        document.addEventListener('mousemove', e => mouse = { x: e.clientX, y: e.clientY });
        
        let cursorPos = {
			// axis: [previous, current, lerp-factor]
            x: [ 0, 0, 0.2 ],
            y: [ 0, 0, 0.2 ],
        };

        const cursorMove = () => {
            cursorPos.x[0] = cursorPos.x[1] = mouse.x - cursor.offsetWidth / 2;
            cursorPos.y[0]= cursorPos.y[0] = mouse.y - cursor.offsetHeight / 2;
            requestAnimationFrame(() => cursorRender());
            document.removeEventListener('mousemove', cursorMove);
        };

        const cursorRender = () => {
            cursorPos['x'][1]= mouse.x - cursor.offsetWidth / 2;
			cursorPos['x'][0] = lerp(cursorPos['x'][0], cursorPos['x'][1], cursorPos['x'][2]);
			
            cursorPos['y'][1] = mouse.y - cursor.offsetHeight / 2;
			cursorPos['y'][0] = lerp(cursorPos['y'][0], cursorPos['y'][1], cursorPos['y'][2]);
			
            cursor.style.transform = `translate3d(${(cursorPos['x'][0])}px, ${cursorPos['y'][0]}px, 0)`;
            requestAnimationFrame(() => cursorRender());
        }

        document.addEventListener('mousemove', cursorMove);
		return () => document.removeEventListener('mousemove', cursorMove);
    }, [cursorType])

	return <div className="cursor" ref={cursorRef}
			style={{
				opacity: cursorType == "hidden" ? 0 : 1,
				height: cursorType == "read" ? '5rem' : '1.4rem', width: cursorType == "read" ? '5rem' : '1.4rem',			
			}}
	
	><span style={{transform: cursorType == "read" ? "scale(1)" : "scale(0)"}}>READ ARTICLE</span></div>
}