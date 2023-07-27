const hostName = "api.appworks-school.tw";
const version = "1.0";

const productDetailUrl = `https://${hostName}/api/${version}/products/details?id=`;
const signinUrl = `https://${hostName}/api/${version}/user/signin`;
const orderCheckoutUrl = `https://${hostName}/api/${version}/order/checkout`;

const api = {
  async getProductDetail(id) {
    try {
      const res = await fetch(productDetailUrl + id);
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error fetching data", error);
      return null;
    }
  },
  async getUserSignin(token) {
    try {
      const res = await fetch(signinUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider: "facebook", access_token: token }), // eslint-disable-line
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.log("Error fetching data in signin", error);
      return null;
    }
  },
  async getOrderCheckOut(token, body) {
    try {
      const res = await fetch(orderCheckoutUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      return data;
    } catch (error) {
      console.log("Error fetching order check out api...", error);
      return null;
    }
  },
};

export default api;
