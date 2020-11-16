import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalDispatchContext } from '@context/globalContext';

export default function HoverImg({img, pos = "top", children}){

	const span = useRef(null);

	const [hovering, setHovering] = useState([500, 200, false]);
	const [mx, my, isHovered] = hovering;

	const dispatch = useGlobalDispatchContext();
	const onCursor = style => dispatch({ type: 'CURSOR_TYPE', cursorType: style });

	let cmx = mx - 75;
	let cmy = my - 80;

	if (pos !== "top") cmy = my - 40;

	useEffect(() => {
		setHovering([span.current.getBoundingClientRect().left, span.current.getBoundingClientRect().top, false]);
	}, [])

	return (
        <>
			<span ref={span}
					onMouseEnter={() => {setHovering([mx, my, true]); onCursor('hidden');}}
					onMouseLeave={() => {setHovering([mx, my, false]); onCursor();}}
					onMouseMove={e => setHovering([e.pageX, e.pageY, true])}>
					{children}</span>

			<AnimatePresence initial={false}>
				{isHovered && (
					<motion.div
						key="reveal"
						className="hover-reveal"
						initial={{ x: cmx, y: cmy, opacity: 0 }}
						animate={{ x: cmx, y: cmy, opacity: 1 }}
						transition={{ duration: 0.3, ease: 'linear' }}
						>
						<motion.div
							key="reveal-inner"
							class="hover-reveal__inner"
							initial={{ opacity: 0, scale: 0, y: '50%', rotate: -15 }}
							animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
							exit={{ opacity: 0, scale: 0.9, y: '-40%', rotate: 10 }}
							transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], type: "tween"}}
							>
							<motion.div
								class="hover-reveal__img"
								initial={{ scale: 2, rotate: 15 }}
								animate={{ scale: 1, rotate: 0 }}
								exit={{ scale: 1.5, rotate: -10 }}
								transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1],type: "tween" }}
								style={{ backgroundImage: `url(${img})` }}
							></motion.div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

        </>
    );
}