import { styled } from "styled-components";
import { useRef } from "react";

export default function Order({ order, updateOrder }) {
  const nameRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const emailRef = useRef();
  const deliverTimeRef = useRef();

  function handleInputChange(propertyName, validPropertyName, e, ref) {
    updateOrder((draft) => {
      draft[propertyName] = e.target.value;
    });
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const phoneformat = /^[0-9]*$/;

    if (
      !e.target.value ||
      (propertyName === "email" && !e.target.value.match(mailformat)) ||
      (propertyName === "phone" && !e.target.value.match(phoneformat))
    ) {
      ref.current.style.border = "1px solid red";
      updateOrder((draft) => {
        draft[validPropertyName] = false;
      });
    } else {
      ref.current.style.border = "1px solid #979797";
      updateOrder((draft) => {
        draft[validPropertyName] = true;
      });
    }
  }

  function invalidMessage(propertyName) {
    if (propertyName === "username") {
      if (!order.username) {
        return <InvalidMessage>請提供收件人姓名</InvalidMessage>;
      }
    }
    if (propertyName === "phone") {
      const phoneformat = /^[0-9]*$/;
      if (!order.phone) {
        return <InvalidMessage>請提供手機</InvalidMessage>;
      } else if (!order.phone.match(phoneformat)) {
        return <InvalidMessage>手機格式錯誤</InvalidMessage>;
      }
    }
    if (propertyName === "address") {
      if (!order.address) {
        return <InvalidMessage>請提供地址</InvalidMessage>;
      }
    }
    if (propertyName === "email") {
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (!order.email) {
        return <InvalidMessage>請提供Email</InvalidMessage>;
      } else if (!order.email.match(mailformat)) {
        return <InvalidMessage>Email格式錯誤</InvalidMessage>;
      }
    }
    if (propertyName === "deliverTime") {
      if (!order.deliverTime) {
        return <InvalidMessage>請選擇配送時間</InvalidMessage>;
      }
    }
    return null;
  }

  return (
    <Wrapper>
      <Title>訂購資料</Title>
      <Name>
        <div>
          <label htmlFor="name">收件人姓名</label>
          <input
            // name="name"
            ref={nameRef}
            id="name"
            type="text"
            value={order.username}
            onChange={(e) =>
              handleInputChange("username", "validUsername", e, nameRef)
            }
          />
        </div>
        <p className="note">務必填寫完整收件人姓名，避免包裹無法順利簽收</p>
        {order.validUsername === false && invalidMessage("username")}
      </Name>
      <Info>
        <label htmlFor="phone">手機</label>
        <input
          // name="phone"
          ref={phoneRef}
          id="phone"
          type="text"
          value={order.phone}
          onChange={(e) =>
            handleInputChange("phone", "validPhone", e, phoneRef)
          }
        />
      </Info>
      {order.validPhone === false && invalidMessage("phone")}
      <Info>
        <label htmlFor="address">地址</label>
        <input
          // name="address"
          ref={addressRef}
          id="address"
          type="text"
          value={order.address}
          onChange={(e) =>
            handleInputChange("address", "validAddress", e, addressRef)
          }
        />
      </Info>
      {order.validAddress === false && invalidMessage("address")}
      <Info>
        <label htmlFor="email">Email</label>
        <input
          // name="email"
          ref={emailRef}
          id="email"
          type="text"
          value={order.email}
          onChange={(e) =>
            handleInputChange("email", "validEmail", e, emailRef)
          }
        />
      </Info>
      {order.validEmail === false && invalidMessage("email")}
      <DeliverTime>
        <p>配送時間</p>
        <div>
          <label htmlFor="deliver-time-08-12">
            <input
              name="deliver-time"
              ref={deliverTimeRef}
              type="radio"
              id="deliver-time-08-12"
              value="08:00-12:00"
              onChange={(e) =>
                handleInputChange(
                  "deliverTime",
                  "validDeliverTime",
                  e,
                  deliverTimeRef
                )
              }
            />
            08:00-12:00
          </label>
          <label htmlFor="deliver-time-14-18">
            <input
              name="deliver-time"
              ref={deliverTimeRef}
              type="radio"
              id="deliver-time-14-18"
              value="14:00-18:00"
              onChange={(e) =>
                handleInputChange(
                  "deliverTime",
                  "validDeliverTime",
                  e,
                  deliverTimeRef
                )
              }
            />
            14:00-18:00
          </label>
          <label htmlFor="deliver-time-none">
            <input
              name="deliver-time"
              ref={deliverTimeRef}
              type="radio"
              id="deliver-time-none"
              value="不指定"
              defaultChecked
              onChange={(e) =>
                handleInputChange(
                  "deliverTime",
                  "validDeliverTime",
                  e,
                  deliverTimeRef
                )
              }
            />
            不指定
          </label>
        </div>
      </DeliverTime>
      {order.validDeliverTime === false && invalidMessage("deliverTime")}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;

  label {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #3f3a3a;
  }

  @media screen and (max-width: 1279px) {
    margin-top: 21px;
  }
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: #3f3a3a;
  padding-bottom: 15px;
  border-bottom: 1px solid #3f3a3a;

  @media screen and (max-width: 1279px) {
    padding-bottom: 9px;
  }
`;

const Name = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;

  div {
    display: flex;
    align-items: center;
  }

  label {
    width: 120px;
  }

  input {
    width: 576px;
    height: 32px;
    border: 1px solid #979797;
    border-radius: 8px;
    padding-left: 8px;
    font-size: 16px;
    line-height: 32px;
  }

  .note {
    width: 696px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #8b572a;
    margin-top: 10px;
    text-align: end;
  }

  @media screen and (max-width: 1279px) {
    margin-top: 20px;

    div {
      flex-direction: column;
      align-items: start;
      gap: 10px;
    }

    div label {
      font-size: 14px;
      line-height: 17px;
    }

    input {
      width: 100%;
    }

    .note {
      width: 100%;
      margin-top: 7px;
      text-align: start;
      font-size: 14px;
      line-height: 17px;
    }
  }
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;

  label:nth-child(1) {
    width: 120px;
  }

  input {
    width: 576px;
    height: 32px;
    border: 1px solid #979797;
    border-radius: 8px;
    padding-left: 8px;
    font-size: 16px;
    line-height: 32px;
  }

  // hide arrows from input number
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  @media screen and (max-width: 1279px) {
    flex-direction: column;
    align-items: start;
    gap: 9px;
    margin: 20px 0 21px 0;

    label {
      font-size: 14px;
      line-height: 17px;
    }

    input {
      width: 100%;
    }
  }
`;

const DeliverTime = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
  }

  p {
    width: 120px;
  }

  div label {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
  }

  div label:nth-child(2) {
    margin: 0 32px;
  }

  input {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }

  @media screen and (max-width: 1279px) {
    flex-direction: column;
    width: 100%;
    align-items: start;
    gap: 13px;

    label {
      font-size: 14px;
      line-height: 17px;
    }

    div label {
      font-size: 14px;
      line-height: 17px;
      display: flex;
    }

    label:nth-child(1) {
      width: auto;
      margin-right: 1px;
    }

    div label:nth-child(2) {
      margin: 0 25px;
    }

    div input {
      margin-right: 6px;
    }
  }
`;

const InvalidMessage = styled.p`
  color: red;
  font-size: 14px;
  margin: 10px;
`;
