import { styled } from "styled-components";

import trashIcon from "../../images/trash.png";
import trashIconHover from "../../images/cart-remove-hover.png";

import StylishApi from "../service/stylish_api";
import { useEffect } from "react";

export default function CartItem({
  setTotalPrice,
  handleCartItemNumberChange,
  cart,
  setCart,
}) {
  const localStorage = window.localStorage.getItem("cart");
  const localStorageCart = JSON.parse(localStorage);

  // render shopping cart products
  function cartProducts() {
    function stock(item) {
      const list = [];
      for (let i = 0; i < item.stock; i++) {
        list.push(i);
      }
      return list.map((index) => {
        return (
          <option value={index + 1} key={index}>
            {index + 1}
          </option>
        );
      });
    }

    function handleChange(e, localStorageCartIndex) {
      setCart((prev) => {
        const newState = prev.map((obj, ind) => {
          if (ind === localStorageCartIndex) {
            return { ...obj, count: +e.target.value };
          }
          return obj;
        });

        return newState;
      });

      // update localStorage "cart" count
      localStorageCart[localStorageCartIndex].count = +e.target.value;
      window.localStorage.setItem("cart", JSON.stringify(localStorageCart));

      // update cart icon number on the header
      handleCartItemNumberChange();
    }

    function removeItem(ind, item) {
      // remove localStorage cart
      if (localStorageCart.length === 1) {
        window.localStorage.removeItem("cart");
      } else {
        localStorageCart.splice(ind, 1);
        window.localStorage.setItem("cart", JSON.stringify(localStorageCart));
      }

      // remove item in Cart state
      const newcart = cart.filter((cartItem) => cartItem.index !== item.index);
      setCart(newcart);

      // update cart icon number on the header
      handleCartItemNumberChange();
    }

    return cart.map((item, index) => {
      return (
        <Product key={index}>
          <ProductInfo>
            <img src={item.mainImage} alt="product" />
            <div>
              <p className="title">{item.name}</p>
              <p className="id">{item.id}</p>
              <p className="color">顏色｜{item.color.name}</p>
              <p className="size">尺寸｜{item.size}</p>
            </div>
          </ProductInfo>
          <SubPrice>
            <div className="item">
              <p className="hidden">數量</p>
              <select
                name="itemNumber"
                onChange={(e) => handleChange(e, index)}
                defaultValue={item.count}
              >
                {stock(item)}
              </select>
            </div>
            <div className="margin-left">
              <p className="hidden">單價</p>
              <p className="price">TWD.{item.price}</p>
            </div>
            <div>
              <p className="hidden">小計</p>
              <p className="subtotal">TWD.{item.price * item.count}</p>
            </div>
            <div
              className="trash-icon"
              onClick={() => removeItem(index, item)}
            ></div>
          </SubPrice>
        </Product>
      );
    });
  }

  // count total price based on the shopping cart right away
  function getTotalPrice() {
    let total = 0;
    cart.forEach((item) => {
      const subTotal = item.price * item.count;
      total += subTotal;
    });
    setTotalPrice(total);
  }

  // update product data with fetching data from api and update into cart state
  useEffect(() => {
    (async () => {
      if (localStorageCart && cart) {
        await localStorageCart.map((item) => {
          StylishApi.getProductDetail(item.id).then(({ data }) => {
            setCart((prev) => {
              const newState = prev.map((obj) => {
                if (obj.id === item.id) {
                  return {
                    ...obj,
                    price: data.price,
                    mainImage: data.main_image,
                    stock: data.variants[obj.variantIndex].stock,
                  };
                }
                return obj;
              });

              return newState;
            });
          });
        });
      }
    })();
  }, []);

  // update total price which will render in ./check.js
  useEffect(() => {
    cart && getTotalPrice();
  }, [cart]);

  return (
    <Container>
      <Title>
        <p>購物車</p>
        <div className="hidden">
          <p>數量</p>
          <p>單價</p>
          <p>小計</p>
        </div>
      </Title>
      <Cart>{cart && localStorageCart ? cartProducts() : null}</Cart>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  color: #3f3a3a;

  > p {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    margin-right: 490px;
  }

  > div {
    margin-right: 206px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    justify-content: space-between;

    > p:nth-of-type(2) {
      margin: 0 160px;
    }
  }

  @media screen and (max-width: 1279px) {
    > p {
      width: auto;
      display: contents;
    }

    .hidden {
      display: none;
    }
  }
`;

const Cart = styled.div`
  width: 100%;
  border: 1px solid #979797;
  margin-top: 16px;
  padding: 39px 29px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media screen and (max-width: 1279px) {
    margin-top: 7px;
    padding: 0;
    border: none;
    gap: 20px;
    height: auto;
  }
`;

const Product = styled.div`
  height: 152px;
  display: flex;
  align-items: center;

  @media screen and (max-width: 1279px) {
    border-top: 1px solid #3f3a3a;
    padding-top: 20px;
    height: 231px;
    margin-bottom: 20px;
    flex-direction: column;
    position: relative;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  color: #000000;
  font-style: normal;
  font-weight: 400;
  margin-right: 242px;

  img {
    width: 114px;
    height: 152px;
    margin-right: 16px;
  }

  .title {
    font-size: 16px;
    line-height: 19px;
    color: #3f3a3a;
  }

  .id {
    margin-top: 18px;
    font-size: 16px;
    line-height: 19px;
  }

  .color {
    margin-top: 22px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
  }

  .size {
    margin-top: 10px;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    margin-left: 1px;
  }

  @media screen and (max-width: 1279px) {
    margin: 0;
    width: 100%;
    font-family: "Noto Sans TC";
    font-style: normal;
    font-weight: 400;

    .title {
      font-size: 14px;
      line-height: 17px;
    }

    img {
      width: 114px;
      height: 152px;
      object-fit: contain;
      margin-right: 10px;
    }

    .id {
      margin-top: 20px;
      font-size: 14px;
      line-height: 17px;
    }

    .color {
      margin-top: 24px;
      font-size: 14px;
      line-height: 17px;
    }

    .size {
      margin-top: 12px;
      font-size: 14px;
      line-height: 17px;
    }
  }
`;

const SubPrice = styled.div`
  display: flex;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  select {
    width: 80px;
    height: 32px;
    background-color: #f3f3f3;
    border: 1px solid #979797;
    border-radius: 8px;
    padding-left: 10px;
    font-size: 14px;
    line-height: 16px;
    margin-right: 56px;
    font-family: "Noto Sans TC";
  }

  option {
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: #3f3a3a;
  }

  .subtotal,
  .price {
    width: 192px;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    margin-top: 2px;
  }

  .trash-icon {
    width: 44px;
    height: 44px;
    display: flex;
    margin-left: 52px;
    background: url(${trashIcon}) no-repeat;
    background-size: cover;
  }

  .trash-icon:hover {
    background: url(${trashIconHover}) no-repeat;
  }

  .hidden {
    display: none;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #3f3a3a;
    margin-top: 20px;
    margin-bottom: 12px;
  }

  @media screen and (max-width: 1279px) {
    width: 100%;
    justify-content: space-between;

    > div:nth-of-type(1) {
      padding-left: 12px;
    }

    .item {
      margin-bottom: 6px;
    }

    select {
      height: 30px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 17px;
    }

    .margin-left {
      margin-left: 10px;
    }

    .subtotal,
    .price {
      width: 104px;
      height: 30px;
      font-size: 14px;
      line-height: 17px;
      margin-top: 7px;
    }

    .trash-icon {
      position: absolute;
      top: 20px;
      right: 0;
    }

    .hidden {
      display: flex;
    }
  }
`;
