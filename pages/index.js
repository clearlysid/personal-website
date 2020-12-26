import SEO from "@components/seo"
import { motion } from "framer-motion"
import { PageTitle, PageFooter } from "@components/page"

export async function getStaticProps() {
    let data = await fetch(
        `https://notion-api.splitbee.io/v1/table/5a6fc926e63441bf9492f7fb89fdc114`
    ).then(res => res.json())

    if (!process.env.NODE_ENV === "development") {
        data = data.filter(x => x.published)
    }

    return { props: { posts: data } }
}

export default function Home({ posts }) {
    return (
        <>
            <SEO />

            <div className="page-container home">
                <PageTitle style={{ maxWidth: 1100 }}>
                    Siddharth builds prototypes as a UX Engineer Intern with the
                    team at Headout. Here’s what he’s writing...
                </PageTitle>

                {/* render posts here somehow */}
            </div>

            <PageFooter>
                Copyleft ©{new Date().getFullYear()}, Built on Next.js via
                Notion.
            </PageFooter>
        </>
    )
}
