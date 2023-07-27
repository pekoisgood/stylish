import { styled } from "styled-components";
import { useRef } from "react";

export default function Check({ totalPrice }) {
  const btnRef = useRef();

  window.TPDirect.card.onUpdate((update) => {
    if (update.canGetPrime) {
      // Enable submit Button to get prime.
      btnRef.current.disabled = false;
    } else {
      // Disable submit Button to get prime.
      btnRef.current.disabled = true;
    }
  });

  return (
    <Wrapper>
      <div>
        <Info>
          <p>總金額</p>
          <p>
            NT.<span className="price">{totalPrice}</span>
          </p>
        </Info>
        <Info>
          <p>運費</p>
          <p>
            NT.<span className="shipping-fee">{totalPrice ? "30" : "0"}</span>
          </p>
        </Info>
        <hr />
        <Info>
          <p className="padding-left">應付金額</p>
          <p>
            NT.
            <span className="total-price">
              {totalPrice ? totalPrice + 30 : "0"}
            </span>
          </p>
        </Info>
      </div>
      <PayButton type="submit" ref={btnRef} disabled>
        確認付款
      </PayButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 40px;
  margin-left: auto;
  width: 240px;
  display: flex;
  flex-direction: column;

  > div {
    display: flex;
    flex-direction: column;
    width: 240px;
    margin-left: auto;
  }

  @media screen and (max-width: 1279px) {
    width: 100%;
    height: 248px;
    margin-top: 24px;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #3f3a3a;
  padding-right: 1px;
  font-family: "Noto Sans TC";

  p {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
  }

  p span {
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 36px;
    margin-left: 9px;
  }

  .price {
    margin-right: 3px;
  }

  .shipping-fee {
    margin: 20px 2px 20px 8px;
  }

  .total-price {
    margin: 18px 0 19px 8px;
  }

  @media screen and (max-width: 1279px) {
    .shipping-fee {
      margin-bottom: 19px;
    }

    .padding-left {
      padding-left: 4px;
    }
  }
`;

const PayButton = styled.button`
  font-family: "Noto Sans TC";
  width: 100%;
  height: 64px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 4px;
  color: #ffffff;
  background: #000000;
  margin-top: auto;
  padding: 2px 0 0 4px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    height: 44px;
    letter-spacing: 3.2px;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    padding: 0;
  }
`;
