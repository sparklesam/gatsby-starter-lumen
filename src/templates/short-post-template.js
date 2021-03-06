// @flow strict
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import ShortPost from "../components/ShortPost";
import { useSiteMetadata } from "../hooks";
import type { MarkdownRemark } from "../types";

type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};

const ShortPostTemplate = ({ data }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter } = data.markdownRemark;
  const {
    title: postTitle,
    description: postDescription,
    socialImage
  } = frontmatter;
  const metaDescription =
    postDescription !== null ? postDescription : data.markdownRemark.excerpt;

  return (
    <Layout
      title={`${postTitle} | ${siteTitle} | ${siteSubtitle}`}
      description={metaDescription}
      socialImage={socialImage}
    >
      <ShortPost post={data.markdownRemark} />
    </Layout>
  );
};

export const query = graphql`
  query ShortPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      excerpt
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        # socialImage
        url
      }
      excerpt
    }
  }
`;

export default ShortPostTemplate;
