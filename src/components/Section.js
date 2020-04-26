import React from 'react';
import styled from 'styled-components';
import { Section } from 'react-scroll-section';
import { Heading } from 'rebass';
import PropTypes from 'prop-types';
import Slide from 'react-reveal/Slide';
import LinkAnimated from './LinkAnimated';

const SectionContainer = styled.div`
  min-width: 320px;
  display: flex;
  margin: auto;
  flex: 0 1 auto;
  flex-direction: column;
  justify-content: center;
  padding: 5em 5em;
  scroll-behavior: smooth;
  background: ${props => props.theme.colors[props.color]};
`;

const DefaultBackground = () => <div style={{ backgroundColor: '#F3F3F3' }} />;

const Container = ({ id, color, children, Background = DefaultBackground }) => {
  return (
    <Section id={id} style={{ position: 'relative' }}>
      <Background />
      <SectionContainer color={color}>{children}</SectionContainer>
    </Section>
  );
};

Container.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  Background: PropTypes.func,
  color: PropTypes.string.isRequired,
};

const Header = ({ name, icon = '', label = '' }) => (
  <Slide left>
    <Heading color="black" mb={4}>
      <LinkAnimated selected>
        {name}
        {icon && (
          <span role="img" aria-label={label} style={{ marginLeft: '10px' }}>
            {icon}
          </span>
        )}
      </LinkAnimated>
    </Heading>
  </Slide>
);

Header.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string,
};

export default {
  Container,
  Header,
};
