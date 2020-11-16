import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function BackButton({ text = "back to portfolio", link = "/"}) {

    useEffect(() => {

        let backButton = document.querySelector('.back-button');
        let cursor = document.querySelector('.cursor');

        if (backButton && cursor) {
            const stickToCursorMore = (e) => {
                const { offsetX: x, offsetY: y} = e;
                const { offsetWidth: width, offsetHeight: height } = e.target;
                const move = 20;
                const xMove = x / width * ( move * 2) - move;
                const yMove = y / height * ( move * 2) - move;
                e.target.style.transform = `translate3d(${xMove}px, ${yMove}px, 0px)`;
                cursor.style.opacity = 0.2;
                cursor.style.transform = `scale(2)`;
            }

            backButton.addEventListener('mousemove', stickToCursorMore)
            backButton.addEventListener('mouseenter', () => {setTimeout(() => {backButton.style.transition = "none"}, 300)})
            backButton.addEventListener('mouseleave', () => {
                backButton.style.transition = ""
                backButton.style.transform = ""
                cursor.style.transform = ""
                cursor.style.opacity = ""
            })
        }

    })

    return (<Link href={link} scroll={false}>
				<motion.a
					className="back-button"
					initial={{ opacity: 0, y: '-40px' }}
					animate={{ opacity: 0.3, y: 0 }}
					exit={{ opacity: 0, y: '-40px' }}
					transition={{ duration: 0.6, ease: 'easeOut' }}>
					{text}
				</motion.a>
			</Link>)
}