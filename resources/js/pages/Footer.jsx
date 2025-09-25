// Footer.jsx
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import styled from "styled-components";

const FooterContainer = styled.footer`
    padding: 8rem 0;
    border-top: 1px solid #e5e7eb;
    background-color: #f9fafb;
`;

const FooterGrid = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 1fr 1fr 1fr;
    gap: 4rem;
    max-width: 120rem;
    margin: 0 auto;
`;

const LogoCol = styled.div`
    display: flex;
    flex-direction: column;

    .footer-logo {
        display: block;
        margin-bottom: 2.4rem;

        .logo {
            width: 150px;
            height: auto;
        }
    }

    .social-links {
        list-style: none;
        display: flex;
        gap: 1.8rem;
        margin-bottom: 2rem;

        .social-icon {
            height: 2.4rem;
            width: 2.4rem;
            color: #4b5563;
            transition: color 0.3s;

            &:hover {
                color: #111827;
            }
        }
    }

    .copyright {
        font-size: 1.4rem;
        line-height: 1.6;
        color: #6b7280;
        margin-top: auto;
    }
`;

const FooterCol = styled.div`
    .footer-heading {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 2.4rem;
        color: #111827;
    }

    .contacts {
        font-style: normal;
        font-size: 1.6rem;
        line-height: 1.6;
        color: #374151;

        .address {
            margin-bottom: 1.6rem;
        }

        .footer-link {
            text-decoration: none;
            font-size: 1.6rem;
            color: #6b7280;
            transition: all 0.3s;

            &:hover {
                color: #111827;
            }
        }
    }

    .footer-nav {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 1.6rem;

        .footer-link {
            text-decoration: none;
            font-size: 1.6rem;
            color: #6b7280;
            transition: all 0.3s;

            &:hover {
                color: #111827;
            }
        }
    }
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterGrid>
                <LogoCol>
                    <a href="#" className="footer-logo">
                        <img
                            className="logo"
                            src="/img/remotehub-logo.png"
                            alt="Remote Work Hub Logo"
                        />
                    </a>
                    <ul className="social-links">
                        <li>
                            <a href="#" className="footer-link">
                                <FaLinkedin className="social-icon" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                <BsTwitterX className="social-icon" />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="footer-link">
                                <IoLogoGithub className="social-icon" />
                            </a>
                        </li>
                    </ul>
                    <p className="copyright">
                        © 2025 Remote Work Hub. All rights reserved.
                    </p>
                </LogoCol>

                <FooterCol>
                    <p className="footer-heading">Contact Us</p>
                    <address className="contacts">
                        <p className="address">
                            Kabul University Road, Kabul, Afghanistan
                        </p>
                        <p>
                            <a
                                className="footer-link"
                                href="tel:+93-700-123-456"
                            >
                                +93 700 123 456
                            </a>
                            <br />
                            <a
                                className="footer-link"
                                href="mailto:support@remoteworkhub.com"
                            >
                                support@remoteworkhub.com
                            </a>
                        </p>
                    </address>
                </FooterCol>

                <FooterCol>
                    <p className="footer-heading">Account</p>
                    <ul className="footer-nav">
                        <li>
                            <a className="footer-link" href="#">
                                Sign Up
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#">
                                Log In
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#">
                                Dashboard
                            </a>
                        </li>
                    </ul>
                </FooterCol>

                <FooterCol>
                    <p className="footer-heading">Company</p>
                    <ul className="footer-nav">
                        <li>
                            <a className="footer-link" href="#">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#">
                                For Employers
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#">
                                Careers
                            </a>
                        </li>
                    </ul>
                </FooterCol>

                <FooterCol>
                    <p className="footer-heading">Resources</p>
                    <ul className="footer-nav">
                        <li>
                            <a className="footer-link" href="#">
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#">
                                Blog
                            </a>
                        </li>
                        <li>
                            <a className="footer-link" href="#">
                                Privacy & Terms
                            </a>
                        </li>
                    </ul>
                </FooterCol>
            </FooterGrid>
        </FooterContainer>
    );
}
