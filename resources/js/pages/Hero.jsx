import styled from "styled-components";

/* ==============================
   STYLED COMPONENTS
============================== */

const SectionHero = styled.section`
    padding: 7.2rem 0 4.4rem 0;
    background-color: #e6f2ef;
    height: 100vh;
`;

const Hero = styled.div`
    max-width: 120rem;
    align-items: center;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 36rem 1fr;
    gap: 16.4rem;
`;

const HeroTextBox = styled.div`
    margin-top: 1.2rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const HeadingPrimary = styled.h1`
    font-size: var(--font-2xl);
    font-weight: 700;
    line-height: 1.01;
    letter-spacing: 1px;
    color: var(--color-grey-800);
`;

const HeroDescription = styled.p`
    margin-top: 8px;
    font-size: var(--font-base);
    color: var(--color-grey-700);
    line-height: 1.4;
    font-weight: 500;
`;

const CTAButton = styled.a`
    display: inline-block;
    font-size: var(--font-sm);
    background-color: #114a38;
    color: #fff;
    border-radius: var(--radius-xxl);
    padding: 1.2rem 5.6rem;
    margin-top: 2rem;
    transition: all 0.5s;
    font-weight: 600;
    text-decoration: none;

    &:hover,
    &:active {
        background-color: #087f5b;
    }
`;

const Profiles = styled.div`
    margin-top: 15%;

    img {
        width: 5.6rem;
        height: 5.6rem;
        border-radius: 50%;
        border: 3px solid #e6f2ef;
    }

    img + img {
        margin-left: -1.6rem;
    }
`;

const Statistic = styled.p`
    margin-top: var(--space-8);
    font-size: var(--font-sm);
    font-weight: 700;
    line-height: 1.4;
    color: var(--color-grey-700);

    strong {
        color: #087f5b;
        font-size: var(--font-base);
    }
`;

const HeroImageBox = styled.div``;

const HeroImage = styled.img`
    width: 100%;
    border-radius: 5px;
`;

const FeaturedSection = styled.div``;

const FeaturedTitle = styled.p`
    font-size: var(--font-base);
    font-weight: 600;
    margin-bottom: 2rem;
    color: var(--color-grey-700);
`;

const FeaturedBox = styled.div``;

const Logos = styled.div`
    display: flex;
    gap: 4.8rem;
    align-items: center;

    img {
        height: auto;
    }
`;

/* ==============================
   COMPONENT
============================== */

export default function HeroSection() {
    return (
        <main>
            <SectionHero>
                <Hero>
                    <HeroTextBox>
                        <HeadingPrimary>
                            Empowering Your Remote Career Journey
                        </HeadingPrimary>

                        <HeroDescription>
                            Find remote jobs that fit your skills and lifestyle.
                            Connect with global companies, grow your career, and
                            unlock new opportunities from anywhere.
                        </HeroDescription>

                        <CTAButton href="#">Get started – it’s free</CTAButton>

                        <Profiles>
                            <img src="/profile/profile-1.jpg" alt="profile 1" />
                            <img src="/profile/profile-2.jpg" alt="profile 2" />
                            <img src="/profile/profile-3.jpg" alt="profile 3" />
                            <img src="/profile/profile-4.jpg" alt="profile 4" />
                            <img src="/profile/profile-5.jpg" alt="profile 5" />
                            <img src="/profile/profile-6.jpg" alt="profile 6" />
                        </Profiles>

                        <Statistic>
                            More than <strong>7,500</strong> professionals have
                            joined Remote Work Hub, collaborating, sharing
                            knowledge, and building projects together
                        </Statistic>
                    </HeroTextBox>

                    <HeroImageBox>
                        <HeroImage
                            src="hero1.jpg"
                            alt="Remote work illustration"
                        />
                    </HeroImageBox>
                </Hero>
            </SectionHero>
            {/* 
      <FeaturedSection>
        <FeaturedTitle>In the spotlight of global brands</FeaturedTitle>
        <FeaturedBox>
          <Logos>
            <img src="/logos/techcrunch.png" alt="Techcrunch logo" />
            <img src="/logos/business-insider.png" alt="Business Insider logo" />
            <img src="/logos/the-new-york-times.png" alt="The New York Times logo" />
            <img src="/logos/forbes.png" alt="Forbes logo" />
            <img src="/logos/usa-today.png" alt="USA Today logo" />
          </Logos>
        </FeaturedBox>
      </FeaturedSection> */}
        </main>
    );
}
