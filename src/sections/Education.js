import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import ReactMarkdown from 'react-markdown';
import Fade from 'react-reveal/Fade';
import Section from '../components/Section';
import markdownRenderer from '../components/MarkdownRenderer';

const Education = () => (
  <Section.Container id="education">
    <Section.Header name="Education" label="person" />
    <StaticQuery
      query={graphql`
        query EducationQuery {
          contentfulAbout {
            education {
              id
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
          }
        }
      `}
      render={data => {
        const { education } = data.about;
        return (
          <Fade bottom>
            <ReactMarkdown
              source={education.childMarkdownRemark.rawMarkdownBody}
              renderers={markdownRenderer}
            />
          </Fade>
        );
      }}
    />
  </Section.Container>
);

export default Education;
