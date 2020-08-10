import React from 'react';

function renderBlockImage(meta) {
    return (
        <div className="nso">
            <img style={{width: "100%"}}
                src={meta.publicImageUrl}
                alt=""
            />
        </div>
    );
}

function renderBlockCode(children, meta) {
    // meta will contain language for future syntax highlighting maybe?
    return <pre><code>{children}</code></pre>
}

function renderBlockText(children) {
    return children.length > 0 && <p className="nso">{children}</p>
}

function renderBlockHeader(children, level) {
    switch (level) {
        case 1:
            return <h1 className="nso">{children}</h1>;
        case 2:
            return <h2 className="nso">{children}</h2>;
        case 3:
            return <h3 className="nso">{children}</h3>;
        default:
            return <h4 className="nso">{children}</h4>;
    }
}

function renderBulletedList(children) {
    return (
        <ul className="nso">{children}</ul>
    );
}

function renderNumberedList(children) {
    return (
        <ol className="nso">{children}</ol>
    );
}

function renderQuote(children) {
    return (
        <blockquote className="nso">{children}</blockquote>
    );
}

function renderToDo(children, meta) {
    return (<div>
        <input type="checkbox" disabled {...(meta.checked === "Yes" && { checked: "checked" })}/>
        <span>{children}</span>
    </div>)
}

function renderCallout(children) {
    return (
        <div>
            <p>{children}</p>
        </div>
    );
}

function renderListItem(children) {
    return <li>{children}</li>;
}

function renderPage(children) {
    return <div>{children}</div>;
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
            return <hr/>;

        case 'callout':
            return renderCallout(children);

        case '__meta':
            // we don't parse this block - it contains the page meta information such as the slug
            return null;

        default:
            console.log('@@@ unknow type to render>renderBlock>', type);
            return null;
    }
}

function mkRenderFuncs(_notionPageBlog) {
    return {
        wrapText: text => {
            return <React.Fragment>{text}</React.Fragment>;
        },
        renderTextAtt: (children, att) => {
            switch (att){
                case 'i':
                    return <span className='nso' style={{ fontStyle: "italic"}}>{children}</span>
                
                case 'b':
                    return <span className='nso' style={{ fontWeight: "bold" }}>{children}</span>;

                case 's':
                    return <span className='nso' style={{ textDecoration: "line-through"}}>{children}</span>;

                case 'c':
                    return <code className='nso'>{children}</code>;

                default:
                    console.log(`@@@ no text attribute for: ${att}`);
                    return null;
            }
        },
        renderLink: (children, ref) => {
            return <a href={ref}>{children}</a>;
        },
        renderBlock: (type, meta, children) => {
            return renderBlock(type, meta, children);
        },
    };
}

const NotionBlockRenderer = ({ data, renderer, debug }) => {
    const { notionPageBlog } = data;
    // console.log(data);
    const renderFuncs = mkRenderFuncs(notionPageBlog);
    const child = renderer.render(renderFuncs);

    return (
        <article style={{
                maxWidth: "800px",
                margin: "0 auto",
                position: "relative"
        }} className="nso">
            <h1 className="nso">{notionPageBlog.title}</h1>
            {child}
        </article>
    );
};

export default NotionBlockRenderer;