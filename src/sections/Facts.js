import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Image } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown';
import Section from '../components/Section';
import { BoxContainer, Box } from '../components/Box';
import Triangle from '../components/Triangle';
import markdownRenderer from '../components/MarkdownRenderer';

const Background = () => (
  <div>
    <Triangle
      color="secondary"
      height={['80vh', '80vh']}
      width={['100vw', '100vw']}
      invertX
    />

    <Triangle
      color="background"
      height={['50vh', '20vh']}
      width={['50vw', '50vw']}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={['75vh', '70vh']}
      width={['100vw', '100vw']}
      invertY
    />
  </div>
);

const Title = styled(Text)`
  font-size: 20px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 600px;
`;

const Fact = ({ header, description, icon }) => (
  <Box p={0}>
    <Flex>
      <TextContainer>
        <Title pb={1} marginBottom={2}>
          <Image
            src={icon.image.src}
            alt={icon.title}
            marginTop={1}
            verticalAlign="bottom"
            style={{
              height: '25px',
              width: '25px',
              marginRight: '15px',
            }}
          />
          {header}
        </Title>
        <Text>
          <ReactMarkdown
            source={
              description ? description.childMarkdownRemark.rawMarkdownBody : ''
            }
            renderers={markdownRenderer}
          />
        </Text>
      </TextContainer>
    </Flex>
  </Box>
);

Fact.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
};

const Facts = () => (
  <Section.Container id="facts" Background={Background}>
    <Section.Header name="Facts" Box="notebook" />
    <StaticQuery
      query={graphql`
        query FactsQuery {
          contentfulAbout {
            facts {
              id
              header
              icon {
                title
                image: resize(width: 200, quality: 100) {
                  src
                }
              }
              description {
                childMarkdownRemark {
                  rawMarkdownBody
                }
              }
            }
          }
        }
      `}
      render={({ contentfulAbout }) => (
        <BoxContainer minWidth="550px">
          {contentfulAbout.facts.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Fact {...p} />
            </Fade>
          ))}
        </BoxContainer>
      )}
    />
  </Section.Container>
);

export default Facts;
