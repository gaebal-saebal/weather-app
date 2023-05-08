import { Button } from '@mui/material';
import Lottie from './components/Lottie';
import { getXY } from './functions/getXY';
import { useState } from 'react';

function App() {
  const [weather, setWeather] = useState([]);

  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2) - 1;
  let minutes = ('0' + today.getMinutes()).slice(-2);

  const data = {
    serviceKey:
      'IvPYwwrcAkf4XhepyiPms9XJvyn7XFnY6FLRx57UDVoUsvT71YAo8%2BQsEmOz1XzNiICh3Kg1P%2F%2FLMDaihP6OmQ%3D%3D',
    numOfRows: '10',
    pageNo: '1',
    dataType: 'JSON',
    baseDate: year + month + day,
    baseTime: hours + minutes,
    nx: 43,
    ny: 136,
  };
  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${data.serviceKey}&numOfRows=${data.numOfRows}&pageNo=${data.pageNo}&dataType=${data.dataType}&base_date=${data.baseDate}&base_time=${data.baseTime}&nx=${data.nx}&ny=${data.ny}`;

  try {
    navigator.geolocation.getCurrentPosition(function (pos) {
      let latitude = pos.coords.latitude;
      let longitude = pos.coords.longitude;
      data.nx = getXY('toXY', latitude, longitude).x;
      data.ny = getXY('toXY', latitude, longitude).y;
    });
  } catch (err) {
    console.log('문제발생');
  }

  const handleClick = () => {
    fetch(URL)
      .then((res) => console.log(res.json()))
      .then((data) => {
        const weatherData = data.response.body.items.item;
        setWeather(weatherData);
        console.log(weatherData);
      });

    // const response = await fetch(URL);
    // if (response.ok) {
    //   const jsonValue = await response.json();
    //   console.log(jsonValue);
    //   return Promise.resolve(jsonValue);
    // } else {
    //   return Promise.reject('안됨');
    // }
  };
  console.log(weather);
  return (
    <div className='App'>
      <Lottie listIdx='0' />
      <Button onClick={handleClick} variant='outlined'>
        현재 날씨 알아보기
      </Button>
      {/* <p>{weather}</p> */}
    </div>
  );
}

export default App;
