import React, { useState, useRef } from "react"
import useOnClickOutside from "@hooks/useOnClickOutside"
import Link from "next/link"
import styled from "styled-components"
import { motion } from "framer-motion"

const ScrollPreventer = styled.div({
    height: "100vh",
    width: "100%",
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "all",
    zIndex: 9,
})

const StyledNav = styled.nav`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
`

const StyledList = styled(motion.ul)`
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    list-style: none;
    height: 100vh;
    display: flex;
    flex-direction: column;
    transform-origin: top right;
    background: #efefef;
    font-size: 2rem;
    padding-left: 4rem;
    padding-top: 16vh;

    & > li {
        margin: 0.6rem 1rem;
    }

    @media (max-width: 700px) {
        width: 100%;
    }
`

const StyledButton = styled.button`
    z-index: 10;
    font-size: max(16px, min(1.8vw, 20px));
    color: #333333;
    position: relative;
    padding: 2em;

    @media (min-width: 700px) {
        &:after {
            content: "";
            display: block;
            position: relative;
            width: 100%;
            height: 2px;
            background: #333333;
            z-index: 5;
            transform: scaleX(0);
            transform-origin: left;
            transition: all 0.3s ease;
        }

        &:hover::after {
            transform: scaleX(1);
        }
    }
`

function ListItem({ url, text, onClick }) {
    const variants = {
        visible: {
            y: 0,
            x: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 },
            },
        },
        hidden: {
            y: -50,
            x: "10%",
            opacity: 0,
            transition: {
                y: { stiffness: 1000 },
            },
        },
    }

    return (
        <motion.li key={url} variants={variants} whileHover={{ x: 10 }}>
            <Link href={url}>
                <a onClick={() => onClick(false)}>{text}</a>
            </Link>
        </motion.li>
    )
}

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false)
    const ref = useRef()
    useOnClickOutside(ref, () => setMenuOpen(false))

    const listVariants = {
        hidden: {
            x: "100%",
            transition: {
                delay: 0.2,
                type: "tween",
                duration: 0.3,
                ease: "easeIn",
                staggerChildren: 0.03,
                staggerDirection: 1,
            },
        },
        visible: {
            x: 0,
            transition: {
                type: "tween",
                duration: 0.6,
                ease: [0.26, 1, 0.66, 1],
                staggerChildren: 0.05,
                staggerDirection: -1,
            },
        },
    }

    return (
        <>
            {menuOpen && <ScrollPreventer />}

            <StyledNav ref={ref}>
                <StyledButton onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? `close` : `menu`}
                </StyledButton>

                <StyledList
                    initial={false}
                    variants={listVariants}
                    animate={menuOpen ? "visible" : "hidden"}
                >
                    {/* <ListItem text="Work" url="/" onClick={setMenuOpen} />
                    <ListItem text="Play" url="/play" onClick={setMenuOpen} /> */}
                    <ListItem text="Blog" url="/blog" onClick={setMenuOpen} />
                    <ListItem text="Now" url="/now" onClick={setMenuOpen} />
                </StyledList>
            </StyledNav>
        </>
    )
}
