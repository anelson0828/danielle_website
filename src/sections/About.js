import React from 'react';
import { Box, Image, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import markdownRenderer from '../components/MarkdownRenderer';
import SocialLink from '../components/SocialLink';

const ProfilePicture = styled(Image)`
  border-radius: 10%;
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const About = () => (
  <Section.Container id="about">
    <Section.Header name="About me" label="person" />
    <StaticQuery
      query={graphql`
        query AboutMeQuery {
          contentfulAbout {
            aboutMe {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            profile {
              title
              image: resize(width: 650, quality: 100) {
                src
              }
            }
            socialLinks {
              id
              url
              name
              fontAwesomeIcon
            }
          }
        }
      `}
      render={data => {
        const { aboutMe, profile, socialLinks } = data.contentfulAbout;
        return (
          <Flex flexWrap="wrap" fontSize="18px">
            <Box width={[1, 1, 4 / 6]}>
              <Fade bottom>
                <ReactMarkdown
                  source={aboutMe.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
              </Fade>
            </Box>

            <Box
              width={[1, 1, 2 / 6]}
              style={{ maxWidth: '300px', margin: 'auto' }}
            >
              <Fade right>
                <ProfilePicture
                  src={profile.image.src}
                  alt={profile.title}
                  ml={[0, 0, 1]}
                />
              </Fade>
              <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
                {socialLinks.map(({ id, ...rest }) => (
                  <Box mx={3} fontSize={[4, 5, 5]} key={id}>
                    <SocialLink {...rest} />
                  </Box>
                ))}
              </Flex>
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default About;
