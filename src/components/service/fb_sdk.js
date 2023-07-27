const FBsdk = {
  fbSdk(setAuthResponse, getFbProfilePic) {
    // SDK 載入完成時會立即呼叫 fbAsyncInit，在這個函式中對 Facebook SDK 進行初始化
    window.fbAsyncInit = function () {
      // 初始化 Facebook SDK
      window.FB.init({
        appId: 778417730589326,
        cookie: true,
        xfbml: true,
        version: "v16.0",
      });

      console.log("[fbAsyncInit] after window.FB.init");

      // 取得使用者登入狀態
      window.FB.getLoginStatus((response) => {
        if (response.status === "connected") {
          setAuthResponse(response);
          // 取得 fb 頭貼
          getFbProfilePic();
        }

        console.log("[refreshLoginStatus]", response);
      });

      // window.FB.AppEvents.logPageView();
    };

    // 載入 Facebook SDK
    (function (d, s, id) {
      // const js,
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      const js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  },
};

export default FBsdk;
