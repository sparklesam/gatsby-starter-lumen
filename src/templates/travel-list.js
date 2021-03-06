// @flow strict
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import ImageFeed from "../components/ImageFeed";
import Page from "../components/Page";
import { useSiteMetadata } from "../hooks";
import type { AllMarkdownRemark } from "../types";

type Props = {
  data: AllMarkdownRemark,
};

const TravelList = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { edges } = data.allMarkdownRemark;
  return (
    <Layout
      title={`#地圖 | ${siteTitle}`}
      description={siteSubtitle}
      slug="/travel"
    >
      <Sidebar isIndex />
      <Page title="#地圖">
        <ImageFeed edges={edges} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TravelbyCategory {
    allMarkdownRemark(
      filter: {
        frontmatter: {
          template: { eq: "post" }
          draft: { ne: true }
          category: { eq: "地圖" }
          socialImage: { id: { ne: null } }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          excerpt(pruneLength: 200)
          frontmatter {
            title
            date
            category
            description
            socialImage {
              childImageSharp {
                fluid(maxHeight: 500) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default TravelList;

// Filter if Social Image is null
/* socialImage: { ne: null } */
