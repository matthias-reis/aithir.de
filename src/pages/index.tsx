import React, { Fragment } from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

import { Link } from 'gatsby';
import { Head } from '../components';

export default ({ data }) => {
  console.log(data);
  return (
    <Fragment>
      <Head title="Welcome" description="The Blog of Matthias Reis" />
      <h1>Hallo ...</h1>
      {data.allMdx.edges.map(edge => (
        <Link to={edge.node.fields.slug} key={edge.node.id}>
          <h2>{edge.node.frontmatter.title}</h2>
          {edge.node.frontmatter.image && (
            <Img fluid={edge.node.frontmatter.image.childImageSharp.fluid} />
          )}
        </Link>
      ))}
    </Fragment>
  );
};

export const pageQuery = graphql`
  query HomepageQuery {
    allMdx(limit: 3) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
            image {
              childImageSharp {
                fluid(maxWidth: 300, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
