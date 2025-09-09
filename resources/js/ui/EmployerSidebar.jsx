import styled from "styled-components";
import EmployerMainnav from "./EmployerMainnav";
import Logo from "./Logo";

const StyledSidebar = styled.div`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1/-1;
`;
function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      {/* <MainNav /> */}
      <EmployerMainnav />
    </StyledSidebar>
  );
}

export default Sidebar;
