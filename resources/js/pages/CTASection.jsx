// CTASection.jsx
import { GoSearch } from "react-icons/go";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";
import styled from "styled-components";

const SectionCTA = styled.div`
    margin: 9.6rem 0 1.4rem 0;
`;

const CTAContainer = styled.div`
    max-width: 110rem;
    border: 1px solid #999;
    border-radius: 2.5rem;
    height: 20rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 40rem;
    padding: 1.7rem 3.4rem;
    justify-content: center;
    align-items: center;
    background-image: url("/cta-image(3).png");
    background-repeat: no-repeat;
    background-color: #154c1e;
`;

const CTALeft = styled.div`
    margin-left: 2rem;
    margin-bottom: 5rem;

    .cta-title,
    .cta-desc {
        color: #fff;
    }
`;

const CTARight = styled.div`
    border-radius: 2.5rem;
    display: grid;
    grid-template-columns: 1fr 30%;
    column-gap: 1.2rem;
    padding: 1.2rem;
    background-color: lightgrey;
`;

const RightLeft = styled.div`
    border-radius: 2.5rem;
    background-color: #fff;
    padding: 1.2rem 2.8rem;

    .cta-label {
        display: flex;
        align-items: center;
        gap: var(--space-6);
        font-size: var(--font-xs);
        font-weight: 500;
        color: var(--color-grey-700);
        margin-bottom: var(--space-2);
    }

    .cta-icon {
        font-size: var(--font-sm);
        color: var(--color-primary);
    }

    .cta-input {
        width: 100%;
        padding: var(--space-8) var(--space-12);
        font-size: var(--font-sm);
        border: 1px solid var(--color-grey-300);
        border-radius: var(--radius-sm);
        background-color: var(--color-grey-30);
        transition: border 0.2s;
        margin-bottom: var(--space-8);
        outline: none;

        &:focus {
            border-color: var(--color-primary);
        }
    }
`;

const RightRight = styled.div`
    border-radius: 2.5rem;
    padding: 1.4rem;
    background-color: #087f5b;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #066649;
        transform: translateY(-2px);
    }

    .btn-text {
        color: #fff;
        font-size: 1.6rem;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    .btn-icon {
        font-size: 4.8rem;
        color: #fff;
        transition: transform 0.2s ease;
    }

    &:hover .btn-icon {
        transform: scale(1.1);
    }
`;

export default function CTASection() {
    return (
        <SectionCTA>
            <CTAContainer>
                <CTALeft>
                    <div className="cta-description">
                        <h1 className="cta-title">Travel without limit</h1>
                        <p className="cta-desc">
                            Find the right e-visa trip, easy apply in minutes.
                        </p>
                    </div>
                </CTALeft>

                <CTARight>
                    <RightLeft>
                        <label htmlFor="email" className="cta-label">
                            <HiOutlineMail className="cta-icon" /> Your Email
                        </label>
                        <input id="email" type="email" className="cta-input" />

                        <label htmlFor="location" className="cta-label">
                            <HiOutlineLocationMarker className="cta-icon" />{" "}
                            Your Location
                        </label>
                        <input
                            id="location"
                            type="text"
                            className="cta-input"
                        />
                    </RightLeft>

                    <RightRight>
                        <p className="btn-text">Find us</p>
                        <span>
                            <GoSearch className="btn-icon" />
                        </span>
                    </RightRight>
                </CTARight>
            </CTAContainer>
        </SectionCTA>
    );
}
