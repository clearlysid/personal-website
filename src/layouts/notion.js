import React from 'react';
import { graphql } from 'gatsby';
import notionRendererFactory from 'gatsby-source-notionso/lib/renderer';
import App from './app';
import NotionBlockRenderer from '../components/notionBlockRenderer';

const NotionArticle = ({ data, pageContext }) => {
    const notionRenderer = notionRendererFactory({ notionPage: data.notionPageBlog, });
    return (
        <App>
            <NotionBlockRenderer
                data={data}
                renderer={notionRenderer}
                debug={false}
            />
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

export default NotionArticle;