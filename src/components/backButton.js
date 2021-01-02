import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { motion } from "framer-motion"

const StyledLink = styled(motion.a)`
    color: #333333;
    position: relative;
    position: fixed;
    top: 0;
    left: 0;
    font-size: max(16px, min(1.8vw, 20px));
    padding: 2em;
    z-index: 1;
    font-weight: 500;
    cursor: pointer;

    &::before {
        content: "";
        position: absolute;
        background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.62 2.99004C16.5039 2.87363 16.366 2.78127 16.2141 2.71826C16.0622 2.65524 15.8994 2.6228 15.735 2.6228C15.5706 2.6228 15.4078 2.65524 15.2559 2.71826C15.1041 2.78127 14.9661 2.87363 14.85 2.99004L6.54 11.3C6.4473 11.3926 6.37375 11.5024 6.32357 11.6234C6.27339 11.7444 6.24756 11.8741 6.24756 12.005C6.24756 12.136 6.27339 12.2657 6.32357 12.3867C6.37375 12.5076 6.4473 12.6175 6.54 12.71L14.85 21.02C15.34 21.51 16.13 21.51 16.62 21.02C17.11 20.53 17.11 19.74 16.62 19.25L9.38 12L16.63 4.75004C17.11 4.27004 17.11 3.47004 16.62 2.99004Z' fill='%23333333'/%3E%3C/svg%3E");
        background-size: contain;
        top: 2.2em;
        left: 1em;
        height: 0.8em;
        width: 0.8em;
        transition: all 0.3s ease-out;
    }

    @media (min-width: 700px) {
        &::before {
            opacity: 0;
        }

        &:hover::before {
            opacity: 1;
        }
    }
`

export default function BackButton({ text = "back", link = "/" }) {
    return (
        <Link href={link} scroll={false}>
            <StyledLink
                whileHover={{
                    x: "10px",
                    transition: {
                        duration: 0.3,
                        ease: "easeOut",
                        type: "tween",
                    },
                }}
            >
                {text}
            </StyledLink>
        </Link>
    )
}
