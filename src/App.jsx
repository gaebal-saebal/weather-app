/** @jsxImportSource @emotion/react */
// emotion을 사용하기 위해선 맨 위에 해당 구문을 입력해주어야 함(jsx문법으로 emotion사용하게 해줌)
/* eslint-disable */
import Lottie from './components/Lottie';
import { Global, css } from '@emotion/react';
import { getXY } from './functions/getXY'; // 위도,경도를 x,y 좌표로 바꾸어주는 함수
import { useEffect, useState } from 'react';
import { weatherApiUrl as data, dayOfWeek } from './constants/weatherApiUrl'; // data : data fetch URL에 담아야 할 필요 데이터(object)
import { rainTypeFn } from './functions/rainTypeFn';
import {
  logoStyle,
  dateStyle,
  imgStyle,
  tempSizeStyle,
  divBig,
  tempSmallStyle,
  divSmallSpanOne,
  divSmallSpanTwo,
  forecastSection,
  footerStyle,
  footerLinkStyle,
  forecastCardDiv,
  imgCardStyle,
} from './App.style';

function App() {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [sky, setSky] = useState([]);
  const [humid, setHumid] = useState([]);
  const [rainType, setRainType] = useState([]);
  const [rainAmount, setRainAmount] = useState([]);

  const weatherImgArr = [0, 1, 2, 3, 4, 5];

  const getWeather = () => {
    try {
      // 기상청 API는 위도 경도를 바탕으로 작성된 x,y 좌표를 사용해요
      // 그래서 위도 경도를 x,y 좌표로 바꾸어주는 함수가 src/functions/getXY.js에 있는 getXY 함수에요
      // 일단 현재 위치의 위도와 경도를 구해주기 위해서 아래 함수를 사용합니다
      navigator.geolocation.getCurrentPosition(async function (pos) {
        let latitude = pos.coords.latitude; // 위도
        let longitude = pos.coords.longitude; // 경도
        data.nx = getXY('toXY', latitude, longitude).x; // 자세한 getXY사용법은 getXY.js에서 확인
        data.ny = getXY('toXY', latitude, longitude).y;

        const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${data.serviceKey}&numOfRows=${data.numOfRows}&pageNo=${data.pageNo}&dataType=${data.dataType}&base_date=${data.baseDate}&base_time=${data.baseTime}&nx=${data.nx}&ny=${data.ny}`;
        await fetch(URL)
          // 일단 결과값을 readablestream에서 javascript 객체로 변환
          .then((res) => res.json())
          // 변환된 'data'에서 화면에 출력할 데이터만 가져옵니다
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

  //weather의 각 배열 요소들 중 key: category가 param에 입력된 것과 같은것만 담아 param로 받은 setState 함수를 동작시킵니다.
  const getWeatherDataArr = (stateChangeFn, category) => {
    const arr = weather.filter((a) => a.category === category);
    stateChangeFn(arr);
  };

  //sky랑 raintype의 fcstValue 값을 참조해서 날씨 그림의 파일 이름을 가져오는 함수
  //sky raintype은 각각 날씨와 강수타입을 나타내는 배열(index는 0부터 6까지, 0은 현재, 1시간 간격으로 6까지)
  //idx : 몇 시간 뒤의 '시간'
  //listidx : 해당 시간 뒤의 날씨 그림 '파일 이름'
  const getWeatherImageName = (idx) => {
    let listIdx = '0';
    if (sky.length > 0) {
      // 조건문이 없으면 아직 값을 할당받지 못해 undefined인 'sky'에서 length를 찾으려 합니다. 그러면 오류가 나겠죠?
      let skyValue = sky[idx].fcstValue;
      skyValue === '1' ? (listIdx = '1') : skyValue === '3' ? (listIdx = '3') : skyValue === '4' ? (listIdx = '4') : (listIdx = '0');
    } // sky에는 맑음, 구름많음, 흐림 3개 밖에 없으니 강수타입인 raintype도 확인해서 날씨그림을 결정합시다!
    if (rainType.length > 0) {
      let rainTypeValue = rainType[idx].fcstValue;
      rainTypeValue === '1' || rainTypeValue === '2' || rainTypeValue === '5' || rainTypeValue === '6' ? (listIdx = '6') : rainTypeValue === '3' || rainTypeValue === '7' ? (listIdx = '7') : null;
    } // raintype.fcstValue가 1,2,5,6일때는 비오는 그림으로, 3,7일때는 눈오는 그림으로 변경합니다. 그 외의 경우엔 listidx를 변경하지 않을거에요.
    return listIdx;
  };

  //일단 렌더링이 되면 data fetch로 날씨정보를 그대로 다 가져옵니다
  useEffect(() => getWeather(), []);

  //날씨정보를 가져오면, 온도, 날씨, 습도, 강수타입, 강수량만 각각 상태에 할당합니다
  useEffect(() => {
    getWeatherDataArr(setTemp, 'T1H');
    getWeatherDataArr(setSky, 'SKY');
    getWeatherDataArr(setHumid, 'REH');
    getWeatherDataArr(setRainType, 'PTY');
    getWeatherDataArr(setRainAmount, 'RN1');
  }, [weather]);

  return (
    <>
      {/* setup GlobalStyle */}
      <Global
        styles={css`
          body {
            margin: 0;
            padding: 0;
          }
        `}
      />
      <header css={logoStyle}>
        <div style={{ display: 'flex', width: '70vw', maxWidth: '840px' }}>
          <Lottie listIdx='1' />
          <Lottie listIdx='2' />
          <Lottie listIdx='3' />
          <Lottie listIdx='4' />
          <Lottie listIdx='5' />
        </div>
      </header>
      <main>
        <article>
          {/* 마찬가지로 조건문이 없으면 undefined에서 length를 찾으려 하기 때문에 오류가 납니다 */}
          <header css={dateStyle}>{temp.length > 0 ? `${temp[0].baseDate.slice(0, 4)}년 ${temp[0].baseDate.slice(4, 6)}월 ${temp[0].baseDate.slice(6, 8)}일 (${dayOfWeek})` : null}</header>
          <section id='weather-now'>
            <div css={divBig}>
              {sky.length > 0 && rainType.length > 0 ? (
                <img css={imgStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(0)}.gif`} alt='날씨' />
              ) : (
                // sky와 raintype에 값이 할당되지 않았다는 것은, 아직 data fetch가 끝나지 않았다는 거겠죠?
                // 그래서 sky와 raintype에 값이 할당될 때 까지 로딩중임을 표현하기 위해 0.gif을 보여줍니다.
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
                {/* rainAmount(강수량)에서 비가 오지 않으면 강수량이 숫자 0이 아니고 '강수없음'으로 뜨기 때문에 '강수없음'의 경우 '0'으로 바꾸어줍니다 */}
                {rainAmount.length > 0 ? (rainAmount[0].fcstValue === '강수없음' ? '0' : rainAmount[0].fcstValue) : null}
                <span css={divSmallSpanTwo} style={{ marginLeft: '10px' }}>
                  mm
                </span>
              </span>
            </div>
          </section>
          <section id='weather-forecast' css={forecastSection}>
            {temp.length > 0 && sky.length > 0 && rainType.length > 0
              ? weatherImgArr.map((idx, i) => {
                  return (
                    <div css={forecastCardDiv} key={i}>
                      <span>{`${temp[idx].fcstTime}`.slice(0, 2)}시</span>
                      <img css={imgCardStyle} src={process.env.PUBLIC_URL + `/${getWeatherImageName(idx)}.gif`} alt='날씨' />
                      <span>{`${temp[idx].fcstValue}`}℃</span>
                    </div>
                  );
                })
              : weatherImgArr.map((idx, i) => {
                  return <img key={i} css={imgCardStyle} src={process.env.PUBLIC_URL + `0.gif`} alt='날씨' />;
                })}
          </section>
        </article>
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
