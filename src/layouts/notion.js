import React from 'react';
import { graphql } from 'gatsby';
import notionRendererFactory from 'gatsby-source-notionso/lib/renderer';
import App from './app';
import Img from 'gatsby-image';
import BackButton from '../components/backButton';

function renderBlockImage(meta) {
    // return <img style={{width: "100%"}} src={meta.publicImageUrl} alt="" /> for normal img tag
    return <Img className="notion" fluid={meta.childImage} alt="" />
}

function renderBlockCode(children, meta) {
    // meta will contain language for future syntax highlighting maybe?
    return <pre><code>{children}</code></pre>
}

function renderBlockText(children) {
    return children.length > 0 && <p className="notion">{children}</p>
}

function renderBlockHeader(children, level) {
    switch (level) {
        case 1:
            return <h1 className="notion">{children}</h1>
        case 2:
            return <h2 className="notion">{children}</h2>
        case 3:
            return <h3 className="notion">{children}</h3>
        default:
            return <h4 className="notion">{children}</h4>
    }
}

function renderBulletedList(children) {
    return <ul className="notion">{children}</ul>
}

function renderNumberedList(children) {
    return <ol className="notion">{children}</ol>
}

function renderQuote(children) {
    return <blockquote className="notion">{children}</blockquote>
}

function renderToDo(children, meta) {
    return (<div className="notion checkbox">
        {/* <input type="checkbox" disabled {...(meta.checked === "Yes" && { checked: "checked" })}/> */}
        <span style={{ paddingRight: '8px'}}>{ meta.checked === "Yes" ? "☑" : "☐"}</span>
        <span>{children}</span>
    </div>)
}

function renderCallout(children) {
    return <div className="notion callout">{children}</div>
}

function renderListItem(children) {
    return <li>{children}</li>
}

function renderPage(children) {
    return <>{children}</>
}

function renderBlock(type, meta, children) {
    switch (type) {
        case 'page':
            return renderPage(children);
        case 'text':
            return renderBlockText(children);
        case 'code':
            return renderBlockCode(children, meta);
        case 'image':
            return renderBlockImage(meta);
        case 'header':
            return renderBlockHeader(children, 1);
        case 'sub_header':
            return renderBlockHeader(children, 2);
        case 'sub_sub_header':
            return renderBlockHeader(children, 3);
        case 'bulleted_list':
            return renderBulletedList(children);
        case 'numbered_list':
            return renderNumberedList(children);
        case 'numbered_list__item':
            return renderListItem(children);
        case 'bulleted_list__item':
            return renderListItem(children);
        case 'quote':
            return renderQuote(children);
        case 'to_do':
            return renderToDo(children, meta);
        case 'divider':
            return <hr className="notion"/>
        case 'callout':
            return renderCallout(children);
        case '__meta': // we don't parse this block - it contains the page meta information such as the slug
            return null;
        default:
            console.log('@@@ unknow type to render>renderBlock>', type);
            return null;
    }
}

function mkRenderFuncs(npb) {
    return {
        wrapText: text => {
            return <React.Fragment>{text}</React.Fragment>;
        },
        renderTextAtt: (children, att) => {
            switch (att){
                case 'i':
                    return <span className='notion' style={{ fontStyle: "italic" }}>{children}</span>
                case 'b':
                    return <span className='notion' style={{ fontWeight: "bold" }}>{children}</span>;
                case 's':
                    return <span className='notion' style={{ textDecoration: "line-through" }}>{children}</span>;
                case 'c':
                    return <code className='notion'>{children}</code>;
                default:
                    console.log(`@@@ no text attribute for: ${att}`);
                    return null;
            }
        },
        renderLink: (children, ref) => {
            return <a href={ref}>{children}</a>;
        },
        renderBlock: (type, meta, children, npb) => {
            return renderBlock(type, meta, children, npb);
        },
    };
}

const NotionBlockRenderer = ({ data, renderer }) => {
    const { notionPageBlog } = data;
    const renderFuncs = mkRenderFuncs(notionPageBlog);
    const child = renderer.render(renderFuncs);
    return <main className="notion">{child}</main>
};

export default function NotionArticle({ data, pageContext }) {
    const notionRenderer = notionRendererFactory({ notionPage: data.notionPageBlog });

    return (
        <App>

            <BackButton />
            <article className="notion">
                <h1 className="notion main-title">{data.notionPageBlog.title}</h1>
                <Img className="notion main-image" fluid={data.notionPageBlog.imageNodes[0].localFile.childImageSharp.fluid} />

                <NotionBlockRenderer data={data} renderer={notionRenderer} />
            </article>
        </App>
    );
};

export const query = graphql`
    query($pageId: String!) {
        notionPageBlog(pageId: { eq: $pageId }) {
            blocks {
                blockId
                blockIds
                type
                attributes {
                    att
                    value
                }
                properties {
                    propName
                    value {
                        text
                        atts {
                            att
                            value
                        }
                    }
                }
            }
            imageNodes {
                imageUrl
                localFile {
                    publicURL
                    childImageSharp {
                        fluid(maxWidth: 1000) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
            pageId
            slug
            title
            isDraft
            id
            indexPage
        }
    }
`;