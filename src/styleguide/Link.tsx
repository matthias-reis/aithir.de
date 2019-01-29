import React from 'react';
import styled from '@emotion/styled';
import { Link as GatsbyLink } from 'gatsby';
import { colorHighlight } from './var';

const InternalLink = styled(GatsbyLink)`
  color: ${colorHighlight};
  text-decoration: underline;
`;

const ExternalLink = styled.a`
  color: ${colorHighlight};
  text-decoration: none;
  border-bottom: 1px dotted ${colorHighlight};

  &:after {
    content: '⇪';
    font-size: 0.7em;
    padding-left: 2px;
    position: relative;
    top: -8px;
  }
`;

export const Link = ({ href, children }) => {
  if (href.indexOf('http') === 0) {
    return <ExternalLink href={href}>{children}</ExternalLink>;
  } else {
    return <InternalLink to={href}>{children}</InternalLink>;
  }
};
