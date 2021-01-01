import SEO from "@components/seo"
import { NotionRenderer } from "@components/notion"
import { PageTitle, PageFooter, PageContainer } from "@components/page"

export async function getStaticProps() {
    const data = await fetch(
        "https://notion-api.splitbee.io/v1/page/43a71af018da4387a9eaa77fc537c966"
    ).then(res => res.json())

    return { props: { data } }
}

export default function Now({ data }) {
    return (
        <>
            <SEO title="Siddharth — What am I up to now?" />

            <PageContainer
                className="notion-small-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ paddingBottom: "max(100px, 12vh)" }}
            >
                <PageTitle style={{ maxWidth: 800 }}>
                    Right now, Siddharth is...
                </PageTitle>
                <NotionRenderer blockMap={data} />
            </PageContainer>

            <PageFooter>
                Copyleft ©{new Date().getFullYear()}, Built on Next.js via
                Notion.
            </PageFooter>
        </>
    )
}
