import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import logo from '../constants/logo.json';

const Lottie = ({ listIdx }) => {
  const container = useRef();
  const list = [logo];

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: list[listIdx],
    });
    // eslint-disable-next-line
  }, []);

  return <div ref={container}></div>;
};

export default Lottie;
