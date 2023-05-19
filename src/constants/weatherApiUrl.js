//API params 작성을 위한 현재 시간날짜 정보
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);
let hours = ('0' + (today.getHours() - 1)).slice(-2);
let minutes = ('0' + today.getMinutes()).slice(-2);

const week = ['일', '월', '화', '수', '목', '금', '토'];
export let dayOfWeek = week[today.getDay()];

export const weatherApiUrl = {
  //env 파일 변경 시 npm run start 재시동 해야 적용됩니다
  serviceKey: process.env.REACT_APP_SERVICEKEY,
  numOfRows: '60',
  pageNo: '1',
  dataType: 'JSON',
  baseDate: year + month + day,
  baseTime: hours + minutes,
  nx: 60,
  ny: 127,
};
