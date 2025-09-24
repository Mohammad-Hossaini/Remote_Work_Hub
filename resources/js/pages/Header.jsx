import { Link } from "react-router-dom";
import styled from "styled-components";

/*==============================
  STYLED COMPONENTS
==============================*/

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 8rem;
    padding: 0 8rem;
    background-color: #e6f2ef;
`;

const Logo = styled.div``;

const WebsiteName = styled.h2`
    font-size: 2.4rem;
    font-weight: 800;
    color: #111827;
    line-height: 0.1;
`;

const Nav = styled.nav`
    ul {
        display: flex;
        list-style: none;
        gap: 1.8rem;
    }
`;

const NavItem = styled(Link)`
    text-decoration: none;
    color: #111827;
    font-size: 1.6rem;
    font-weight: 600;
    transition: all 0.5s;

    &:hover {
        color: #087f5b;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 2.4rem;
`;

const NavBtn = styled(Link)`
    display: inline-block;
    padding: 1.2rem 1.8rem;
    font-weight: 600;
    font-size: 1.4rem;
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s;
`;

const LoginBtn = styled(NavBtn)`
    color: #555;
    background-color: #fff;

    &:hover {
        background-color: #e6f2ef;
        box-shadow: inset 0 0 0 3px #fff; /* inner border */
    }
`;

const SignUpBtn = styled(NavBtn)`
    background-color: #114a38;
    color: #fff;

    &:hover {
        background-color: #087f5b;
    }
`;

/*==============================
  COMPONENT
==============================*/

export default function Header() {
    return (
        <HeaderContainer>
            <Logo>
                <WebsiteName>Remote Work Hub</WebsiteName>
            </Logo>

            <Nav>
                <ul>
                    <li>
                        <NavItem to="/">Home</NavItem>
                    </li>
                    <li>
                        <NavItem to="/features">Features</NavItem>
                    </li>
                    <li>
                        <NavItem to="/testimonial">Testimonial</NavItem>
                    </li>
                    <li>
                        <NavItem to="/gallery">Gallery</NavItem>
                    </li>
                    <li>
                        <NavItem to="/faq">FAQ</NavItem>
                    </li>
                    <li>
                        <NavItem to="/contact">Contact</NavItem>
                    </li>
                </ul>
            </Nav>

            <Buttons>
                <LoginBtn to="/login">Log in</LoginBtn>

                <SignUpBtn to="/createAccount">Sign up →</SignUpBtn>
            </Buttons>
        </HeaderContainer>
    );
}
