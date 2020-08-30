import React from "react"
import App from "../layouts/app"
import { graphql, Link } from 'gatsby';


// ignore for now


const Blog = ({ data }) => (
    <App>
        <div>
            <h1>Welcome to my blog!</h1>
            {data.allNotionPageBlog.edges.map(edge => (
                <Link key={edge.node.slug} to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`}>
                    <div>
                        <p>{edge.node.imageNodes}</p>
                        <h3>{edge.node.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    </App>
)

export default Blog

export const query = graphql`
  query {
    allNotionPageBlog(
      filter: { isDraft: { eq: false } }
      sort: { fields: [indexPage], order: ASC }
    ) {
      edges {
        node {
          title
          slug
          imageNodes {
            localFile {
              absolutePath
            }
          }
        }
      }
    }
  }
`;