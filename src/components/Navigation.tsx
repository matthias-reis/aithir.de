import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import { Logo as UnstyledLogo } from './Logo';
import {
  headlineFont,
  colorHighlight,
  SearchIcon,
  colorCopy,
  TextIcon,
  ImagesIcon,
  MusicIcon,
  colorStrong,
  colorSecondary,
} from '../styleguide';

const Nav = styled.nav`
  width: 556px;
  margin: 20px 0 80px -278px;
  background: #0008;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  position: absolute;
  top: 20px;
  left: 50%;
  z-index: 99;
`;

const Logo = styled(UnstyledLogo)`
  position: relative;
  top: -20px;
  margin: 0 10px;
`;

const List = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const ListItem = styled.li`
  font-family: ${headlineFont};
  font-size: 1.1rem;
  flex: 1 1 100px;
  text-transform: uppercase;
  &:first-of-type {
    flex: 0 0 auto;
  }

  &&:first-of-type a:hover {
    background: transparent;
  }

  &:last-of-type {
    flex: 1 1 30px;
  }
`;

const Search = styled(Link)`
  color: ${colorCopy};
  background: ${colorSecondary};
  display: block;
  border: none;
  text-align: center;
  padding: 0 3px;
  border-radius: 0 10px 10px 0;
  &:hover {
    border: none;
    background: ${colorHighlight};
  }
  svg {
    position: relative;
    bottom: -3px;
  }
`;

const InnerListItem = styled(Link)`
  color: ${colorCopy};
  text-decoration: none;
  border: none;
  display: block;
  text-align: center;

  &:hover {
    border: none;
    color: ${colorStrong};
    background: ${colorHighlight};
  }
  svg {
    position: relative;
    bottom: -3px;
    margin-right: 10px;
  }
`;

export const Navigation = () => (
  <Nav>
    <List>
      <ListItem>
        <InnerListItem to="/">
          <Logo />
        </InnerListItem>
      </ListItem>
      <ListItem>
        <InnerListItem to="/schlagworte/texte/">
          <TextIcon />
          Texte
        </InnerListItem>
      </ListItem>
      <ListItem>
        <InnerListItem to="/schlagworte/bilder/">
          <ImagesIcon />
          Bilder
        </InnerListItem>
      </ListItem>
      <ListItem>
        <InnerListItem to="/schlagworte/texte/">
          <MusicIcon />
          Musik
        </InnerListItem>
      </ListItem>
      <ListItem>
        <Search to="/suche/">
          <SearchIcon />
        </Search>
      </ListItem>
    </List>
  </Nav>
);
