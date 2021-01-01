import React from "react"
import styled from "styled-components"
import Link from "next/link"
import { motion } from "framer-motion"

const StyledButton = styled(motion.a)`
    position: fixed;
    top: 0;
    left: 0;
    padding: 2rem;
    z-index: 1;
    font-weight: 500;
    opacity: 0.4;
`

export default function BackButton({ text = "back to portfolio", link = "/" }) {
    return (
        <Link href={link} scroll={false}>
            <StyledButton
                initial={{ opacity: 0, y: "-40px" }}
                animate={{ opacity: 0.3, y: 0 }}
                exit={{ opacity: 0, y: "-40px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {text}
            </StyledButton>
        </Link>
    )
}
