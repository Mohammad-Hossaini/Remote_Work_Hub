import { BsChatDotsFill } from "react-icons/bs";
import { FaGlobe, FaGraduationCap, FaStar } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io5";

import { FaLinkedin } from "react-icons/fa6";
import { GoSearch } from "react-icons/go";

import { BsTwitterX } from "react-icons/bs";
import { HiOutlineLocationMarker, HiOutlineMail } from "react-icons/hi";

import { RxCross2 } from "react-icons/rx";

import { FaCheck } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import SectionFac from "./FAC/SectionFac";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="header">
        <div className="logo">
          <h2 className="WebsiteName">Remote Work Hub</h2>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <a href="" className="no-decoration main-nav-list">
                Home
              </a>
            </li>
            <li>
              <a href="" className="no-decoration main-nav-list">
                Features
              </a>
            </li>
            <li>
              <a href="" className="no-decoration main-nav-list">
                Testimonial
              </a>
            </li>
            <li>
              <a href="" className="no-decoration main-nav-list">
                Gollery
              </a>
            </li>
            <li>
              <a href="" className="no-decoration main-nav-list">
                FAQ
              </a>
            </li>
            <li>
              <a href="" className="no-decoration main-nav-list">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <div className="buttons">
          <NavLink
            to="/welcome"
            href=""
            className="nav-btn no-decoration btn-login"
          >
            Log in
          </NavLink>
          <a href="" className="nav-btn no-decoration btn-sign-up">
            Sign up &rarr;
          </a>
        </div>
      </div>
      <main>
        <section className="section-hero">
          <div className="hero">
            <div className="hero-text-box">
              <h1 className="heading-primary">
                Empowering Your Remote Career Journey
              </h1>
              <p className="hero-description">
                Find remote jobs that fit your skills and lifestyle. Connect
                with global companies, grow your career, and unlock new
                opportunities from anywhere.
              </p>

              <a href="" className="btn no-decoration">
                Get started &ndash; it’s free
              </a>
              <div className="profiles">
                <img
                  src="/profile/profile-1.jpg"
                  alt=""
                  className="profile-image"
                />
                <img
                  src="/profile/profile-2.jpg"
                  alt=""
                  className="profile-image"
                />
                <img
                  src="/profile/profile-3.jpg"
                  alt=""
                  className="profile-image"
                />
                <img
                  src="/profile/profile-4.jpg"
                  alt=""
                  className="profile-image"
                />
                <img
                  src="/profile/profile-5.jpg"
                  alt=""
                  className="profile-image"
                />
                <img
                  src="/profile/profile-6.jpg"
                  alt=""
                  className="profile-image"
                />
              </div>
              <p className="statistic">
                More than <strong>7,500</strong> professionals have joined
                Remote Work Hub, collaborating, sharing knowledge, and building
                projects together
              </p>
            </div>
            <div className="hero-image-box">
              <img src="hero1.jpg" alt="" className="hero-image" />
            </div>
          </div>
        </section>
        <div className="featured-section">
          <p className="featured-title">In the spotlight of global brands</p>
          <div className="featured-box">
            <div className="logos">
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
            </div>
          </div>
        </div>
      </main>
      <section className="section-features">
        <h3 className="feature-primary">
          Your path to remote success in 3 simple steps
        </h3>
        <div className="feature-box">
          <div className="feature-image">
            <img
              src="/features/featureImage2.avif"
              alt="Collaboration illustration"
            />
          </div>
          <div className="feature-description">
            <div className="feature-title">
              <span>
                <BsChatDotsFill />
              </span>
              <h3 className="heading-thernary">Seamless Communication</h3>
            </div>

            <p className="feature-description">
              Connect with your team instantly using built-in chat and messaging
              tools. Keep every conversation organized in one central hub and
              avoid the chaos of scattered emails or endless meetings. Share
              ideas, provide feedback, and stay aligned with your team — whether
              you’re across the office or across the world. With real-time
              updates and smart notifications, you’ll never miss an important
              detail.
            </p>

            <button className="btn-learnMore">Learn more</button>
          </div>
        </div>
        <div className="feature-box">
          <div className="feature-description">
            <div className="feature-title">
              <span>
                <FaGlobe />
              </span>
              <h3 className="heading-thernary">Global Job Access</h3>
            </div>

            <p className="feature-description">
              Explore remote job opportunities from companies all around the
              world. Access listings in multiple industries and time zones,
              filter by your skills and preferences, and apply directly to
              positions that match your career goals. Stay competitive and
              connected in the global job market.
            </p>
            <button className="btn-learnMore">Learn more</button>
          </div>
          <div className="feature-image">
            <img
              src="/features/featureImage5.avif"
              alt="Global job access illustration"
            />
          </div>
        </div>

        <div className="feature-box">
          <div className="feature-image">
            <img
              src="/features/featureImage6.avif"
              alt="Career growth and learning illustration"
            />
          </div>
          <div className="feature-description">
            <div className="feature-title">
              <span>
                <FaGraduationCap />
              </span>
              <h3 className="heading-thernary">Career Growth & Learning</h3>
            </div>

            <p className="feature-description">
              Continuously improve your skills and advance your career with
              curated resources, webinars, and professional development
              opportunities. Connect with mentors, join workshops, and receive
              guidance that helps you excel in the remote work environment.
              Build your expertise and stay ahead in a competitive global
              market.
            </p>
            <button className="btn-learnMore">Learn more</button>
          </div>
        </div>
      </section>
      <div className="testimonial">
        <div className="testimonial-title">
          <h3>Hear What Our Users Are Saying</h3>
        </div>
        <div className="testimonial-container">
          <div className="testimonial-box">
            <img
              src="/profile/profile-1.jpg"
              alt="Sofia Johnson"
              className="customer-profile"
            />
            <div className="testimonial-icon">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="customer-message">
              "Remote Work Hub has transformed the way I connect with global
              companies. I was able to find projects that perfectly matched my
              skills, and the platform’s communication tools made collaborating
              across time zones seamless and efficient."
            </p>
            <p className="customer-name">Sofia Johnson : Project Manager</p>
          </div>

          <div className="testimonial-box">
            <img
              src="/profile/profile-4.jpg"
              alt="Mohammad Rahimi"
              className="customer-profile"
            />
            <div className="testimonial-icon">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="customer-message">
              "Thanks to Remote Work Hub, I was able to land my first
              international data science project within weeks. The platform made
              it easy to showcase my skills and collaborate with clients
              remotely, which boosted my career significantly."
            </p>
            <p className="customer-name">Mohammad Rahimi : Data Scientist</p>
          </div>
          <div className="testimonial-box">
            <img
              src="/profile/profile-6.jpg"
              alt="John Smith"
              className="customer-profile"
            />
            <div className="testimonial-icon">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p className="customer-message">
              "Remote Work Hub transformed how I find online teaching
              opportunities. I can now connect with students worldwide
              effortlessly, manage my schedule, and focus on delivering quality
              lessons without worrying about logistics."
            </p>
            <p className="customer-name">John Smith : Online Teacher</p>
          </div>
        </div>
      </div>
      <div className="section-pricing">
        <div className="pricing-title">
          <span class="subheading">Pricing</span>
          <h2 class="heading-secondary">
            Eating well without breaking the bank
          </h2>
        </div>
        <div className="container">
          <div className="pricing-plan pricing-plan--starter">
            <header className="plan-header">
              <p className="plan-name">Starter</p>
              <p className="plan-price">
                <span>$</span>399
              </p>
              <p className="plan-txt">per month. That's hus $13 per job!</p>
            </header>
            <ul class="list">
              <li class="list-item">
                <FaCheck class="list-icon" name="checkmark-outline" />
                <span>1 meal per day</span>
              </li>
              <li class="list-item">
                <FaCheck class="list-icon" name="checkmark-outline" />{" "}
                <span>Order from 11am to 9pm</span>
              </li>
              <li class="list-item">
                <FaCheck class="list-icon" name="checkmark-outline" />{" "}
                <span>Delivery is free</span>
              </li>
              <li class="list-item">
                <RxCross2 class="list-icon" name="checkmark-outline" />
                <span></span>
              </li>
            </ul>
            <div className="plan-sing-up">
              <a href="#" class="pricing-btn no-decoration btn-sign-up">
                Start getting now
              </a>
            </div>
          </div>
          <div className="pricing-plan pricing-plan--complete">
            <header className="plan-header">
              <p className="plan-name">Complete</p>
              <p className="plan-price">
                <span>$</span>399
              </p>
              <p className="plan-txt">per month. That's hus $13 per job!</p>
            </header>
            <ul class="list">
              <li class="list-item">
                <FaCheck class="list-icon" name="checkmark-outline" />{" "}
                <span>1 meal per day</span>
              </li>
              <li class="list-item">
                <FaCheck class="list-icon" name="checkmark-outline" />{" "}
                <span>Order from 11am to 9pm</span>
              </li>
              <li class="list-item">
                <FaCheck class="list-icon" name="checkmark-outline" />{" "}
                <span>Delivery is free</span>
              </li>
              <li class="list-item">
                <FaCheck class="list-icon" name="checkmark-outline" />{" "}
                <span>Delivery is free</span>
              </li>
            </ul>
            <div className="plan-sing-up">
              <a href="#" class="pricing-btn no-decoration btn-sign-up">
                Upgrade Now
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="section-FAC">
        <p className="fac-title">Frequently Asked Questions</p>
        <SectionFac />
      </div>

      <div className="section-cta">
        <div className="cta-container">
          <div className="cta-left">
            <div className="cta-description">
              <h1 className="cta-title">Travel without limit</h1>
              <p className="cta-desc">
                Find the right e-visa trip, easy apply in minutes.
              </p>
            </div>
          </div>

          <div className="cta-right">
            <div className="right-left">
              <label htmlFor="email" className="cta-label">
                <HiOutlineMail className="cta-icon" /> Your Email
              </label>
              <input id="email" type="email" className="cta-input" />

              <label htmlFor="location" className="cta-label">
                <HiOutlineLocationMarker className="cta-icon" /> Your Location
              </label>
              <input id="location" type="text" className="cta-input" />
            </div>

            <div className="right-right">
              <p className="btn-text">Find us</p>
              <span>
                <GoSearch className="btn-icon" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="container grid grid--footer">
          <div class="logo-col">
            <a href="#" class="footer-logo">
              <img
                class="logo"
                alt="Remote Work Hub Logo"
                src="img/remotehub-logo.png"
              />
            </a>

            <ul class="social-links">
              <li>
                <a class="footer-link" href="#">
                  <FaLinkedin className="social-icon" name="logo-linkedin" />
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  <BsTwitterX className="social-icon" name="logo-twitter" />
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  <IoLogoGithub className="social-icon" name="logo-github" />
                </a>
              </li>
            </ul>

            <p class="copyright">
              © 2025 Remote Work Hub. All rights reserved.
            </p>
          </div>

          <div class="address-col">
            <p class="footer-heading">Contact Us</p>
            <address class="contacts">
              <p class="address">Kabul University Road, Kabul, Afghanistan</p>
              <p>
                <a class="footer-link" href="tel:+93-700-123-456">
                  +93 700 123 456
                </a>
                <br />
                <a class="footer-link" href="mailto:support@remoteworkhub.com">
                  support@remoteworkhub.com
                </a>
              </p>
            </address>
          </div>

          <nav class="nav-col">
            <p class="footer-heading">Account</p>
            <ul class="footer-nav">
              <li>
                <a class="footer-link" href="#">
                  Sign Up
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  Log In
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
          </nav>

          <nav class="nav-col">
            <p class="footer-heading">Company</p>
            <ul class="footer-nav">
              <li>
                <a class="footer-link" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  For Employers
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  Careers
                </a>
              </li>
            </ul>
          </nav>

          <nav class="nav-col">
            <p class="footer-heading">Resources</p>
            <ul class="footer-nav">
              <li>
                <a class="footer-link" href="#">
                  Help Center
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a class="footer-link" href="#">
                  Privacy & Terms
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default Home;
