import { styled } from "styled-components";
import { useEffect } from "react";
import tappaySdk from "../service/tappay_sdk";

export default function Payment() {
  useEffect(() => {
    // set up Tappay
    tappaySdk.TPSetCard();
  }, []);

  return (
    <Wrapper>
      <Title>付款資料</Title>
      <p>信用卡卡號</p>
      <div className="tpfield" id="card-number"></div>
      <p>有效日期</p>
      <div className="tpfield" id="card-expiration-date"></div>
      <p>安全碼</p>
      <div className="tpfield" id="card-ccv"></div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 50px;

  .tpfield {
    height: 40px;
    width: 300px;
    border: 1px solid gray;
    border-radius: 8px;
    margin: 5px 0;
    padding: 5px;
  }

  @media screen and (max-width: 1279px) {
    margin-top: 25px;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  padding-bottom: 15px;
  border-bottom: 1px solid #3f3a3a;
  margin-bottom: 25px;

  @media screen and (max-width: 1279px) {
    margin-bottom: 20px;
    padding-bottom: 9px;
  }
`;
