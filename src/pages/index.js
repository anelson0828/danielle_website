import React from 'react';
import Layout from '../components/Layout';
import Landing from '../sections/Landing';
import About from '../sections/About';
import Writing from '../sections/Writing';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Facts from '../sections/Facts';
import Experience from '../sections/Experience';
import Education from '../sections/Education';

const IndexPage = () => (
  <Layout>
    <Header />
    <Landing />
    {/* <Welcome /> */}
    <About />
    <Facts />
    <Education />
    <Experience />
    <Writing />
    <Footer />
  </Layout>
);

export default IndexPage;
