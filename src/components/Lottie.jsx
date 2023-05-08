import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import logo from '../constants/logo.json';

const Lottie = ({ listIdx }) => {
  const container = useRef();
  //import 해 온 모든 lottie image array에 담기
  const list = [logo];

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      //index를 사용해 Lottie component의 재사용성 확대
      animationData: list[listIdx],
    });
    // eslint-disable-next-line
  }, []);

  return <div ref={container}></div>;
};

export default Lottie;
