// Featured.jsx
import styled, { keyframes } from "styled-components";

// Section container
const FeaturedSection = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    padding: 5.4rem 0 1.4rem 0;
    text-align: center;
`;

// Section title
const FeaturedTitle = styled.p`
    font-size: var(--font-xl);
    font-weight: 900;
    line-height: 0.5;
    margin-bottom: 6rem;
    color: #1f2937;
`;

// Logos container with scrolling animation
const scroll = keyframes`
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
`;

const FeaturedBox = styled.div`
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Logos = styled.div`
    display: flex;
    gap: 4rem;
    align-items: center;
    animation: ${scroll} 20s linear infinite;

    img {
        height: 3.6rem;
        object-fit: contain;
    }
`;

export default function Featured() {
    return (
        <FeaturedSection>
            <FeaturedTitle>In the spotlight of global brands</FeaturedTitle>
            <FeaturedBox>
                <Logos>
                    <img src="/logos/techcrunch.png" alt="Techcrunch logo" />
                    <img
                        src="/logos/business-insider.png"
                        alt="Business Insider logo"
                    />
                    <img
                        src="/logos/the-new-york-times.png"
                        alt="The New York Times logo"
                    />
                    <img src="/logos/forbes.png" alt="Forbes logo" />
                    <img src="/logos/usa-today.png" alt="USA Today logo" />
                    {/* Repeat logos for smooth scrolling */}
                    <img src="/logos/techcrunch.png" alt="Techcrunch logo" />
                    <img
                        src="/logos/business-insider.png"
                        alt="Business Insider logo"
                    />
                    <img
                        src="/logos/the-new-york-times.png"
                        alt="The New York Times logo"
                    />
                    <img src="/logos/forbes.png" alt="Forbes logo" />
                    <img src="/logos/usa-today.png" alt="USA Today logo" />
                </Logos>
            </FeaturedBox>
        </FeaturedSection>
    );
}
