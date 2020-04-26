import React from 'react';
import { Heading, Box } from 'rebass';
import Layout from '../components/Layout';
import Section from '../components/Section';

const Background = () => <div style={{ backgroundColor: 'darkGray' }} />;

const NotFoundPage = () => (
  <Layout>
    <Section.Container id="404" Background={Background}>
      <Box width={[320, 400, 600]} m="auto">
        <Heading color="darkGray" fontSize={['9rem', '13rem', '16rem']}>
          404
        </Heading>
        <Heading color="background" fontSize={['4rem', '5rem', '6rem']}>
          {"There isn't anything here"}
        </Heading>
      </Box>
    </Section.Container>
  </Layout>
);

export default NotFoundPage;
