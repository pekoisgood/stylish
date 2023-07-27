import { styled } from "styled-components";
import { useState } from "react";
import { useImmer } from "use-immer";
import { useNavigate } from "react-router-dom";

import Cart from "./Cart";
import Payment from "./Payment";
import Order from "./Order";
import Check from "./Check";
import api from "../service/stylish_api";

export default function Checkout({
  handleCartItemNumberChange,
  authResponse,
  orderToken,
  setOrderNumber,
}) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [order, updateOrder] = useImmer({
    username: "",
    phone: "",
    address: "",
    email: "",
    deliverTime: "",
    validUsername: "",
    validPhone: "",
    validAddress: "",
    validEmail: "",
    validDeliverTime: "",
  });
  const [cart, setCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );

  // for redirect to orderComplete
  const navigate = useNavigate();

  function getOrderdata(primeNumber, price, orderDataObj, cartObj) {
    const cartList = cartObj.map((item) => {
      return {
        id: item.id,
        name: item.name,
        price: item.price,
        color: item.color,
        size: item.size,
        qty: item.count,
      };
    });

    return {
      prime: primeNumber,
      order: {
        shipping: "delivery",
        payment: "credit_card",
        subtotal: price,
        freight: 30,
        total: totalPrice + 30,
        recipient: {
          name: orderDataObj.username,
          phone: orderDataObj.phone,
          email: orderDataObj.email,
          address: orderDataObj.address,
          time: orderDataObj.deliverTime,
        },
        list: cartList,
      },
    };
  }

  // submit button
  async function handleSubmit(event) {
    event.preventDefault();

    if (!authResponse) {
      alert("Please login first!");
    }

    // 取得 TapPay Fields 的 status
    const tappayStatus = window.TPDirect.card.getTappayFieldsStatus();
    console.log(tappayStatus);

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
      alert("can not get prime");
      return;
    }

    // Get prime
    const prime = await new Promise((resolve) => {
      window.TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
          alert(`get prime error ${result.msg}`);
        }
        resolve(result.card.prime);
      });
    });

    if (!prime || !cart) {
      console.log("no prime || cart");
      return;
    }
    // get orderData object for body of order checkout api
    const orderData = getOrderdata(prime, totalPrice, order, cart);

    console.log("orderToken: ", orderToken);
    console.log("orderData: ", orderData);
    // fetch order number from checkout api
    await api.getOrderCheckOut(orderToken, orderData).then(({ data }) => {
      if (data) {
        // set up 訂單編號
        setOrderNumber(data.number);
        // redirect to orderComplete page
        navigate("/orderComplete");
        // remove cart items in localStorage
        window.localStorage.removeItem("cart");
        handleCartItemNumberChange();
      }
    });
  }

  return (
    <Container onSubmit={(e) => handleSubmit(e)}>
      <Cart
        setTotalPrice={setTotalPrice}
        handleCartItemNumberChange={handleCartItemNumberChange}
        cart={cart}
        setCart={setCart}
      />
      <Order order={order} updateOrder={updateOrder} />
      <Payment />
      <Check totalPrice={totalPrice} />
    </Container>
  );
}

const Container = styled.form`
  max-width: 1160px;
  width: 100vw;
  min-height: calc(100vh - 140px - 115px);
  margin: 51px auto 128px auto;

  @media screen and (max-width: 1279px) {
    margin: 0 auto;
    width: 100%;
    padding: 17px 24px 14px 24px;
  }
`;
