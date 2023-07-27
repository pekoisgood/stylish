import { styled } from "styled-components";
import { NavLink } from "react-router-dom";

export default function OrderComplete({ orderNumber }) {
  if (!orderNumber) return <Wrapper></Wrapper>;
  return (
    <Wrapper>
      <p>感謝購買</p>
      <p>您的訂單編號：{orderNumber}</p>
      <GifWrapper>
        <Gif
          src="https://giphy.com/embed/rpprIxlWODdRhmEHkT"
          width="400"
          height="400"
          className="giphy-embed"
          allowFullScreen
        ></Gif>
        <p>
          <a href="https://giphy.com/gifs/rpprIxlWODdRhmEHkT">via GIPHY</a>
        </p>
      </GifWrapper>
      <LinkWrapper>
        <a href="/home">
          <Link>回到首頁</Link>
        </a>
        <NavLink to="/profile">
          <Link>會員中心</Link>
        </NavLink>
      </LinkWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  min-height: calc(100vh - 140px - 115px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

const Gif = styled.iframe``;

const GifWrapper = styled.div`
  margin-top: 30px;

  a {
    display: flex;
    justify-content: center;
    font-size: 10px;
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
`;

const Link = styled.div`
  width: 100px;
  padding: 7px 15px;
  border: 1px solid bisque;
  border-radius: 8px;
`;
