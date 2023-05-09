import { Button } from '@mui/material';
import Lottie from './components/Lottie';
import { getXY } from './functions/getXY';
import { useEffect, useState } from 'react';
import { weatherApiUrl as data } from './constants/weatherApiUrl';

function App() {
  const [weather, setWeather] = useState([]);
  const [temp, setTemp] = useState([]);

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
            console.log(weatherData);
          })
          .catch((err) => {
            alert(`${err.message})`);
          });
      });
    } catch (err) {
      alert('위치정보를 가져올 수 없어요.');
    }
  };

  const getTempArr = () => {
    //weather의 각 배열 요소들 중 key: category가 T1H인 것
    const arr = weather.slice(0, 6);
    setTemp(arr);
  };

  useEffect(() => getWeather(), []);

  useEffect(() => {
    getTempArr();
  }, [weather]);

  return (
    <div className='App'>
      <Lottie listIdx='0' />

      {/* 객체는 직접 브라우저에 출력할 수 없음 */}
      <article>
        {temp.map((data, i) => {
          return <p key={i}>{data.category}</p>;
        })}
      </article>
    </div>
  );
}

export default App;
