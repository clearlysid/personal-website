import React from "react"
import App from "../layouts/app"
import { graphql, Link } from 'gatsby';

const Blog = ({ data }) => (
    <App>

        <h1>Welcome to my blog!</h1>
     
        {data.allNotionPageBlog.edges.map(edge => (

            <Link key={edge.node.slug} to={`/blog/${edge.node.title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-')}`}>
                <h3>{edge.node.title}</h3>
            </Link>

        ))}

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
        }
      }
    }
  }
`;