/** @jsxImportSource @emotion/react */
/* eslint-disable */
import Lottie from './components/Lottie';
import { getXY } from './functions/getXY';
import { useEffect, useState } from 'react';
import { weatherApiUrl as data, dayOfWeek } from './constants/weatherApiUrl';
import { rainTypeFn } from './constants/rainTypeFn';
import { logoStyle, dateStyle, imgStyle, tempSizeStyle, divBig, tempSmallStyle, divSmallSpanOne, divSmallSpanTwo, footerStyle, footerLinkStyle } from './App.style';

function App() {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [sky, setSky] = useState([]);
  const [humid, setHumid] = useState([]);
  const [rainType, setRainType] = useState([]);
  const [rainAmount, setRainAmount] = useState([]);

  const getWeather = () => {
    try {
      navigator.geolocation.getCurrentPosition(async function (pos) {
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        data.nx = getXY('toXY', latitude, longitude).x;
        data.ny = getXY('toXY', latitude, longitude).y;

        const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${data.serviceKey}&numOfRows=${data.numOfRows}&pageNo=${data.pageNo}&dataType=${data.dataType}&base_date=${data.baseDate}&base_time=${data.baseTime}&nx=${data.nx}&ny=${data.ny}`;
        await fetch(URL)
          //일단 결과값을 readablestream에서 javascript 객체로 변환
          .then((res) => res.json())
          .then((data) => {
            const weatherData = data.response.body.items.item;
            setWeather(weatherData);
          })
          .catch((err) => {
            alert(`${err.message})`);
          });
      });
    } catch (err) {
      alert('위치정보를 가져올 수 없어요.');
    }
  };

  const getWeatherDataArr = (stateChangeFn, category) => {
    //weather의 각 배열 요소들 중 key: category가 T1H인 것
    const arr = weather.filter((a) => a.category === category);
    stateChangeFn(arr);
  };

  useEffect(() => getWeather(), []);

  useEffect(() => {
    getWeatherDataArr(setTemp, 'T1H');
    getWeatherDataArr(setSky, 'SKY');
    getWeatherDataArr(setHumid, 'REH');
    getWeatherDataArr(setRainType, 'PTY');
    getWeatherDataArr(setRainAmount, 'RN1');
  }, [weather]);

  //sky랑 raintype의 fcstValue 값을 참조해서 날씨 그림의 파일 이름을 가져오는 함수
  //sky raintype은 각각 날씨와 강수타입을 나타내는 배열(index는 0부터 6까지, 0은 현재, 1시간 간격으로 6까지)
  //idx : 몇 시간 뒤의 '시간'
  //listidx : 해당 시간 뒤의 날씨 그림 '파일 이름'
  const getWeatherImageName = (idx) => {
    let listIdx = '0';
    if (sky.length > 0) {
      let skyValue = sky[idx].fcstValue;
      skyValue === '1' ? (listIdx = '1') : skyValue === '3' ? (listIdx = '3') : skyValue === '4' ? (listIdx = '4') : (listIdx = '0');
    }
    if (rainType.length > 0) {
      let rainTypeValue = rainType[idx].fcstValue;
      rainTypeValue === '1' || rainTypeValue === '2' || rainTypeValue === '5' || rainTypeValue === '6' ? (listIdx = '6') : rainTypeValue === '3' || rainTypeValue === '7' ? (listIdx = '7') : null;
    }
    return listIdx;
  };

  return (
    <>
      <header css={logoStyle}>
        <div style={{ display: 'flex', width: '70vw' }}>
          <Lottie listIdx='1' />
          <Lottie listIdx='2' />
          <Lottie listIdx='3' />
          <Lottie listIdx='4' />
          <Lottie listIdx='5' />
        </div>
      </header>
      <main>
        {/* TODO : 현재날씨이미지, 현재기온, 현재습도, 강수량 = 카드처럼! */}
        <article>
          <header css={dateStyle}>{temp.length > 0 ? `${temp[0].baseDate.slice(0, 4)}년 ${temp[0].baseDate.slice(4, 6)}월 ${temp[0].baseDate.slice(6, 8)}일 (${dayOfWeek})` : null}</header>
          <section>
            <div css={divBig}>
              {sky.length > 0 && rainType.length > 0 ? (
                <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(0)}.gif`} alt='날씨' />
              ) : (
                <img css={imgStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />
              )}
              <span css={tempSizeStyle}>
                {temp.length > 0 ? temp[0].fcstValue : null}
                <span css={tempSmallStyle}>℃</span>
              </span>
            </div>
            <div css={divBig}>
              <span css={divSmallSpanTwo}>습도</span>
              <span css={divSmallSpanOne}>
                {humid.length > 0 ? humid[0].fcstValue : null}
                <span css={divSmallSpanTwo} style={{ marginLeft: '10px' }}>
                  %
                </span>
              </span>
              <span css={divSmallSpanTwo} style={{ marginLeft: '25px' }}>
                강수량
              </span>
              <span css={divSmallSpanOne}>
                {rainAmount.length > 0 ? (rainAmount[0].fcstValue === '강수없음' ? '0' : rainAmount[0].fcstValue) : null}
                <span css={divSmallSpanTwo} style={{ marginLeft: '10px' }}>
                  mm
                </span>
              </span>
            </div>
          </section>
        </article>
        {/* //TODO : 날씨 이미지 6개 쭉 나오고 기온이랑, 시간 나오도록! */}
        <div>
          <p>
            {sky.length > 0 && rainType.length > 0 ? (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(0)}.gif`} alt='날씨' />
            ) : (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />
            )}
            {sky.length > 0 && rainType.length > 0 ? (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(1)}.gif`} alt='날씨' />
            ) : (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />
            )}
            {sky.length > 0 && rainType.length > 0 ? (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(2)}.gif`} alt='날씨' />
            ) : (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />
            )}
            {sky.length > 0 && rainType.length > 0 ? (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(3)}.gif`} alt='날씨' />
            ) : (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />
            )}
            {sky.length > 0 && rainType.length > 0 ? (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(4)}.gif`} alt='날씨' />
            ) : (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />
            )}
            {sky.length > 0 && rainType.length > 0 ? (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(5)}.gif`} alt='날씨' />
            ) : (
              <img css={imgStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />
            )}

            {sky.map((data, i) => {
              return <span key={i}>{data.fcstValue}</span>;
            })}
          </p>
        </div>
      </main>
      <footer css={footerStyle}>
        © 2023 Gaebal-Saebal
        <a css={footerLinkStyle} href='https://github.com/gaebal-saebal' target='_blank'>
          {'<https://github.com/gaebal-saebal>'}
        </a>
      </footer>
    </>
  );
}

export default App;
