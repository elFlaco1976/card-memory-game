import React from 'react';
import Head from 'next/head';
import brain from '../../public/brain.png';
import './index.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Focus</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" />
        <link href="https://fonts.googleapis.com/css?family=Josefin+Sans&display=swap" rel="stylesheet" /> 
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
      </Head>
      <div className="layout-body">
        {children}
      </div>
    </div>
  );
};

export default Layout;
