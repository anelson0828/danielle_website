import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { Heading } from 'rebass';
import Section from '../components/Section';

const LandingPage = () => (
  <Section.Container id="home">
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          contentfulAbout {
            description
          }
        }
      `}
      render={data => {
        const { description } = data.contentfulAbout;

        return (
          <Fragment>
            <Heading
              textAlign="center"
              verticalAlign="center"
              as="h2"
              fontSize={[6, 7, 7]}
              width="100%"
              paddingTop="20px"
              fontFamily="The Girl Next Door"
            >
              {description}
            </Heading>
          </Fragment>
        );
      }}
    />
  </Section.Container>
);

export default LandingPage;
