import { useState, useEffect } from "react";
import styled from "styled-components";

export default function ProductDetails({ product, updateCartItemNumber }) {
  const [selectedColor, setSelectedColor] = useState(); // color code
  const [selectedSize, setSelectedSize] = useState(); // size name
  const [productVariant, setProductVariant] = useState(product.variants);
  const [itemNumber, setItemNumber] = useState(0);

  const cart = JSON.parse(window.localStorage.getItem("cart"));
  const currentColorVariant = productVariant.filter(
    (obj) => obj.color_code === selectedColor
  );
  const currentColor = product.colors.filter(
    (color) => color.code === selectedColor
  );
  const currentProductVariant = productVariant.find(
    (variant) =>
      variant.color_code === selectedColor && variant.size === selectedSize
  );
  const currentProductVariantIndex = productVariant.indexOf(
    currentProductVariant
  );

  // map through product.colors to get color render
  const colors = product.colors.map((color, index) => {
    return (
      <div key={index} className={selectedColor === color.code ? "active" : ""}>
        <div
          key={color.name}
          id={index}
          className="product-color"
          onClick={() => handleClickColor(color.code)}
          style={{ background: `#${color.code}` }}
        ></div>
      </div>
    );
  });

  // map through product.sizes to get size render
  const sizes = product.sizes.map((size, index) => {
    return (
      <div
        key={index}
        className={`product-size ${handleSizeClassName(size, index)}`}
        onClick={() => handleClickSize(size, index)}
        id={index}
      >
        {size}
      </div>
    );
  });

  // update localStorage cart itemNumber to productVariant
  function updateProductVariant() {
    cart?.forEach((item, index) => {
      if (item.id === product.id) {
        const data = product.variants.map((pv) => {
          if (pv.color_code === item.color.code && pv.size === item.size) {
            const updated = { ...pv, stock: (pv.stock -= item.count) };
            return updated;
          }
          return pv;
        });
        setProductVariant(data);
      }
    });
  }

  // handle itemNumber
  function changeItemNumber(delta) {
    if (delta === 0) {
      setItemNumber(0);
    }
    setItemNumber((prev) => prev + delta);
  }

  function handleClickColor(colorCode) {
    setSelectedColor(colorCode);
    setSelectedSize();
    changeItemNumber(0);
  }

  function handleClickSize(size, index) {
    if (currentColorVariant.length > 0) {
      if (currentColorVariant[index].stock === 0) {
        setSelectedSize();
      } else {
        setSelectedSize(size);
      }
    }
  }

  // handle size's class name
  function handleSizeClassName(size, index) {
    if (selectedColor === undefined || currentColorVariant[index].stock <= 0) {
      return " disable";
    }
    if (selectedSize === size) {
      return " active";
    }
    return " inactive";
  }

  // handle itemNumver +1
  function handleIncrement() {
    if (
      selectedColor &&
      selectedSize !== undefined &&
      productVariant[currentProductVariantIndex].stock > itemNumber
    ) {
      changeItemNumber(+1);
    }
  }

  // set localstorage when adding product to cart
  function addToCart(cartItem) {
    const localStorageCart = window.localStorage.getItem("cart");
    if (localStorageCart === null) {
      window.localStorage.setItem("cart", JSON.stringify([cartItem]));
    } else {
      const getCurrentCart = window.localStorage.getItem("cart");
      const currentCart = JSON.parse(getCurrentCart);

      const prevCartItem = currentCart.find(
        (productObj) =>
          productObj.id === cartItem.id &&
          productObj.color.code === cartItem.color.code &&
          productObj.size === cartItem.size
      );
      prevCartItem
        ? (prevCartItem.count += itemNumber)
        : currentCart.push(cartItem);

      window.localStorage.setItem("cart", JSON.stringify(currentCart));
    }
  }

  // handle click add-to-cart button
  function handleAddToCart() {
    // structure of data to store in localstorage
    const cartLS = JSON.parse(window.localStorage.getItem("cart"));
    const productToAdd = {
      index: cartLS ? cartLS.length : 0,
      id: product.id,
      name: product.title,
      mainImage: product.main_image,
      color: currentColor[0],
      size: selectedSize,
      count: itemNumber,
      price: product.price,
      variantIndex: currentProductVariantIndex,
    };

    if (itemNumber) {
      addToCart(productToAdd);

      // reset size, color and number
      changeItemNumber(0);
      setSelectedColor();
      setSelectedSize();

      // update cart icon number
      updateCartItemNumber();

      // update variant stock
      handleProductVariant(itemNumber);
    }
  }

  // update productVariant stock
  function handleProductVariant(qty) {
    const currentProductVariantItem = productVariant.find(
      (variant) =>
        variant.color_code === selectedColor && variant.size === selectedSize
    );
    const currentProductVariantItemIndex = productVariant.indexOf(
      currentProductVariant
    );
    if (currentProductVariantItem) {
      setProductVariant((prev) => {
        const newState = prev.map((obj, ind) => {
          if (ind === currentProductVariantItemIndex) {
            return { ...obj, stock: obj.stock - qty };
          }
          return obj;
        });

        return newState;
      });
    }
  }

  const btnContent = () => {
    if (!selectedColor) {
      return "請選擇顏色";
    } else if (selectedSize === undefined) {
      return "請選擇尺寸";
    } else if (itemNumber === 0) {
      return "請選擇數量";
    }
    return "加入購物車";
  };

  // update productVariant with localStorage
  useEffect(() => {
    console.log("effect!");
    updateProductVariant();
  }, []);

  return (
    <ProductDetailsContainer>
      <ProductMainImg
        src={product.main_image}
        alt="product image"
      ></ProductMainImg>
      <ProductInfoWrapper>
        <div>
          <p className="product-name">{product.title}</p>
          <p className="product-serial-number">{product.id}</p>
        </div>
        <p className="product-price">TWD.{product.price}</p>
        <hr />
        <ProductOptions className="product-colors">
          <p>顏色</p>
          {colors}
        </ProductOptions>
        <ProductOptions className="product-sizes">
          <p>尺寸</p>
          {sizes}
        </ProductOptions>
        <ProductOptions className="product-quantities">
          <p>數量</p>
          <div className="flex-row product-quantity">
            <div
              className="product-quantity-operator"
              onClick={
                selectedColor &&
                selectedSize !== undefined &&
                !(itemNumber === 0)
                  ? () => changeItemNumber(-1)
                  : null
              }
            >
              -
            </div>
            <div className="product-quantity-number">{itemNumber}</div>
            <div
              className="product-quantity-operator"
              onClick={() => handleIncrement()}
            >
              +
            </div>
          </div>
        </ProductOptions>
        <div className="product-add-to-cart" onClick={handleAddToCart}>
          {btnContent()}
        </div>
        <div className="product-details">
          <p>{product.note}</p>
          <div>
            <p>{product.texture}</p>
            <p style={{ whiteSpace: "pre-wrap" }}>{product.description}</p>
          </div>
          <div>
            <p>清洗：{product.wash}</p>
            <p>產地：{product.place}</p>
          </div>
        </div>
      </ProductInfoWrapper>
    </ProductDetailsContainer>
  );
}

