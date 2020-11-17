import React from "react";
import Codeblock from "@components/codeblock";


const types = ["video", "image", "embed", "figma", "codepen"];

const Asset = ({ block, mapImageUrl = defaultMapImageUrl}) => {
    const value = block.value;
    const type = block.value.type;

    if (!types.includes(type)) return null;

    const format = value.format;
    const { display_source = undefined, block_aspect_ratio = undefined, block_height = 1, block_width = 1 } = format ?? {};

    const aspectRatio = block_aspect_ratio || block_height / block_width;

    if (type === "embed" || type === "video" || type === "codepen") {
        return (
            <div style={{ paddingBottom: `${aspectRatio * 100}%`, position: "relative", minHeight: "400px"}} >
                <iframe className="notion-image-inset" src={ display_source } style={{ height: '100%'}} />
            </div>
        );
	}
	
	if (type === "figma") {
		return <iframe className="notion" src={value.properties.source[0][0]} style={{ height: '500px' }}></iframe>
	}

    if (block.value.type === "image") {
        const src = mapImageUrl(value.properties.source[0][0], block);
        const caption = value.properties.caption?.[0][0];
		return <img alt={caption} src={src} />;
    }

    return null;
};

const classNames = (...classes) => classes.filter((a) => !!a).join(" ");
const getTextContent = (text) => text.reduce((prev, current) => prev + current[0], "");

const groupBlockContent = (blockMap) => {
    const output = [];

    let lastType = undefined;
    let index = -1;

    Object.keys(blockMap).forEach((id) => {
        blockMap[id].value.content?.forEach((blockId) => {
            const blockType = blockMap[blockId]?.value?.type;
            if (blockType && blockType !== lastType) {index++; lastType = blockType; output[index] = [];}
            output[index].push(blockId);
        });

        lastType = undefined;
    });

    return output;
};

export const getListNumber = (blockId, blockMap) => {
    const groups = groupBlockContent(blockMap);
    const group = groups.find((g) => g.includes(blockId));

    if (!group) return;

    return group.indexOf(blockId) + 1;
};

const defaultMapImageUrl = (image = "", block) => {
    const url = new URL(`https://www.notion.so${image.startsWith("/image") ? image : `/image/${encodeURIComponent(image)}`}`);

    if (block && !image.includes("/images/page-cover/")) {
        const table = block.value.parent_table === "space" ? "block" : block.value.parent_table;
        url.searchParams.set("table", table);
        url.searchParams.set("id", block.value.id);
        url.searchParams.set("cache", "v2");
    }

    return url.toString();
};

const defaultMapPageUrl = (pageId = "") => {
    pageId = pageId.replace(/-/g, "");
    return `/${pageId}`;
};

const createRenderChildText = (customDecoratorComponents) => (properties) => {
    return properties?.map(([text, decorations], i) => {
        if (!decorations) return <React.Fragment key={i}>{text}</React.Fragment>;

        return decorations.reduceRight((element, decorator) => {
            const renderText = () => {
                switch (decorator[0]) {
                    case "h":
                        return <span key={i} className={`notion-${decorator[1]}`}>{element}</span>;
                    case "c":
                        return <code key={i} className="notion">{element}</code>;
                    case "b":
                        return <b key={i}>{element}</b>;
                    case "i":
                        return <em key={i}>{element}</em>;
                    case "s":
                        return <s key={i}>{element}</s>;
                    case "a":
                        return <a className="notion-link" href={decorator[1]} key={i}>{element}</a>;
                    default:
                        return <React.Fragment key={i}>{element}</React.Fragment>;
                }
            };

            const CustomComponent = customDecoratorComponents?.[decorator[0]];

            if (CustomComponent) {
                const props = decorator[1] ? { decoratorValue: decorator[1] } : {};
                return <CustomComponent key={i} {...props} renderComponent={renderText}>{text}</CustomComponent>;
            }

            return renderText();
        }, <>{text}</>);
    });
};

