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

export const weatherApiUrl = {
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
