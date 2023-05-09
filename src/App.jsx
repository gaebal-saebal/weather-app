/* eslint-disable */

import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import Lottie from './components/Lottie';
import { getXY } from './functions/getXY';
import { useEffect, useState } from 'react';
import { weatherApiUrl as data } from './constants/weatherApiUrl';
import { rainTypeFn } from './constants/rainTypeFn';

function App() {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);
  const [sky, setSky] = useState([]);
  const [humid, setHumid] = useState([]);
  const [rainType, setRainType] = useState([]);
  const [rainAmount, setRainAmount] = useState([]);

  const [index, setIndex] = useState('1');

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

  const weatherImg = () => {
    let listIdx = '1';
    console.log(sky[0]);
    // let skyValue = sky[0].fcstValue;
    // skyValue === '1'
    //   ? (listIdx = '1')
    //   : skyValue === '3'
    //   ? (listIdx = '2')
    //   : skyValue === '4'
    //   ? (listIdx = '3')
    //   : '오류';
    return listIdx;
  };

  useEffect(() => setIndex(weatherImg()), [sky]);

  return (
    <div className='App'>
      <Lottie listIdx='0' />

      {/* 객체는 직접 브라우저에 출력할 수 없음 */}
      <article>
        <div>
          <Card variant='outlined'>
            <Lottie listIdx={index} />
          </Card>
        </div>

        <div>
          <p>기온</p>
          {temp.map((data, i) => {
            return <span key={i}>{data.fcstValue}℃</span>;
          })}
          <p>날씨</p>
          {sky.map((data, i) => {
            return (
              <span key={i}>
                {data.fcstValue === '1'
                  ? '맑음'
                  : data.fcstValue === '3'
                  ? '구름많음'
                  : data.fcstValue === '4'
                  ? '흐림'
                  : '오류'}
              </span>
            );
          })}
          <p>습도</p>
          {humid.map((data, i) => {
            return <span key={i}>{data.fcstValue}%</span>;
          })}
          <p>강수형태</p>
          {rainType.map((data, i) => {
            return <span key={i}>{rainTypeFn(data.fcstValue)}</span>;
          })}
          <p>1시간 강수량</p>
          {rainAmount.map((data, i) => {
            return (
              <span key={i}>
                {data.fcstValue === '강수없음' ? '0' : data.fcstValue}mm
              </span>
            );
          })}
        </div>
      </article>
    </div>
  );
}

export default App;
