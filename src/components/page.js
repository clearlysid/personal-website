import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const StyledPageTitle = styled(motion.h1)`
    font-family: "Manrope", sans-serif;
    font-weight: 500;
    color: #333333;
    font-size: max(28px, min(4vw, 42px));
    line-height: 1.4em;
    max-width: 1200px;
    padding: 0;
    margin-bottom: 4rem;
`

const StyledPageFooter = styled.footer`
    position: absolute;
    bottom: 20px;
    text-align: center;
    width: 100%;
    opacity: 0.3;
    font-size: 12px;
    font-family: "Manrope", sans-serif;
    font-weight: regular;
    letter-spacing: 0.2px;
    pointer-events: none;
`

const StyledPageContainer = styled(motion.div)`
    max-width: calc(1200px + 4rem);
    margin: 0 auto;
    padding: 0 2rem;
`

export function PageTitle(props) {
    return <StyledPageTitle {...props}>{props.children}</StyledPageTitle>
}

export function PageFooter(props) {
    return <StyledPageFooter {...props}>{props.children}</StyledPageFooter>
}

export function PageContainer(props) {
    return (
        <StyledPageContainer {...props}>{props.children}</StyledPageContainer>
    )
}
