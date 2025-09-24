// Pricing.jsx
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import styled from "styled-components";

const SectionPricing = styled.div`
    font-family: "Rubik", sans-serif;
    margin: 3rem 0 9.6rem 0;
`;

const PricingTitle = styled.div`
    text-align: center;
    margin-bottom: 6.4rem;

    .subheading {
        color: #087f5b;
        font-weight: 500;
    }

    .heading-secondary {
        margin-top: 1.4rem;
    }
`;

const PricingContainer = styled.div`
    max-width: 120rem;
    padding: 0 3.2rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 6.4rem;
    row-gap: 9.6rem;
`;

const PricingPlan = styled.div`
    border-radius: 11px;
    width: 70%;
    height: 85vh;
    padding: ${(props) => (props.variant === "starter" ? "4.6rem" : "4.8rem")};
    background-color: ${(props) =>
        props.variant === "complete" ? "#e6f2ef" : "transparent"};
    border: ${(props) =>
        props.variant === "starter" ? "2px solid #e6f2ef" : "none"};
    justify-self: ${(props) => (props.variant === "starter" ? "end" : "auto")};
    position: relative;
    overflow: hidden;

    &::after {
        content: ${(props) =>
            props.variant === "complete" ? '"Best value"' : '""'};
        position: absolute;
        top: 6%;
        right: -18%;
        text-transform: uppercase;
        font-size: 1.4rem;
        font-weight: 700;
        color: #333;
        background-color: #ffd43b;
        padding: 0.8rem 8rem;
        transform: rotate(45deg);
    }
`;

const PlanHeader = styled.header`
    text-align: center;
    margin-bottom: 4.8rem;
`;

const PlanName = styled.p`
    color: #087f5b;
    font-weight: 600;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: 0.75px;
    margin-bottom: 1.8rem;
`;

const PlanPrice = styled.p`
    font-size: 6rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 1.6rem;

    span {
        font-size: 2.4rem;
        font-weight: 500;
        margin-right: 0.8rem;
    }
`;

const PlanText = styled.p`
    font-size: 1.6rem;
`;

const List = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
`;

const ListItem = styled.li`
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    gap: 1.6rem;
    line-height: 1.2;

    .list-icon {
        width: 2.4rem;
        height: 2.4rem;
        color: #087f5b;
    }
`;

const PlanSignUp = styled.div`
    text-align: center;
    margin-top: 3.4rem;

    .pricing-btn {
        display: inline-block;
        padding: 1.4rem 2.8rem;
        font-weight: 500;
        font-size: 1.6rem;
        color: #fff;
        border-radius: 5px;
        background-color: #114a38;
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
            background-color: #087f5b;
        }
    }
`;

export default function Pricing() {
    return (
        <SectionPricing>
            <PricingTitle>
                <span className="subheading">Pricing</span>
                <h2 className="heading-secondary">
                    Eating well without breaking the bank
                </h2>
            </PricingTitle>

            <PricingContainer>
                <PricingPlan variant="starter">
                    <PlanHeader>
                        <PlanName>Starter</PlanName>
                        <PlanPrice>
                            <span>$</span>399
                        </PlanPrice>
                        <PlanText>per month. That's just $13 per job!</PlanText>
                    </PlanHeader>

                    <List>
                        <ListItem>
                            <FaCheck className="list-icon" />
                            <span>1 meal per day</span>
                        </ListItem>
                        <ListItem>
                            <FaCheck className="list-icon" />
                            <span>Order from 11am to 9pm</span>
                        </ListItem>
                        <ListItem>
                            <FaCheck className="list-icon" />
                            <span>Delivery is free</span>
                        </ListItem>
                        <ListItem>
                            <RxCross2 className="list-icon" />
                            <span></span>
                        </ListItem>
                    </List>

                    <PlanSignUp>
                        <a href="#" className="pricing-btn">
                            Start getting now
                        </a>
                    </PlanSignUp>
                </PricingPlan>

                <PricingPlan variant="complete">
                    <PlanHeader>
                        <PlanName>Complete</PlanName>
                        <PlanPrice>
                            <span>$</span>399
                        </PlanPrice>
                        <PlanText>per month. That's just $13 per job!</PlanText>
                    </PlanHeader>

                    <List>
                        <ListItem>
                            <FaCheck className="list-icon" />
                            <span>1 meal per day</span>
                        </ListItem>
                        <ListItem>
                            <FaCheck className="list-icon" />
                            <span>Order from 11am to 9pm</span>
                        </ListItem>
                        <ListItem>
                            <FaCheck className="list-icon" />
                            <span>Delivery is free</span>
                        </ListItem>
                        <ListItem>
                            <FaCheck className="list-icon" />
                            <span>Delivery is free</span>
                        </ListItem>
                    </List>

                    <PlanSignUp>
                        <a href="#" className="pricing-btn">
                            Upgrade Now
                        </a>
                    </PlanSignUp>
                </PricingPlan>
            </PricingContainer>
        </SectionPricing>
    );
}
