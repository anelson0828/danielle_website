import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';
import { Text, Box, Flex } from 'rebass';
import Fade from 'react-reveal/Fade';
import SocialLink from './SocialLink';

const FooterContainer = styled.footer`
  min-width: 320px;
  max-width: 1366px;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: auto;
`;

const TextFooter = styled(Text)`
  color: ${props => props.theme.colors.background};

  & a {
    color: ${props => props.theme.colors.background};
  }
`;

const Footer = () => (
  <StaticQuery
    query={graphql`
      query FooterQuery {
        contentfulAbout {
          name
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
      const { socialLinks } = data.contentfulAbout;

      return (
        <Box p={3} backgroundColor="darkGrey">
          <FooterContainer>
            <Fade left>
              <TextFooter fontSize={[2, 3]}>
                <span>Danielle Nelson - danielletheresenelson@gmail.com</span>
              </TextFooter>
            </Fade>
            <Flex>
              <Fade right>
                {socialLinks.map(({ id, ...rest }) => (
                  <Box mx={[2, 3]} fontSize={[4, 5]} key={id}>
                    <SocialLink {...rest} color="background" />
                  </Box>
                ))}
              </Fade>
            </Flex>
          </FooterContainer>
        </Box>
      );
    }}
  />
);

export default Footer;
