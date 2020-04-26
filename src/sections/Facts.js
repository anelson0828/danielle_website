import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown';
import Section from '../components/Section';
import { BoxContainer } from '../components/Box';
import markdownRenderer from '../components/MarkdownRenderer';
import { Job as JobBox } from '../components/Job';

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

const Fact = ({ header, description }) => (
  <JobBox marginTop={3} padding={2} minHeight={300} minWidth={270}>
    <Flex flex-basis={400} flex-grow={1}>
      <TextContainer>
        <Title pb={1} marginBottom={2}>
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
};

const Facts = () => (
  <Section.Container id="facts" color="tan">
    <div>
      <Section.Header name="Fun Facts" Box="notebook" />
      <StaticQuery
        query={graphql`
          query FactsQuery {
            contentfulAbout {
              funFacts {
                id
                header
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
              {contentfulAbout.funFacts.map((p, i) => (
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
