import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Heading, Text } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import Triangle from '../components/Triangle';
import ImageSubtitle from '../components/ImageSubtitle';

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={['15vh', '10vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="secondary"
      height={['50vh', '40vh']}
      width={['70vw', '40vw']}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={['40vh', '15vh']}
      width={['100vw', '100vw']}
      invertX
      invertY
    />
  </div>
);

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const EllipsisHeading = styled(Heading)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-inline-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Post = ({ title, blurb, image, url, date, time }) => (
  <Card onClick={() => window.open(url, '_blank')} pb={4}>
    <EllipsisHeading m={3} p={1}>
      <Text fontSize={16}>{title}</Text>
    </EllipsisHeading>
    {image && <CoverImage src={image} height="200px" alt={title} />}
    <Text m={3}>{blurb}</Text>
    <ImageSubtitle bg="primary" color="white" x="right" y="bottom" round>
      {`${date} - ${Math.ceil(time)} min read`}
    </ImageSubtitle>
  </Card>
);

Post.propTypes = {
  title: PropTypes.string.isRequired,
  blurb: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string.isRequired,
  date: PropTypes.string,
  time: PropTypes.number,
};

const parsePost = blog => {
  const {
    id,
    url,
    dateString,
    dateUtc,
    title,
    readTimeMinutes,
    blurb,
    image,
  } = blog;
  return {
    id,
    title,
    time: readTimeMinutes,
    date: dateString,
    sortBy: dateUtc,
    blurb: blurb ? blurb.childMarkdownRemark.rawMarkdownBody : '',
    image: image.image.src,
    url,
    Component: Post,
  };
};

const Writing = () => (
  <StaticQuery
    query={graphql`
      query WritingQuery {
        contentfulAbout {
          writing {
            id
            url
            title
            readTimeMinutes
            image {
              title
              image: resize(width: 200, quality: 100) {
                src
              }
            }
            dateString: publishedDate(formatString: "MMM-DD-YYYY")
            dateUtc: publishedDate
            blurb {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      }
    `}
    render={({ contentfulAbout }) => {
      let posts = contentfulAbout.writing.map(w => parsePost(w));
      posts = _.orderBy(posts, 'sortBy', 'desc');

      return (
        <Section.Container id="writing" Background={Background}>
          <Section.Header name="Published Marketing Blogs" label="writing" />
          <CardContainer minWidth="200px">
            {posts.map(({ Component, ...rest }) => (
              <Fade bottom key={rest.id}>
                <Component {...rest} key={rest.id} />
              </Fade>
            ))}
          </CardContainer>
        </Section.Container>
      );
    }}
  />
);

export default Writing;
