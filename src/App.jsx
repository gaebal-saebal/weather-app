import { Button } from '@mui/material';
import Lottie from './components/Lottie';
import { getXY } from './functions/getXY';
import { useState } from 'react';

function App() {
  const [weather, setWeather] = useState([]);

  //TODO: 시간날짜정보, data 부분 너무 길어서 component 분리 하면 좋겠네요
  //API params 작성을 위한 현재 시간날짜 정보
  let today = new Date();
  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);
  let hours = ('0' + today.getHours()).slice(-2) - 1;
  let minutes = ('0' + today.getMinutes()).slice(-2);

  //? 이게뭐야
  //! 이거주의
  //TODO: 이거하세요

  const data = {
    //env 파일 변경 시 npm run start 재시동 해야 적용됩니다
    serviceKey: process.env.REACT_APP_SERVICEKEY,
    numOfRows: '10',
    pageNo: '1',
    dataType: 'JSON',
    baseDate: year + month + day,
    baseTime: hours + minutes,
    nx: 60,
    ny: 127,
  };
  const URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${data.serviceKey}&numOfRows=${data.numOfRows}&pageNo=${data.pageNo}&dataType=${data.dataType}&base_date=${data.baseDate}&base_time=${data.baseTime}&nx=${data.nx}&ny=${data.ny}`;

  try {
    navigator.geolocation.getCurrentPosition(function (pos) {
      let latitude = pos.coords.latitude;
      let longitude = pos.coords.longitude;
      //!여기 들어가는 data.nx data.ny가 실제 적용이 안됨 -> 기본값 60, 127으로 URL 고정
      data.nx = getXY('toXY', latitude, longitude).x;
      data.ny = getXY('toXY', latitude, longitude).y;
    });
  } catch (err) {
    console.log('문제발생');
  }

  const handleClick = async () => {
    fetch(URL)
      //일단 결과값을 readablestream에서 javascript 객체로 변환
      .then((res) => res.json())
      .then((data) => {
        const weatherData = data.response.body.items.item;
        setWeather(weatherData);
        console.log(weatherData);
      })
      .catch((err) => {
        alert(`오류가 발생했습니다. 관리자에게 문의하세요(에러 코드: ${err.message})`);
      });
  };

  return (
    <div className='App'>
      <Lottie listIdx='0' />
      <Button onClick={handleClick} variant='outlined'>
        현재 날씨 알아보기
      </Button>
      {/* 객체는 직접 브라우저에 출력할 수 없음 */}
      {/* <p>{weather}</p> */}
    </div>
  );
}

export default App;
