import React from 'react';
import { graphql } from 'gatsby';
import notionRendererFactory from 'gatsby-source-notionso/lib/renderer';
import Img from 'gatsby-image';
import SmoothScroll from '../components/smoothScroll';
import SEO from '../components/seo';
import BackButton from '../components/backButton';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/atom-one-light.css';


function renderBlockImage(meta) {
    if (meta.childImage) {
        return <Img className="notion" fluid={meta.childImage} alt="" />
    } else {
        return <img className="notion" style={{width: "100%", height: "auto"}} src={meta.publicImageUrl} alt="" />
    }
}

function renderBlockCode(meta) {

    hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
    hljs.registerLanguage('scss', require('highlight.js/lib/languages/scss'));
    hljs.registerLanguage('processing', require('highlight.js/lib/languages/processing'));
    hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));
    hljs.registerLanguage('bash', require('highlight.js/lib/languages/bash'));
    hljs.registerLanguage('plaintext', require('highlight.js/lib/languages/plaintext'));
    hljs.registerLanguage('json', require('highlight.js/lib/languages/json'));

    const notionLanguageToHljs = {
        'plain text': 'plaintext',
        javascript: 'javascript',
        bash: 'bash',
        html: 'xml',
        processing: 'processing',
        scss: 'scss',
        css: 'scss',
        json: 'json',
    };

    const hljslanguage = notionLanguageToHljs[meta.language.toString().toLowerCase()] || 'plaintext';
    const highlightedCode = hljs.highlight(hljslanguage, meta.title).value;

    return <pre dangerouslySetInnerHTML={{ __html: `<code>${highlightedCode}</code>` }} />

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
            {meta.checked === "Yes"
            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459"><path d="M124.95 181.05l-35.7 35.7L204 331.5l255-255-35.7-35.7L204 260.1l-79.05-79.05zM408 408H51V51h255V0H51C22.95 0 0 22.95 0 51v357c0 28.05 22.95 51 51 51h357c28.05 0 51-22.95 51-51V204h-51v204z"/></svg>
            : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459"><path d="M408 51v357H51V51h357m0-51H51C22.95 0 0 22.95 0 51v357c0 28.05 22.95 51 51 51h357c28.05 0 51-22.95 51-51V51c0-28.05-22.95-51-51-51z"/></svg>}
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
            return renderBlockCode(meta);
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
        case 'meta':
            return null;
        default:
            // console.log("Can't render this:", type, children, meta);
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
                    // console.log(`@@@ no text attribute for: ${att}`);
                    return null;
            }
        },
        renderLink: (children, ref) => {
            return <a href={ref} target="_blank" rel="noreferrer">{children}</a>;
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
        <>
            <SEO title={`${data.notionPageBlog.title} — Siddharth's Blog`}
                image={data.notionPageBlog.imageNodes[0].localFile.publicURL}
                url={`https://siddharth.fyi/${pageContext.pathSlug}`}
                description={data.notionPageBlog.excerpt}
                />

            <BackButton />

            <SmoothScroll>
                <article className="notion">
                    <h1 className="notion main-title">{data.notionPageBlog.title}</h1>
                    <div className="notion main-date">October 3rd, 2020</div>
                    <Img className="notion main-image" fluid={data.notionPageBlog.imageNodes[0].localFile.childImageSharp.fluid} />
                    <NotionBlockRenderer data={data} renderer={notionRenderer} />

                    <footer className="notion main-footer">
                        <hr className="notion"/>
                        <h3 className="notion">Thanks for reading!</h3>
                        <p className="notion">Shoot me an email if you have any suggestions, feedback or just want to send me your Among Us room code 😁</p>
                        <p className="notion" style={{fontStyle: 'normal'}}>✉️ <a href='mailto:hey@siddharthjha.com'>hey@siddharth.fyi</a></p>
                    </footer>
                    
                </article>
            </SmoothScroll>
        </>
    );
};

export const query = graphql`
    query($pageId: String!) {
        notionPageBlog(pageId: { eq: $pageId }) {
            pageId
            slug
            title
            isDraft
            id
            indexPage
            excerpt
            createdAt(formatString: "MMMM Do, YYYY")
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
                        fluid(maxWidth: 2000) {
                            ...GatsbyImageSharpFluid_withWebp
                        }
                    }
                }
            }
        }
    }
`;