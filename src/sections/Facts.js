import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown';
import Section from '../components/Section';
import { BoxContainer } from '../components/Box';
import markdownRenderer from '../components/MarkdownRenderer';

const FactsContainer = styled.div`
  position: relative;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.25s;
  top: 0;
  display: flex;
  background-color: #f3f3f3;
  margin-bottom: 20px;
  margin-right: 20px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Fact = ({ header, description }) => (
  <FactsContainer padding={2}>
    <Flex
      flexDirection="row"
      maxWidth="220px"
      minHeight="310px"
      justifyContent="space-between"
    >
      <TextContainer>
        <Title pb={1}>{header}</Title>
        <ReactMarkdown
          source={
            description ? description.childMarkdownRemark.rawMarkdownBody : ''
          }
          renderers={markdownRenderer}
        />
      </TextContainer>
    </Flex>
  </FactsContainer>
);

Fact.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Facts = () => (
  <Section.Container id="facts" color="gray">
    <Section.Header name="Fun Facts" Box="notebook" />
    <StaticQuery
      query={graphql`
        query FactsQuery {
          about {
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
      render={({ about }) => (
        <BoxContainer bg="tan">
          <Flex
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-between"
            width="100%"
          >
            {about.funFacts.map((p, i) => (
              <Fade bottom delay={i * 200} key={p.id}>
                <Fact {...p} />
              </Fade>
            ))}
          </Flex>
        </BoxContainer>
      )}
    />
  </Section.Container>
);

export default Facts;
