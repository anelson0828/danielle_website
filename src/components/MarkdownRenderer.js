import React from 'react';
import { SectionLink } from 'react-scroll-section';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledLink = styled.a`
  display: inline-block;
  transition: color 250ms, text-shadow 250ms;
  color: black;
  cursor: pointer;
  text-decoration: underline;
  position: relative;
  &:after {
    position: absolute;
    z-index: -1;
    bottom: -1px;
    left: 50%;
    transform: translateX(-50%);
    content: '';
    width: 100%;
    background-color: ${props => props.theme.colors.secondary};
    transition: all 250ms;
  }

  &:hover {
    color: white;

    &::after {
      height: 105%;
      width: 105%;
    }
  }
`;

const MarkdownParagraph = styled.p`
  line-height: 1.3em;
  margin-left: 1.3em;

  &:first-child {
    margin-top: 0.5em;
  }
`;

const MarkdownList = styled.ul`
  margin: 0;
  list-style: none;
`;

const MarkdownListItem = styled.li`
  margin: 0;
  line-height: 1.3em;
  :before {
    content: '\f0da';
    font-family: FontAwesome;
    font-size: 12px;
    display: inline-block;
    margin-left: -1.3em;
    width: 1.3em;
  }
`;

const MarkdownLink = ({ href, children }) => {
  const isInnerLink = href.startsWith('#');
  return isInnerLink ? (
    <SectionLink section={href.substring(1, href.length)}>
      {({ onClick }) => <StyledLink onClick={onClick}>{children}</StyledLink>}
    </SectionLink>
  ) : (
    <StyledLink href={href} target="_blank" rel="noreferrer">
      {children}
    </StyledLink>
  );
};

MarkdownLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default {
  paragraph: props => <MarkdownParagraph {...props} />,
  list: props => <MarkdownList {...props} />,
  listItem: props => <MarkdownListItem {...props} />,
  link: MarkdownLink,
};
