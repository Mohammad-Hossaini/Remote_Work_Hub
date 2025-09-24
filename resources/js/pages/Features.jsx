// Features.jsx
import { BsChatDotsFill } from "react-icons/bs";
import { FaGlobe, FaGraduationCap } from "react-icons/fa";
import styled from "styled-components";

// Section container
const FeaturesSection = styled.section`
    max-width: 120rem;
    margin: 0 auto;
    padding: 5.4rem 0 1.4rem 0;
`;

// Section primary heading
const FeaturePrimary = styled.h3`
    font-size: var(--font-xl);
    font-weight: 900;
    line-height: 0.5;
    text-align: center;
    margin-bottom: -5rem;
    color: #1f2937;
`;

// Individual feature box
const FeatureBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    gap: 4.8rem;
    padding: 6.4rem 0;
    position: relative;
    margin: 9.6rem 0;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 100%;
        background-color: #e6f2ef;
        border-radius: 5px;
        z-index: 1;
    }

    &:nth-child(even)::before {
        left: 0;
        border-radius: 5px;
    }
`;

// Feature image
const FeatureImage = styled.div`
    img {
        width: 90%;
        display: block;
        position: relative;
        z-index: 2;
        border-radius: 5px;
        margin-left: 3.2rem;
    }
`;

// Feature content
const FeatureContent = styled.div`
    font-size: var(--font-base);
    font-weight: 600;
    line-height: 1.6;
    padding: 1.2rem 0 2.4rem 0;
    position: relative;
    z-index: 2;
`;

// Feature title with icon
const FeatureTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;

    span {
        color: #087f5b;
        display: flex;
        align-items: center;
        font-size: 2.4rem;
    }

    h3 {
        margin: 0;
        font-size: var(--font-lg);
        font-weight: 700;
        line-height: 1.8;
    }
`;

// Learn more button
const BtnLearnMore = styled.button`
    display: inline-block;
    background-color: #fff;
    border: 1px solid #087f5b;
    padding: 1rem 6.4rem;
    font-size: var(--font-sm);
    border-radius: 2.4rem;
    cursor: pointer;
    font-weight: 600;
    color: var(--color-grey-800);
    transition: all 0.3s ease;

    &:hover {
        background-color: #054834;
        color: #fff;
    }
`;

export default function Features() {
    return (
        <FeaturesSection>
            <FeaturePrimary>
                Your path to remote success in 3 simple steps
            </FeaturePrimary>

            <FeatureBox>
                <FeatureImage>
                    <img
                        src="/features/featureImage2.avif"
                        alt="Collaboration illustration"
                    />
                </FeatureImage>
                <FeatureContent>
                    <FeatureTitle>
                        <span>
                            <BsChatDotsFill />
                        </span>
                        <h3>Seamless Communication</h3>
                    </FeatureTitle>
                    <p>
                        Connect with your team instantly using built-in chat and
                        messaging tools. Keep every conversation organized in
                        one central hub and avoid the chaos of scattered emails
                        or endless meetings. Share ideas, provide feedback, and
                        stay aligned with your team — whether you’re across the
                        office or across the world. With real-time updates and
                        smart notifications, you’ll never miss an important
                        detail.
                    </p>
                    <BtnLearnMore>Learn more</BtnLearnMore>
                </FeatureContent>
            </FeatureBox>

            <FeatureBox>
                <FeatureContent>
                    <FeatureTitle>
                        <span>
                            <FaGlobe />
                        </span>
                        <h3>Global Job Access</h3>
                    </FeatureTitle>
                    <p>
                        Explore remote job opportunities from companies all
                        around the world. Access listings in multiple industries
                        and time zones, filter by your skills and preferences,
                        and apply directly to positions that match your career
                        goals. Stay competitive and connected in the global job
                        market.
                    </p>
                    <BtnLearnMore>Learn more</BtnLearnMore>
                </FeatureContent>
                <FeatureImage>
                    <img
                        src="/features/featureImage5.avif"
                        alt="Global job access illustration"
                    />
                </FeatureImage>
            </FeatureBox>

            <FeatureBox>
                <FeatureImage>
                    <img
                        src="/features/featureImage6.avif"
                        alt="Career growth and learning illustration"
                    />
                </FeatureImage>
                <FeatureContent>
                    <FeatureTitle>
                        <span>
                            <FaGraduationCap />
                        </span>
                        <h3>Career Growth & Learning</h3>
                    </FeatureTitle>
                    <p>
                        Continuously improve your skills and advance your career
                        with curated resources, webinars, and professional
                        development opportunities. Connect with mentors, join
                        workshops, and receive guidance that helps you excel in
                        the remote work environment. Build your expertise and
                        stay ahead in a competitive global market.
                    </p>
                    <BtnLearnMore>Learn more</BtnLearnMore>
                </FeatureContent>
            </FeatureBox>
        </FeaturesSection>
    );
}
