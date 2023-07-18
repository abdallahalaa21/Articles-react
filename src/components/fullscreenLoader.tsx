import React from 'react';
import Loader from './loader';

const FullscreenLoader = () => (
  <div className='flex items-center justify-center w-full h-screen'>
    <Loader />
  </div>
);

export default FullscreenLoader;
