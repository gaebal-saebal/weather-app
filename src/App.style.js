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
`;

const imgStyle = css`
  height: 150px;
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
`;

const divSmallSpanTwo = css`
  color: black;
  width: 75px;
  height: 50px;
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

export { logoStyle, dateStyle, imgStyle, tempSizeStyle, divBig, tempSmallStyle, divSmallSpanOne, divSmallSpanTwo, footerStyle, footerLinkStyle };
