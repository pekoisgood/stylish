import styled from "styled-components";

import lineImg from "../images/line.png";
import twitterImg from "../images/twitter.png";
import facebookImg from "../images/facebook.png";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <LinksAndIconsWrapper>
          <LinksWrapper>
            <li>
              <a href="#">關於 STYLiSH</a>
            </li>
            <li>
              <a href="#">服務條款</a>
            </li>
            <li>
              <a href="#">隱私政策</a>
            </li>
            <li>
              <a href="#">聯絡我們</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
          </LinksWrapper>
          <IconsWrapper>
            <a href="#">
              <img src={lineImg} alt="line icon" />
            </a>
            <a href="#">
              <img src={twitterImg} alt="twitter icon" />
            </a>
            <a href="#">
              <img src={facebookImg} alt="facebook icon" />
            </a>
          </IconsWrapper>
        </LinksAndIconsWrapper>
        <CopyRight>&copy; 2018. All rights reserved.</CopyRight>
      </FooterWrapper>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100vw;
  height: 115px;
  background-color: #313538;
  display: flex;
  align-items: center;
  margin-top: 20px;
  z-index: 1;

  @media screen and (max-width: 1279px) {
    height: 146px;
    margin-bottom: 60px;
    margin-top: 12px;
  }
`;

const FooterWrapper = styled.div`
  width: 1280px;
  padding: 0 60px 0 60px;
  margin: auto;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    width: 480px;
    flex-direction: column;
    padding: 0;
  }
`;

const LinksAndIconsWrapper = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    margin-bottom: 10px;
  }
`;

const LinksWrapper = styled.ul`
  display: flex;
  height: 22px;

  li {
    display: flex;
    width: 134px;
    align-items: center;
  }

  li:not(:last-child)::after {
    display: flex;
    content: "";
    width: 1px;
    height: 16px;
    background-color: #828282;
    margin-left: auto;
  }

  li a {
    display: block;
    height: 22px;
    width: 100%;
    text-align: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 138%;
    color: #f5f5f5;
  }

  @media screen and (max-width: 1279px) {
    flex-direction: column;
    width: 177px;
    height: 76px;
    flex-wrap: wrap;
    margin: 4px 3px 0 0;

    li:not(:last-child)::after {
      display: none;
    }

    li {
      width: auto;
    }

    li:nth-of-type(2),
    li:nth-of-type(5) {
      margin: 8px 0;
    }

    li:nth-of-type(4),
    li:nth-of-type(5) {
      margin-left: 36px;
    }

    li a {
      height: auto;
      font-size: 14px;
      line-height: 20px;
      text-align: start;
    }
  }
`;
const IconsWrapper = styled.div`
  display: flex;
  margin-left: 86px;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 15px;
  }

  img {
    width: 50px;
    height: 50px;
  }

  @media screen and (max-width: 1279px) {
    margin-bottom: 18px;
    margin-left: 28px;

    a {
      margin: 0;
    }

    a:nth-of-type(2) {
      margin: 0 14px;
    }

    img {
      width: 20px;
      height: 20px;
    }
  }
`;
const CopyRight = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  color: #828282;
  margin-top: 3px;
  margin-left: 15px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    padding: 0;
    margin: 0 auto;
    font-size: 10px;
    line-height: 14px;
  }
`;
