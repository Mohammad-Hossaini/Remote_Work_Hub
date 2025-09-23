// Testimonial.jsx
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const TestimonialSection = styled.div`
    padding: 0 0 6.4rem 0;
    margin: 0 auto;
    max-width: 120rem;
`;

const TestimonialTitle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    align-items: center;
    margin-bottom: 6.4rem;
    text-align: center;

    h3 {
        font-size: var(--font-xl);
        font-weight: 900;
        line-height: 0.5;
        text-align: center;
        margin-bottom: -5rem;
        color: #1f2937;
    }

    p {
        font-size: 1.6rem;
        color: #555;
        line-height: 1.6;
        max-width: 60rem;
    }
`;

const TestimonialContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 4.8rem;
`;

const TestimonialBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2.4rem;
    background: #f9f9f9;
    border-radius: 1.2rem;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-0.4rem);
        box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
    }
`;

const CustomerProfile = styled.img`
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    margin-bottom: 1.6rem;
    object-fit: cover;
`;

const TestimonialIcon = styled.div`
    display: flex;
    gap: 0.4rem;
    justify-content: center;
    margin-bottom: 1.2rem;
    color: #087f5b;
    font-size: 1.8rem;
`;

const CustomerMessage = styled.p`
    font-size: 1.4rem;
    color: #333;
    line-height: 1.6;
    margin-bottom: 1.6rem;
`;

const CustomerName = styled.p`
    font-size: 1.6rem;
    font-weight: 600;
    color: #087f5b;
`;

export default function Testimonial() {
    return (
        <TestimonialSection>
            <TestimonialTitle>
                <h3>Hear What Our Users Are Saying</h3>
            </TestimonialTitle>

            <TestimonialContainer>
                <TestimonialBox>
                    <CustomerProfile
                        src="/profile/profile-1.jpg"
                        alt="Sofia Johnson"
                    />
                    <TestimonialIcon>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </TestimonialIcon>
                    <CustomerMessage>
                        "Remote Work Hub has transformed the way I connect with
                        global companies. I was able to find projects that
                        perfectly matched my skills, and the platform’s
                        communication tools made collaborating across time zones
                        seamless and efficient."
                    </CustomerMessage>
                    <CustomerName>Sofia Johnson : Project Manager</CustomerName>
                </TestimonialBox>

                <TestimonialBox>
                    <CustomerProfile
                        src="/profile/profile-4.jpg"
                        alt="Mohammad Rahimi"
                    />
                    <TestimonialIcon>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </TestimonialIcon>
                    <CustomerMessage>
                        "Thanks to Remote Work Hub, I was able to land my first
                        international data science project within weeks. The
                        platform made it easy to showcase my skills and
                        collaborate with clients remotely, which boosted my
                        career significantly."
                    </CustomerMessage>
                    <CustomerName>
                        Mohammad Rahimi : Data Scientist
                    </CustomerName>
                </TestimonialBox>

                <TestimonialBox>
                    <CustomerProfile
                        src="/profile/profile-6.jpg"
                        alt="John Smith"
                    />
                    <TestimonialIcon>
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                    </TestimonialIcon>
                    <CustomerMessage>
                        "Remote Work Hub transformed how I find online teaching
                        opportunities. I can now connect with students worldwide
                        effortlessly, manage my schedule, and focus on
                        delivering quality lessons without worrying about
                        logistics."
                    </CustomerMessage>
                    <CustomerName>John Smith : Online Teacher</CustomerName>
                </TestimonialBox>
            </TestimonialContainer>
        </TestimonialSection>
    );
}
