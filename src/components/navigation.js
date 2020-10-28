import React, { useState } from 'react';
import { Slant as Hamburger } from "hamburger-react";
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useGlobalDispatchContext } from '@context/globalContext';

export default function Navigation(){

	const [open, setOpen] = useState(false);
	const dispatch = useGlobalDispatchContext();

	const onCursor = style => dispatch({ type: 'CURSOR_TYPE', cursorType: style });

	const menuLinks = [['Home', '/'], ['Now', '/now'], ['Blog', '/blog']];

	const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, x: "40px", y: "30px", rotate: -15 },
        show: {
            opacity: 1, x: 0, y: 0, rotate: 0,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };


	return (
		<>
			<AnimatePresence>
				
				<motion.div onMouseEnter={() => {onCursor('hidden')}}
						onMouseLeave={() => {onCursor()}}
						initial={{opacity: 0 }}
						animate={{ opacity: 1 }}
						// onClick={() => setOpen(!open)}
					>
						{/* <div>menu</div> */}
					<Hamburger toggled={open} toggle={setOpen} direction="left" label="Site Navigation" color="#efefef" size={20} />
				</motion.div>
			</AnimatePresence>
			

			<AnimatePresence initial={false}>
			{
				open &&
					
					<motion.div key="abc"
						className="nav-bar"
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.8 }}>

						<motion.nav key="xyz"
							onClick={() => setOpen(false)}
							variants={container}
							initial="hidden"
							animate="show"
							>

							{
								menuLinks.map((link, i) => 
									<Link href={link[1]} scroll={false}>
										<motion.a key={i}
											variants={item}
										>{link[0]}</motion.a>
									</Link>)
							}
						</motion.nav>
								
					</motion.div>
			}

				
			</AnimatePresence>
			

		</>
	)
}
