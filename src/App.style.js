/* eslint-disable */

import { css } from '@emotion/react';

const logoStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  background: pink;
  height: calc(100vh / (900 / 300));
`;

const dateStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh / (900 / 40));
  margin-top: calc(100vh / (900 / 30));
  font-size: 20px;
`;

const imgStyle = css`
  height: calc(100vh / (900 / 150));
`;

const imgCardStyle = css`
  width: 80px;
  height: calc(100vh / (900 / 80));
  margin: calc(100vh / (900 / 10)) 0px;
`;

const tempSizeStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 7vh;
  width: 200px;
  height: calc(100vh / (900 / 200));
  color: pink;
`;

const tempSmallStyle = css`
  color: black;
  font-size: 5vh;
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
  height: calc(100vh / (900 / 50));
  font-weight: 500;
`;

const divSmallSpanTwo = css`
  color: black;
  width: 75px;
  height: calc(100vh / (900 / 50));
  font-weight: 500;
`;

const forecastSection = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh / (900 / 250));
  div:first-of-type {
    margin-left: 0px;
    background: pink;
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
  height: calc(100vh / (900 / 180));
  margin-left: 10px;
`;

const footerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh / (900 / 30));
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
  imgStyle,
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
};
