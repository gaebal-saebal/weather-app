import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import loading from '../constants/loading.json';
import sunny from '../constants/weather-sunny.json';
import partlyCloudy from '../constants/weather-partly-cloudy.json';
import cloudy from '../constants/weather-cloudy.json';
import rainy from '../constants/weather-rainy.json';
import snowy from '../constants/weather-snowy.json';

const Lottie = ({ listIdx }) => {
  const container = useRef();
  //import 해 온 모든 lottie image array에 담기
  const list = [loading, sunny, partlyCloudy, cloudy, rainy, snowy];

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
  }, [listIdx]);

  return <span ref={container} />;
};

export default Lottie;
