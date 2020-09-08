import React from 'react';

import Directory from '../../Component/Directory/Directory.Component';
import Header from '../../Component/Header/Header.component'
import './HomePage.Style.scss';

const HomePage = () => (
  <div className='homepage'>
    <Header/>
    <Directory />
  </div>
);

export default HomePage;