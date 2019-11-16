import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Image } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown';
import Section from '../components/Section';
import { BoxContainer } from '../components/Box';
import Triangle from '../components/Triangle';
import markdownRenderer from '../components/MarkdownRenderer';
import { Job as JobBox } from '../components/Job';

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
`;

const Fact = ({ header, description, icon }) => (
  <JobBox marginTop={3} padding={2} minHeight={300} minWidth={375}>
    <Flex flex-basis={400} flex-grow={1}>
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
  </JobBox>
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
    <div style={{ marginTop: 100 }}>
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
          <BoxContainer>
            <Flex
              flexDirection="row"
              flexWrap="wrap"
              justifyContent="space-between"
            >
              {contentfulAbout.facts.map((p, i) => (
                <Fade bottom delay={i * 200} key={p.id}>
                  <Fact {...p} />
                </Fade>
              ))}
            </Flex>
          </BoxContainer>
        )}
      />
    </div>
  </Section.Container>
);

export default Facts;