const ProductDetailsContainer = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1279px) {
    flex-direction: column;
  }
`;

const ProductMainImg = styled.img`
  width: 560px;
  height: 746px;
  object-fit: cover;

  @media screen and (max-width: 1279px) {
    width: 100%;
    max-width: 960px;
    height: auto;
    object-fit: contain;
  }
`;

const ProductInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  color: #3f3a3a;
  font-weight: 400;
  font-size: 20px;
  line-height: 150%;

  .flex-row {
    display: flex;
  }

  .product-name {
    font-size: 32px;
    line-height: 119%;
    letter-spacing: 6.4px;
  }

  .product-serial-number {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
    color: #bababa;
    margin-top: 16px;
  }

  .product-price {
    font-size: 30px;
    line-height: 36px;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .product-colors {
    margin-top: 29px;

    .product-color {
      border: 1px solid #979797;
      width: 24px;
      height: 24px;
    }

    > div {
      width: 36px;
      height: 36px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px;
    }

    > div:nth-of-type(1) {
      margin: 0 10px 0 -2px;
      /* border: 1px solid #979797; //FIXME: demo active only */
    }

    .active {
      border: 1px solid #979797;
    }
  }

  .product-sizes {
    margin-top: 29px;

    .product-size {
      width: 36px;
      height: 36px;
      border-radius: 18px;
      font-size: 20px;
      line-height: 36px;
      text-align: center;
      font-weight: 400;
      font-size: 20px;
      line-height: 180%;
      margin: 0 10px;
      background: #ececec;
      color: #3f3a3a;
    }

    .product-size:nth-of-type(1) {
      margin: 0 10px 0 0;
    }

    .active {
      background: #000000;
      color: #ffffff;
    }

    .inactive {
      background: ${({ theme }) => theme.backgroundColors.sizeInactive};
      color: ${({ theme }) => theme.colors.sizeInactive};
    }

    .disable {
      background: ${({ theme }) => theme.backgroundColors.sizeDisable};
      color: ${({ theme }) => theme.colors.sizeDisable};
    }
  }
  .product-quantities {
    margin-top: 22px;
    align-items: center;
    font-size: 16px;
    line-height: 200%;

    .product-quantity {
      width: 160px;
      height: 44px;
      border: 1px #979797 solid;
      display: flex;
      justify-content: space-between;
      padding: 5px 14px;
    }

    .product-quantity-operator:hover {
      cursor: pointer;
    }

    .product-quantity-number {
      font-weight: 400;
      color: #8b572a;
    }
  }

  .product-add-to-cart {
    width: 360px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000;
    border: 1px solid #979797;
    color: #ffffff;
    font-size: 20px;
    line-height: 150%;
    letter-spacing: 4px;
    margin-top: 26px;
  }

  .product-add-to-cart:hover {
    cursor: pointer;
  }

  .product-details {
    display: flex;
    flex-direction: column;
    height: 240px;
    justify-content: space-between;
    font-size: 20px;
    line-height: 30px;
    color: #3f3a3a;
    padding-left: 6px;
    margin-top: 41px;
  }

  @media screen and (max-width: 1279px) {
    padding: 0 24px;
    padding-top: 1px;

    .product-name {
      margin-top: 17px;
      font-size: 20px;
      line-height: 120%;
      letter-spacing: 4px;
    }

    .product-serial-number {
      margin-top: 9px;
      font-size: 16px;
      line-height: 119%;
      letter-spacing: 3.2px;
    }

    .product-price {
      margin-top: 21px;
      margin-bottom: 8px;
      font-size: 20px;
      line-height: 120%;
    }

    .product-colors {
      > div {
        margin: 0 7.5px;
      }

      > div:nth-of-type(1) {
        margin: 0 7.5px 0 0;
      }
    }

    .product-sizes {
      .product-size {
        margin: 0 7.5px;
      }

      .product-size:nth-of-type(1) {
        margin: 0 7.5px 0 0;
      }
    }

    .product-quantities {
      margin-top: 29px;

      p {
        display: none;
      }
      .product-quantity {
        width: 100%;
        height: 44px;
        font-size: 20px;
        line-height: 110%;
        align-items: center;
        justify-content: space-between;
        padding: 10px 50px;
      }

      div {
        font-size: 16px;
        line-height: 22px;
      }

      .product-quantity-number {
        font-size: 20px;
        line-height: 110%;
        height: 22px;
        width: 12px;
      }
    }

    .product-add-to-cart {
      width: 100%;
      height: 44px;
      margin-top: 10px;
      font-size: 16px;
      line-height: 188%;
      letter-spacing: 3.2px;
      padding-left: 4px;
    }

    .product-details {
      font-size: 14px;
      line-height: 171%;
      margin-top: 29px;
      height: 192px;
      padding-left: 0px;
    }

    @media screen and (max-width: 360px) {
      .product-quantities {
        .product-quantity {
          padding: 0 34px;
        }
      }
    }
  }
`;

const ProductOptions = styled.div`
  display: flex;
  align-items: center;

  p {
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 4px;
    display: flex;
    align-items: center;
    width: 68px;
    margin-right: 24px;
  }

  p::after {
    display: flex;
    content: "";
    height: 21px;
    width: 1px;
    background: #3f3a3a;
    margin-left: 9px;
  }
  @media screen and (max-width: 1279px) {
    p {
      font-size: 14px;
      line-height: 121%;
      letter-spacing: 2.8px;
      margin-right: 0;
      width: 62px;
    }

    p::after {
      height: 15px;
      margin-left: 6px;
    }
  }
`;
