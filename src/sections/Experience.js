import React from 'react';
import PropTypes from 'prop-types';
import { Text, Flex, Image, Box as GridItem, Button } from 'rebass';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';
import ReactMarkdown from 'react-markdown';
import Section from '../components/Section';
import { Job as JobBox } from '../components/Job';
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
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display: table;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const Job = ({ title, dates, location, companyInfo, description, icon }) => (
  <JobBox marginTop={3} padding={2}>
    <TextContainer>
      <Text>
        <Image
          src={icon.image.src}
          alt={icon.title}
          marginTop={1}
          verticalAlign="center"
          style={{
            maxWidth: '120px',
            maxHeight: '40px',
            marginRight: '15px',
          }}
        />
        {'-   '}
        {companyInfo}
      </Text>
      <Title marginTop={2}>{title}</Title>
      <Flex flexWrap="wrap" justifyContent="space-between">
        <GridItem py={2} width={1 / 2}>
          {dates}
        </GridItem>
        <GridItem py={2}>{location}</GridItem>
        <GridItem width={2 / 2}>
          <ReactMarkdown
            source={description.childMarkdownRemark.rawMarkdownBody}
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
  icon: PropTypes.shape({
    image: PropTypes.shape({
      src: PropTypes.string,
    }),
    title: PropTypes.string,
  }).isRequired,
};

const Experience = () => (
  <Section.Container id="experience" Background={Background}>
    <Section.Header name="Experience" Box="notebook" />
    <StaticQuery
      query={graphql`
        query ExperienceQuery {
          contentfulAbout {
            experience {
              id
              title
              company
              dates
              location
              companyInfo
              icon {
                title
                image: resize(height: 50, quality: 100) {
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
        <div>
          {contentfulAbout.experience.map((p, i) => (
            <Fade bottom delay={i * 200} key={p.id}>
              <Job {...p} />
            </Fade>
          ))}
          <Button
            marginTop={3}
            style={{ backgroundColor: '#273C6B' }}
            onClick={() => window.open('/resume.pdf')}
          >
            Download Resume
          </Button>
        </div>
      )}
    />
  </Section.Container>
);

export default Experience;
