import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Box as GridItem, Heading } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown';
import Section from '../components/Section';
import { Job as JobBox } from '../components/Job';
import markdownRenderer from '../components/MarkdownRenderer';

const Title = styled(Text)`
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  display: table;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Job = ({ title, dates, location, companyInfo, description }) => (
  <JobBox marginTop={3} padding={2}>
    <TextContainer>
      <Text>{companyInfo}</Text>
      <Title marginTop={2}>{title}</Title>
      <Flex flexWrap="wrap" justifyContent="space-between">
        <GridItem py={2} width={1 / 2}>
          {dates}
        </GridItem>
        <GridItem py={2}>{location}</GridItem>
        <GridItem width={2 / 2}>
          <ReactMarkdown
            source={
              description ? description.childMarkdownRemark.rawMarkdownBody : ''
            }
            renderers={markdownRenderer}
          />
        </GridItem>
      </Flex>
    </TextContainer>
  </JobBox>
);

Job.propTypes = {
  title: PropTypes.string.isRequired,
  dates: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  companyInfo: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

const Experience = () => (
  <Section.Container id="experience" color="green">
    <Section.Header name="Experience" Box="notebook" color="background" />
    <StaticQuery
      query={graphql`
        query ExperienceQuery {
          contentfulAbout {
            experience {
              id
              title
              dates
              location
              companyInfo
              description {
                childMarkdownRemark {
                  rawMarkdownBody
                }
              }
            }
            eventsBoxes {
              id
              title
              dates
              location
              companyInfo
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
        <div>
          {contentfulAbout.experience.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Job {...p} />
            </Fade>
          ))}
          <Heading color="background" mt={4}>
            Events
          </Heading>
          {contentfulAbout.eventsBoxes.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Job {...p} />
            </Fade>
          ))}
          {/* <Button
            marginTop={3}
            style={{ backgroundColor: '#273C6B' }}
            onClick={() => window.open('media/resume.pdf')}
          >
            Download Resume
          </Button> */}
        </div>
      )}
    />
  </Section.Container>
);

export default Experience;
