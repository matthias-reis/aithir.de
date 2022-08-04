import type { NextPage } from 'next';
import styled from '@emotion/styled';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Box = styled.div`
  border: 10px dotted red;
  padding: 3rem;
`;

const Home: NextPage = () => {
  return <Box>This has changed! Yet another time.</Box>;
};

export default Home;
