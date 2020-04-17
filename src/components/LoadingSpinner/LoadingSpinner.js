import React from 'react';
import Lottie from 'react-lottie';
import Animation from '../../assets/loading-animation.json';

const LoadingSpinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Animation
  };

  return <Lottie options={defaultOptions} height={140} />;
};

export default LoadingSpinner;
