/* eslint-disable */

import { css } from '@emotion/react';

const logoStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: pink;
  height: 300px;
`;

const dateStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-top: 30px;
  font-size: 20px;
`;
const locationStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const imgStyle = css`
  height: 150px;
`;

const imgCardStyle = css`
  width: 80px;
  height: 80px;
  margin: 10px 0px;
`;

const tempSizeStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 70px;
  width: 200px;
  height: 200px;
  color: pink;
`;

const tempSmallStyle = css`
  color: black;
  font-size: 50px;
  margin: 15px;
`;

const divBig = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;

const divSmallSpanOne = css`
  color: pink;
  width: 75px;
  height: 50px;
  font-weight: 500;
`;

const divSmallSpanTwo = css`
  color: black;
  width: 75px;
  height: 50px;
  font-weight: 500;
`;

const forecastSection = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  div:first-of-type {
    color: white;
    font-weight: bold;
    margin-left: 0px;
    background: pink;
    border-radius: 10px;
  }
  @media screen and (max-width: 580px) {
    div:nth-of-type(n + 5) {
      display: none;
    }
  }
`;

const forecastCardDiv = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 180px;
  margin-left: 10px;
`;

const footerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 30px;
  font-size: 12px;
`;

const footerLinkStyle = css`
  margin-left: 6px;
  text-decoration: none;
  color: black;
  :link {
    text-decoration: none;
    color: black;
  }
  :visited {
    text-decoration: none;
    color: black;
  }
  :active {
    text-decoration: none;
    color: black;
  }
`;

export {
  logoStyle,
  dateStyle,
  tempSizeStyle,
  divBig,
  tempSmallStyle,
  divSmallSpanOne,
  divSmallSpanTwo,
  forecastSection,
  forecastCardDiv,
  footerStyle,
  footerLinkStyle,
  imgCardStyle,
  locationStyle,
};
