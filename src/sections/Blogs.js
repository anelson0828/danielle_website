import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Heading, Text } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import { CardContainer, Card } from '../components/Card';
import ImageSubtitle from '../components/ImageSubtitle';

const CoverImage = styled.img`
  width: 100%;
  object-fit: cover;
`;

const SubHeader = styled.div`
  width: 100%;
  background-color: ${props => props.theme.colors.brown};
  padding: 15px;
  margin-bottom: 20px;
  margin-top: 40px;
  color: white;
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
      <Text fontSize={16} fontFamily="Roboto">
        {title}
      </Text>
    </EllipsisHeading>
    {image && <CoverImage src={image} alt={title} />}
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

const Blogs = () => (
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
              image: resize(height: 200, quality: 100) {
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
          healthWriting {
            id
            url
            title
            readTimeMinutes
            image {
              title
              image: resize(height: 200, quality: 100) {
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
      const techPosts = _.orderBy(
        contentfulAbout.writing.map(w => parsePost(w)),
        'sortBy',
        'desc',
      );
      const healthPosts = _.orderBy(
        contentfulAbout.healthWriting.map(w => parsePost(w)),
        'sortBy',
        'desc',
      );

      return (
        <Section.Container id="blogs">
          <Section.Header name="Writing" label="Blogs" />
          <SubHeader>Health</SubHeader>
          <CardContainer minWidth="200px">
            {healthPosts.map(({ Component, ...rest }) => (
              <Fade bottom key={rest.id}>
                <Component {...rest} key={rest.id} />
              </Fade>
            ))}
          </CardContainer>
          <SubHeader>Tech</SubHeader>
          <CardContainer minWidth="200px">
            {techPosts.map(({ Component, ...rest }) => (
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

export default Blogs;
