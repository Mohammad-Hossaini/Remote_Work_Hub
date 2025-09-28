import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router-dom";
import "./Welcome.css";
function Welcome() {
    return (
        <div className="allContainer">
            <div className="welcome-container">
                <div className="text-box">
                    <div className="welcome-message">
                        <h1>Welcome to your professnal Community</h1>
                    </div>
                    <div className="loginButtons">
                        <Link to="/app">
                            <button className="Btn">
                                <FcGoogle className="btn-icon" />
                                Continue with Google
                            </button>
                        </Link>
                        <button className="Btn">
                            <div className="microsoft-image">
                                <img src="/microsoft.jfif" alt="Microsoft" />
                            </div>
                            Continue with Microsoft
                        </button>

                        <Link to="/createAccount">
                            <button className="Btn">Sign in with Email</button>
                        </Link>
                        <p>
                            {" "}
                            By clicking contenue to join or sign in, you agree
                            to Remote Work Hub's{" "}
                            <strong>User Agency, Privacy,</strong> and{" "}
                            <strong>Cookies.</strong>{" "}
                        </p>
                    </div>
                </div>
                <div className="image-box">
                    <img src="/illustration/welcome-image2.svg" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Welcome;
