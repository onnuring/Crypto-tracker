import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "./atoms";

const HeaderWrap = styled.header`
  position: fixed;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  background-color: ${(props) => props.theme.bgColor};
`;

const HeaderList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 480px;
  height: 50px;
  margin: 0 auto;
  padding: 0 20px;
`;

const ToggleBtn = styled.span`
  display: block;
  padding: 5px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 0.8rem;
  cursor: pointer;
`;

const Header = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  return (
    <HeaderWrap>
      <HeaderList>
        <li>
          <Link to={"/Crypto-tracker"}>HOME</Link>
        </li>
        <li>
          <ToggleBtn onClick={toggleDarkAtom}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </ToggleBtn>
        </li>
      </HeaderList>
    </HeaderWrap>
  );
};

export default Header;
