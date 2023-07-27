import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

import logo from "../images/logo.png";
import searchImg from "../images/search.png";
import cartImg from "../images/cart.png";
import cartHoverImg from "../images/cart-hover.png";
import cartMobileImg from "../images/cart-mobile.png";
import memberMobileImg from "../images/member-mobile.png";
import memberImg from "../images/member.png";
import memberHoverImg from "../images/member-hover.png";

export default function Header({ cartItemNumber, handleFBLogin }) {
  return (
    <>
      <HeaderContainer>
        <LogoMenuWrapper>
          <LogoWrapper>
            <a href="/home">
              <LogoImg></LogoImg>
            </a>
          </LogoWrapper>
          <MenuList>
            <MenuItem>
              <a href="/women">女裝</a>
            </MenuItem>
            <MenuItem>
              <a href="/men">男裝</a>
            </MenuItem>
            <MenuItem>
              <a href="/accessories">配件</a>
            </MenuItem>
          </MenuList>
        </LogoMenuWrapper>
        <SearchWrapper>
          <div></div>
          <SearchForm>
            <input placeholder="西裝"></input>
            <button></button>
          </SearchForm>
        </SearchWrapper>

        <CartAndMemberWrapper>
          <div>
            <Cart>
              <NavLink className="cart-link" to="/checkout">
                <div>
                  <CartNumber>{cartItemNumber}</CartNumber>
                </div>
                <p>購物車</p>
              </NavLink>
            </Cart>
            <Member>
              <NavLink to="/profile" className="member-link">
                <div></div>
                <p>會員</p>
              </NavLink>
            </Member>
          </div>
        </CartAndMemberWrapper>
      </HeaderContainer>
      <Split></Split>
    </>
  );
}

// styled component
const HeaderContainer = styled.section`
  width: 100vw;
  height: 100px;
  display: flex;
  align-items: center;
  z-index: 2;

  @media screen and (max-width: 1279px) {
    position: sticky;
    top: 0;
    left: 0;
    background-color: #ffffff;
    height: auto;
  }
`;

const LogoMenuWrapper = styled.div`
  padding: 26px 0 26px 60px;
  display: flex;
  align-items: end;

  @media screen and (max-width: 1279px) {
    width: 100vw;
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
`;

const LogoWrapper = styled.div`
  @media screen and (max-width: 1279px) {
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LogoImg = styled.h1`
  background: url("${logo}") no-repeat;
  background-size: contain;
  width: 258px;
  height: 48px;
  margin-right: 59px;

  @media screen and (max-width: 1279px) {
    width: 129px;
    height: 24px;
    margin: 0;
  }
`;

const MenuList = styled.ul`
  display: flex;
  width: 450px;
  padding-bottom: 1px;
  font-family: "Noto Sans TC";

  .active {
    color: #8b572a;
  }

  @media screen and (max-width: 1279px) {
    background-color: #313538;
    width: 100vw;
    height: 50px;
    color: #828282;

    .active {
      color: #ffffff;
    }
  }
`;

const MenuItem = styled.li`
  width: 150px;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  letter-spacing: 30px;
  text-indent: 39px;
  display: flex;
  align-items: center;
  margin: 0 auto;

  &:not(:last-child)::after {
    display: flex;
    content: "";
    height: 20px;
    width: 1px;
    margin-left: auto;
    background: #3f3a3a;
  }

  &:hover {
    color: #8b572a;
  }

  @media screen and (max-width: 1279px) {
    position: relative;
    width: 100%;
    justify-content: center;
    font-size: 16px;
    line-height: 138%;
    letter-spacing: 0;
    text-indent: 0;

    &:not(:last-child)::after {
      background-color: #808080;
      position: absolute;
      top: 50%;
      right: -1px;
      transform: translate(-50%, -50%);
      height: 16px;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.menuActiveMobile};
    }
  }
`;

const SearchWrapper = styled.div`
  display: flex;
  margin-left: auto;

  div {
    display: none;
  }

  @media screen and (max-width: 1279px) {
    div {
      display: flex;
      width: 40px;
      height: 40px;
      position: absolute;
      top: 6px;
      right: 16px;
      background: url(${searchImg});
      background-size: contain;
    }
  }
`;

const SearchForm = styled.form`
  border: 1px #979797 solid;
  border-radius: 20px;
  padding: 10px 16px 9px 19px;
  width: 214px;
  height: 44px;
  display: flex;
  align-items: center;
  font-family: "Noto Sans TC";

  input {
    width: 100%;
    line-height: 140%;
    font-size: 20px;
    border: none;
  }

  input:focus {
    border: none;
  }

  input::placeholder {
    color: #8b572a;
    font-family: "Noto Sans TC";
  }

  button {
    background: url(${searchImg});
    width: 44px;
    height: 44px;
  }
  @media screen and (max-width: 1279px) {
    display: none;
  }
`;

const CartAndMemberWrapper = styled.div`
  display: flex;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1279px) {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 60px;
    background-color: #313538;

    > div {
      width: 100%;
    }
  }
`;

const Cart = styled.div`
  margin: 0 42px;

  > a > div {
    width: 44px;
    height: 44px;
    position: relative;
    background: url(${cartImg}) no-repeat;
  }

  &:hover {
    cursor: pointer;
    > div {
      background: url(${cartHoverImg}) no-repeat;
    }
  }

  p {
    display: none;
  }

  .cart-link {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 1279px) {
    display: flex;
    flex-basis: 50%;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0;

    &::after {
      content: "";
      width: 1px;
      height: 24px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #ffffff;
    }

    > a > div {
      background: url(${cartMobileImg}) no-repeat;
    }

    p {
      display: flex;
      font-size: 16px;
      line-height: 100%;
      text-align: center;
      color: #ffffff;
    }
  }
`;

const CartNumber = styled.div`
  background: #8b572a;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  line-height: 24px;
`;

const Member = styled.div`
  margin-right: 54px;

  &:hover {
    cursor: pointer;
    div {
      background: url(${memberHoverImg}) no-repeat;
    }
  }

  div {
    width: 44px;
    height: 44px;
    background: url(${memberImg}) no-repeat;
  }

  p {
    display: none;
  }

  .member-link {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 1279px) {
    display: flex;
    flex-basis: 50%;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin: 0;

    div {
      background: url(${memberMobileImg}) no-repeat;
    }

    p {
      display: flex;
      font-size: 16px;
      line-height: 100%;
      text-align: center;
      color: #ffffff;
    }
  }
`;

const Split = styled.section`
  width: 100vw;
  height: 40px;
  background: #313538;

  @media screen and (max-width: 1279px) {
    display: none;
  }
`;
