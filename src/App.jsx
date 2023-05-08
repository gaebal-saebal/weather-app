import { Button } from '@mui/material';
import Lottie from './components/Lottie';
import { getXY } from './functions/getXY';

let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

let hours = ('0' + today.getHours()).slice(-2);
let minutes = ('0' + today.getMinutes()).slice(-2);

const data = {
  serviceKey: process.env.REACT_APP_SERVICEKEY,
  numOfRows: '10',
  pageNo: '1',
  dataType: 'JSON',
  baseDate: year + month + day,
  baseTime: hours + minutes,
  nx: 43,
  ny: 136,
};

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

function App() {
  return (
    <div className='App'>
      <Lottie listIdx='0' />
      <Button variant='outlined'>현재 날씨 알아보기</Button>
    </div>
  );
}

export default App;
