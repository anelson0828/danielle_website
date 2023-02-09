import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading } from 'rebass';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import markdownRenderer from '../components/MarkdownRenderer';
import Section from '../components/Section';

const LandingPage = () => (
  <Section.Container id="home" color="lightGreen">
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulAbout {
            description
            blurb {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      `}
      render={data => {
        const { description, blurb } = data.about;

        return (
          <div
            style={{
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingTop: '100px',
              paddingBottom: '100px',
            }}
          >
            <Heading
              textAlign="center"
              verticalAlign="center"
              as="h2"
              fontSize={[6, 7, 7]}
              width="100%"
              paddingTop="40px"
              fontFamily="Quicksand"
              fontWeight="300"
              letterSpacing="4px"
              color="#F3F3F3"
            >
              {description.toUpperCase()}
            </Heading>
            <div
              style={{
                textAlign: 'center',
                color: '#F3F3F3',
                fontSize: '20px',
              }}
            >
              <Fade bottom>
                <ReactMarkdown
                  source={blurb.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
              </Fade>
            </div>
          </div>
        );
      }}
    />
  </Section.Container>
);

export default LandingPage;
