/* eslint-disable */

// raintype의 fcstValue(예보 코드)가 숫자 0,1,2,...로 나오는데 이걸 문자로 바꿔주는 함수
export const rainTypeFn = (fcstValue) => {
  let result = '';
  switch (fcstValue) {
    case '0':
      result = '없음';
      break;
    case '1':
      result = '비';
      break;
    case '2':
      result = '비/눈';
      break;
    case '3':
      result = '눈';
      break;
    case '5':
      result = '빗방울';
      break;
    case '6':
      result = '빗방울눈날림';
      break;
    case '7':
      result = '눈날림';
      break;
  }
  return result;
};
