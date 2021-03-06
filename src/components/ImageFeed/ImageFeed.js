// @flow strict
import React from "react";
import moment from "moment";
import { Link } from "gatsby";
import type { Edges } from "../../types";
import styles from "./ImageFeed.module.scss";
import Img from "gatsby-image";
import BackgroundImage from "gatsby-background-image";
import Reveal from "react-reveal";

type Props = {
  edges: Edges
};

const ImageFeed = ({ edges }: Props) => (
  <div className={styles["photofeed"]}>
    {edges.map(edge => (
      <Link
        className={styles["photofeed__item"]}
        to={edge.node.fields.slug}
        key={edge.node.fields.slug}
      >
        <div className={styles["photofeed__item-wrapper"]}>
          {!!edge.node.frontmatter.socialImage &&
          !!edge.node.frontmatter.socialImage.childImageSharp ? (
            <BackgroundImage
              className={styles["photofeed__item-wrapper-background"]}
              fluid={edge.node.frontmatter.socialImage.childImageSharp.fluid}
            />
          ) : (
            <p>Null</p>
          )}
          {/*           <div
            className={styles["photofeed__item-wrapper-background"]}
            style={{
              backgroundImage: `url(https://notes.desktopofsamuel.com/${edge.node.frontmatter.socialImage.childImageSharp.fluid.src})`
            }}
          /> */}
          {/* <BackgroundImage fluid={edge.node.frontmatter.socialImage.childImageSharp.fluid} className={styles["photofeed__item-wrapper-background"]} /> */}
          <Reveal duration={5000} effect="inview">
            <div className={styles["photofeed__item-wrapper-overlay"]} />
          </Reveal>
          <Reveal duration={5000} effect="inview">
            <div className={styles["photofeed__item-wrapper-meta"]}>
              <div className={styles["photofeed__item-wrapper-metawrapper"]}>
                <time
                  className={styles["photofeed__item-wrapper-time"]}
                  dateTime={moment(edge.node.frontmatter.date).format(
                    "MMMM D, YYYY"
                  )}
                >
                  {moment(edge.node.frontmatter.date).format("MMMM YYYY")}
                </time>
                <h2 className={styles["photofeed__item-wrapper-title"]}>
                  {edge.node.frontmatter.title}
                </h2>
                <p className={styles["photofeed__item-wrapper-description"]}>
                  {edge.node.frontmatter.description || edge.node.excerpt}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Link>
    ))}
  </div>
);

export default ImageFeed;
