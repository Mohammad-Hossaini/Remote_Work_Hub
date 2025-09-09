import { HiOutlineHomeModern } from "react-icons/hi2";
import styled from "styled-components";
const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.4rem;
`;
const IconStyled = styled.p`
  font-size: 2.8rem;
  color: #065a3f;
`;
const StyledName = styled.p`
  font-size: 2rem;
  font-weight: 600;
`;
function Logo() {
  return (
    <StyledLogo>
      <IconStyled>
        <HiOutlineHomeModern />
      </IconStyled>
      <StyledName>Remote Work Hub</StyledName>
    </StyledLogo>
  );
}

export default Logo;
