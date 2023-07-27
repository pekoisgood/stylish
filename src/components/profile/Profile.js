import styled from "styled-components";
import { GiCutDiamond } from "react-icons/gi";

export default function Profile({ authResponse, handleFBLogin, member }) {
  if (authResponse) {
    if (!Object.keys(authResponse).includes("user")) {
      return null;
    }
  }

  return (
    <Wrapper>
      {authResponse && member ? (
        <Member>
          <MemberImg>
            <img src={authResponse.user.picture} alt="member-pic" />
          </MemberImg>
          <MemberInfo>
            <p>姓名：{member.name}</p>
            <p>信箱：{member.email}</p>
            <p>
              會員等級：鑽石會員
              <GiCutDiamond />
            </p>
            {/* <LogOut onClick={handleFBLogout}>登出</LogOut> */}
          </MemberInfo>
        </Member>
      ) : (
        <Login onClick={handleFBLogin}>
          您尚未登入
          <br />
          （點我登入）
        </Login>
      )}
    </Wrapper>
  );
}

// styled component
const Wrapper = styled.section`
  width: 100vw;
  height: 100%;
  min-height: calc(100vh - 140px - 115px);
  display: flex;
  justify-content: center;
  align-items: start;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const Member = styled.div`
  border: 1px solid bisque;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Login = styled.button`
  width: 120px;
  height: 80px;
  border: none;
  border-radius: 20px;
  background-color: bisque;
`;

const MemberImg = styled.div`
  border-radius: 50%;
  background-color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 180px;
  margin-bottom: 40px;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  p {
    margin-bottom: 20px;
    font-size: 18px;
    font-family: "Noto Sans TC";
    color: darkolivegreen;
  }

  .order {
    cursor: pointer;
  }
`;
