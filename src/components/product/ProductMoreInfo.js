import styled from "styled-components";

export default function ProductMoreInfo({ product }) {
  const productImages = product.images.map((image, index) => {
    return (
      <ProductImg
        key={index}
        src={image}
        alt="more product images"
      ></ProductImg>
    );
  });
  return (
    <ProductMoreInfoWrapper>
      <MoreInfoMarker>更多產品資訊</MoreInfoMarker>
      <ProductDescription>{product.story}</ProductDescription>
      {productImages}
    </ProductMoreInfoWrapper>
  );
}

const ProductMoreInfoWrapper = styled.div`
  padding: 0 24px;
`;

const MoreInfoMarker = styled.p`
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 150%;
  letter-spacing: 3px;
  color: #8b572a;
  margin-top: 51px;

  &::after {
    content: "";
    width: 761px;
    height: 1px;
    background: #3f3a3a;
    display: flex;
    margin-left: auto;
  }

  @media screen and (max-width: 1279px) {
    margin-top: 27px;
    font-size: 16px;
    line-height: 188%;
    letter-spacing: 3.2px;
    width: 100%;

    &::after {
      margin-left: auto;
      margin-bottom: 1px;
      width: calc(100% - 122px - 25px);
    }
  }
`;

const ProductDescription = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;
  color: #3f3a3a;
  margin-top: 28px;
  margin-bottom: 30px;

  @media screen and (max-width: 1279px) {
    font-size: 14px;
    line-height: 179%;
    margin-bottom: 19px;
    margin-top: 13px;
  }
`;

const ProductImg = styled.img`
  width: 960px;
  height: 540px;
  object-fit: cover;
  margin-bottom: 27px;

  @media screen and (max-width: 1279px) {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
  }
`;