export const Block = (props) => {
    const { block, children, level, fullPage, blockMap, mapPageUrl, mapImageUrl, customBlockComponents, customDecoratorComponents } = props;
    const blockValue = block?.value;

    const renderComponent = () => {
        const renderChildText = createRenderChildText(
            customDecoratorComponents
        );

        switch (blockValue?.type) {
            case "page":
                if (level === 0) {
                    if (fullPage) {
                        if (!blockValue.properties) return null;

                        const { page_cover, page_cover_position, page_full_width, page_small_text } = blockValue.format || {};

                        return (
                            <div className="notion">
                                <main className={classNames(
                                        "notion-page", !page_cover && "notion-page-offset", page_full_width && "notion-full-width", page_small_text && "notion-small-text"
                                    )}>
                                    <div className="notion-title">
                                        {renderChildText(blockValue.properties.title)}
                                    </div>

                                    {children}
                                </main>
                            </div>
                        );
                    } else {
                        return <main className="notion">{children}</main>;
                    }
                } else {
                    return null;
                }
            case "header":
                if (!blockValue.properties) return null;
                return <h1 className="notion">{renderChildText(blockValue.properties.title)}</h1>;
            case "sub_header":
                if (!blockValue.properties) return null;
                return <h2 className="notion">{renderChildText(blockValue.properties.title)}</h2>;
            case "sub_sub_header":
                if (!blockValue.properties) return null;
                return <h3 className="notion">{renderChildText(blockValue.properties.title)}</h3>;
            case "divider":
                return <hr className="notion" />;
            case "text":
                if (!blockValue.properties) return null;
                
                const blockColor = blockValue.format?.block_color;
                return <p className={classNames(`notion-text`, blockColor && `notion-${blockColor}` )}>
                        {renderChildText(blockValue.properties.title)}
					</p>;
					
            case "bulleted_list":
            case "numbered_list":
                const wrapList = (content, start) =>
                    blockValue.type === "bulleted_list" ? <ul className="notion">{content}</ul> : <ol start={start} className="notion">{content}</ol>;

                let output = null;

                if (blockValue.content) {
                    output = (
                        <>
                            {blockValue.properties && <li>{renderChildText(blockValue.properties.title)}</li>}
                            {wrapList(children)}
                        </>
                    );
                } else {
                    output = blockValue.properties ? <li>{renderChildText(blockValue.properties.title)}</li> : null;
                }

                const isTopLevel = block.value.type !== blockMap[block.value.parent_id].value.type;
                const start = getListNumber(blockValue.id, blockMap);
                return isTopLevel ? wrapList(output, start) : output;

			case "codepen":
            case "embed":
            case "figma":
            case "video":
                const value = block.value;

                return (
                    <figure
                        className="notion-asset-wrapper"
                        style={ value.format !== undefined ? { width: value.format.block_width } : undefined } >
                        <Asset block={block} mapImageUrl={mapImageUrl} />

                        {value.properties.caption && (
                            <figcaption className="notion-image-caption">
                                {renderChildText(value.properties.caption)}
                            </figcaption>
                        )}
                    </figure>
				);
			case "image":
				const val = block.value;
				return (
					<figure style={{ margin: '2rem auto' }}>

						<Asset block={block} mapImageUrl={mapImageUrl} />

						{val.properties.caption && (
                            <figcaption className="notion-image-caption">
                                {renderChildText(val.properties.caption)}
                            </figcaption>
                        )}

					</figure>
				)

            case "code": {
                if (blockValue.properties.title) {

                    const content = blockValue.properties.title[0][0];
					const language = blockValue.properties.language[0][0];

					if (language == "VB.Net") {
						return <div dangerouslySetInnerHTML={{ __html: content }} />
					} else {
						return <Codeblock key={blockValue.id} language={language || ""} code={content} />;
					}
                }
                break;
            }
            case "column_list":
                return <div className="notion-row">{children}</div>;
            case "column":
                const spacerWith = 24;
                const ratio = blockValue.format.column_ratio;
                const columns = Number((1 / ratio).toFixed(0));
                const spacerTotalWith = (columns - 1) * spacerWith;
                const width = `calc((100% - ${spacerTotalWith}px) * ${ratio})`;
                return (
                    <>
                        <div className="notion-column" style={{ width }}>{children}</div>
                        <div className="notion-spacer" style={{ width: spacerWith }} />
                    </>
                );
            case "quote":
                if (!blockValue.properties) return null;
                return (
                    <blockquote className="notion">
                        {renderChildText(blockValue.properties.title)}
                    </blockquote>
                );
            case "collection_view":
                if (!block) return null;

                const collectionView = block?.collection?.types[0];

                return (
                    <div>
                        <h3 className="notion">
                            {renderChildText(block.collection?.title)}
                        </h3>

                        {collectionView?.type === "table" && (
                            <div style={{ maxWidth: "100%", marginTop: 5 }}>
                                <table className="notion-table">
                                    <thead>
                                        <tr className="notion-tr">
                                            {collectionView.format?.table_properties
                                                ?.filter((p) => p.visible)
                                                .map((gp, index) => (
                                                    <th
                                                        className="notion-th"
                                                        key={index}
                                                        style={{
                                                            minWidth: gp.width,
                                                        }}
                                                    >
                                                        {
                                                            block.collection
                                                                ?.schema[
                                                                gp.property
                                                            ]?.name
                                                        }
                                                    </th>
                                                ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {block?.collection?.data.map(
                                            (row, index) => (
                                                <tr
                                                    className="notion-tr"
                                                    key={index}
                                                >
                                                    {collectionView.format?.table_properties
                                                        ?.filter(
                                                            (p) => p.visible
                                                        )
                                                        .map((gp, index) => (
                                                            <td
                                                                key={index}
                                                                className={
                                                                    "notion-td " +
                                                                    (gp.property ===
                                                                    "title"
                                                                        ? "notion-bold"
                                                                        : "")
                                                                }
                                                            >
                                                                {renderChildText(
                                                                    row[
                                                                        block
                                                                            .collection
                                                                            ?.schema[
                                                                            gp
                                                                                .property
                                                                        ]?.name
                                                                    ]
                                                                )}
                                                            </td>
                                                        ))}
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {collectionView?.type === "gallery" && (
                            <div className="notion-gallery">
                                {block.collection?.data.map((row, i) => (
                                    <div
                                        key={`col-${i}`}
                                        className="notion-gallery-card"
                                    >
                                        <div className="notion-gallery-content">
                                            {collectionView.format?.gallery_properties
                                                ?.filter((p) => p.visible)
                                                .map((gp, idx) => (
                                                    <p
                                                        key={idx + "item"}
                                                        className={
                                                            "notion-gallery-data " +
                                                            (idx === 0
                                                                ? "is-first"
                                                                : "")
                                                        }
                                                    >
                                                        {getTextContent(
                                                            row[
                                                                block.collection
                                                                    ?.schema[
                                                                    gp.property
                                                                ].name
                                                            ]
                                                        )}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            case "callout":
                return (
                    <div className="notion callout">
                        {renderChildText(blockValue.properties.title)}
                    </div>
                );
            case "bookmark":
                const link = blockValue.properties.link;
                const title = blockValue.properties.title ?? link;
                const description = blockValue.properties.description;
                const block_color = blockValue.format?.block_color;
                const bookmark_icon = blockValue.format?.bookmark_icon;
                const bookmark_cover = blockValue.format?.bookmark_cover;

                return (
                    <div className="notion-row">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            className={classNames(
                                "notion-bookmark",
                                block_color && `notion-${block_color}`
                            )}
                            href={link[0][0]}
                        >
                            <div>
                                <div className="notion-bookmark-title">
                                    {renderChildText(title)}
                                </div>
                                {description && (
                                    <div className="notion-bookmark-description">
                                        {renderChildText(description)}
                                    </div>
                                )}

                                <div className="notion-bookmark-link">
                                    {bookmark_icon && (
                                        <img
                                            src={bookmark_icon}
                                            alt={getTextContent(title)}
                                        />
                                    )}
                                    <div>{renderChildText(link)}</div>
                                </div>
                            </div>
                            {bookmark_cover && (
                                <div className="notion-bookmark-image">
                                    <img
                                        src={bookmark_cover}
                                        alt={getTextContent(title)}
                                    />
                                </div>
                            )}
                        </a>
                    </div>
                );
            case "toggle":
                return (
                    <details className="notion toggle">
                        <summary>
                            {renderChildText(blockValue.properties.title)}
                        </summary>
                        <div>{children}</div>
                    </details>
                );
            case "to_do":
                // console.log(blockValue);
                return (
                    <div className="notion checkbox">
                        {/* {meta.checked === "Yes"
            ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 459 459"><path d="M124.95 181.05l-35.7 35.7L204 331.5l255-255-35.7-35.7L204 260.1l-79.05-79.05zM408 408H51V51h255V0H51C22.95 0 0 22.95 0 51v357c0 28.05 22.95 51 51 51h357c28.05 0 51-22.95 51-51V204h-51v204z"/></svg> : */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 459 459"
                        >
                            <path d="M408 51v357H51V51h357m0-51H51C22.95 0 0 22.95 0 51v357c0 28.05 22.95 51 51 51h357c28.05 0 51-22.95 51-51V51c0-28.05-22.95-51-51-51z" />
                        </svg>
                        <span>
                            {renderChildText(blockValue.properties.title)}
                        </span>
                    </div>
                );
            default:
                if (process.env.NODE_ENV !== "production") console.log("Unsupported type " + block?.value?.type);
                return <div />;
        }
        return null;
    };

    // render a custom component first if passed + do not use custom component for base page block
    if (customBlockComponents && customBlockComponents[blockValue?.type] && level !== 0) {
        const CustomComponent = customBlockComponents[blockValue?.type];
        return (
            <CustomComponent renderComponent={renderComponent} blockValue={blockValue}>
                {children}
            </CustomComponent>
        );
    }

    return renderComponent();
};

export const NotionRenderer = ({ level = 0, currentId, mapPageUrl, mapImageUrl, ...props }) => {
    const { blockMap } = props;
    const id = currentId || Object.keys(blockMap)[0];
    const currentBlock = blockMap[id];

    if (!currentBlock) {
        if (process.env.NODE_ENV !== "production") console.warn("error rendering block", currentId);
        return null;
    }

    return (
        <Block key={id} level={level} block={currentBlock} mapPageUrl={mapPageUrl} mapImageUrl={mapImageUrl} {...props} >
            {currentBlock?.value?.content?.map((contentId) => (
                <NotionRenderer key={contentId} currentId={contentId} level={level + 1} mapPageUrl={mapPageUrl} mapImageUrl={mapImageUrl} {...props} />
            ))}
        </Block>
    );
};