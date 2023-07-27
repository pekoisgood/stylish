import { useState, useEffect } from "react";
import styled from "styled-components";

import StylishApi from "../service/stylish_api";

import ProductDetails from "./ProductDetails";
import ProductMoreInfo from "./ProductMoreInfo";

import loadingImg from "../../images/loading.gif";

export default function Product({ updateCartItemNumber }) {
  const [product, setProduct] = useState();

  const queryString = new URLSearchParams(window.location.search);
  const productId = queryString.get("id");

  useEffect(() => {
    (async () => {
      await StylishApi.getProductDetail(productId).then(({ data }) => {
        setProduct(data);
      });
    })();
  }, []);

  return (
    <ProductContainer>
      {product ? (
        <>
          <ProductDetails
            product={product}
            updateCartItemNumber={updateCartItemNumber}
          />
          <ProductMoreInfo product={product} />
        </>
      ) : (
        <Loading src={loadingImg} />
      )}
    </ProductContainer>
  );
}

const ProductContainer = styled.section`
  max-width: 960px;
  width: 100vw;
  min-height: calc(100vh - 140px - 115px);
  margin: 65px auto 0 auto;

  position: relative;

  @media screen and (max-width: 1279px) {
    margin: 0 auto;
  }
`;

const Loading = styled.img`
  position: absolute;
  width: 100px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
