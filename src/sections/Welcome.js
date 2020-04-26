import React from 'react';
import { Box, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import markdownRenderer from '../components/MarkdownRenderer';

const Welcome = () => (
  <Section.Container id="about" color="lightGreen">
    <Section.Header name="Welcome" label="person" />
    <StaticQuery
      query={graphql`
        query WelcomeQuery {
          contentfulAbout {
            blurb {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      `}
      render={data => {
        const { blurb } = data.contentfulAbout;
        return (
          <Flex flexWrap="wrap" marginLeft="-1.3em" fontSize="18px">
            <Box width={[1, 1, 4 / 6]}>
              <Fade bottom>
                <ReactMarkdown
                  source={blurb.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
              </Fade>
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default Welcome;
