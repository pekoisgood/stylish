import { useEffect, useState } from "react";
import { styled, ThemeProvider } from "styled-components";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Product from "./components/product/Product";
import Checkout from "./components/checkout/Checkout";
import Profile from "./components/profile/Profile";
import OrderComplete from "./components/orderComplete/OrderComplete";
import FBsdk from "./components/service/fb_sdk";
import api from "./components/service/stylish_api";

function App() {
  const [cartItemNumber, setCartItemNumber] = useState(0);
  const [authResponse, setAuthResponse] = useState();
  const [orderToken, setOrderToken] = useState();
  const [orderNumber, setOrderNumber] = useState();
  const [member, setMember] = useState();

  function handleCartItemNumberChange() {
    const localStorage = window.localStorage.getItem("cart");
    if (localStorage) {
      const localStorageCart = JSON.parse(localStorage);
      let cartTotalCount = 0;
      localStorageCart.forEach((cart) => (cartTotalCount += cart.count));
      setCartItemNumber(cartTotalCount);
    }
  }

  const handleFBLogin = () => {
    // 跳出 Facebook 登入的對話框
    window.FB.login(
      (response) => {
        if (response.status === "connected") {
          setAuthResponse(response);
          getFbProfilePic();
        }
        console.log("handleFBLogin", response);
      },
      { scope: "public_profile,email" }
    );
  };

  function getFbProfilePic() {
    window.FB.api(
      "/me",
      "GET",
      { fields: "name,email,id,picture.width(150).height(150)" },
      (response) => {
        setAuthResponse((prev) => {
          return {
            ...prev,
            user: {
              picture: response.picture.data.url,
            },
          };
        });
      }
    );
  }

  useEffect(() => {
    (async () => {
      // FB sdk init and getLoginStatus
      await FBsdk.fbSdk(setAuthResponse, getFbProfilePic);
      // update cart-icon number
      handleCartItemNumberChange();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (authResponse && orderToken === undefined) {
        await api
          .getUserSignin(authResponse.authResponse.accessToken)
          .then(({ data }) => {
            setMember({
              name: data.user.name,
              id: data.user.id,
              email: data.user.email,
              picture: data.user.picture,
              token: data.access_token,
            });
            setOrderToken(data.access_token);
          });
      }
    })();
  }, [authResponse]);

  return (
    <ThemeProvider theme={theme}>
      <Div className="App">
        <Header cartItemNumber={cartItemNumber} handleFBLogin={handleFBLogin} />
        <Routes>
          <Route
            path="/product"
            element={
              <Product
                updateCartItemNumber={handleCartItemNumberChange}
                cartItemNumber={cartItemNumber}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cartItemNumber={cartItemNumber}
                handleCartItemNumberChange={handleCartItemNumberChange}
                authResponse={authResponse}
                orderToken={orderToken}
                setOrderNumber={setOrderNumber}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                authResponse={authResponse}
                handleFBLogin={handleFBLogin}
                setOrderToken={setOrderToken}
                orderToken={orderToken}
                member={member}
              />
            }
          />
          <Route
            path="/orderComplete"
            element={<OrderComplete orderNumber={orderNumber} />}
          />
        </Routes>
        <Footer />
      </Div>
    </ThemeProvider>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const theme = {
  devices: {
    mobile1280: "1279px",
  },
  colors: {
    menuActiveDesktop: "#8B572A",
    menuActiveMobile: "#FFFFFF",
    sizeActive: "#FFFFFF",
    sizeInactive: "#3F3A3A",
    sizeDisable: "rgba(63, 58, 58, 0.25)",
  },
  backgroundColors: {
    sizeActive: "#000000",
    sizeInactive: "#ECECEC",
    sizeDisable: "rgba(236, 236, 236, 0.25);",
  },
};

export default App;
