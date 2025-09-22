import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import authService from "../../services/authService";
import './SocialLoginButtons.css';
import { useNavigate } from "react-router-dom";

const SocialLoginButtons = () => {
  const navigate = useNavigate();
  const { loginWithPopup, getIdTokenClaims } = useAuth0();

  const handleSocialLogin = async (provider) => {
    try {
      console.log(provider);
      await loginWithPopup({
        authorizationParams: {
          connection: provider,
        },
      });

      const claims = await getIdTokenClaims();
      const idToken = claims.__raw;

      if (provider === "google-oauth2") {
        provider = "google";
      }
      authService.socialSignin(provider, idToken);

      console.log(`Logged in with ${provider}`);
      navigate("/");
    } catch (err) {
      console.error(`Error logging in with ${provider}:`, err);
    }
  };

  return (
    <ul className="social-login-list">
      {/* Google */}
      <li>
        <button
          className="social-btn google-btn"
          onClick={() => handleSocialLogin("google-oauth2")}
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
            alt="Google"
            width="18"
            height="18"
          />
          <span>Sign in with Google</span>
        </button>
      </li>

      {/* Facebook */}
      <li>
        <button
          className="social-btn facebook-btn"
          onClick={() => handleSocialLogin("facebook")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="white"
          >
            <path d="M22 12.07C22 6.48 17.52 2 12 2S2 6.48 2 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03h-2.54V12h2.54V9.79c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.97h-2.33V22c4.78-.75 8.44-4.91 8.44-9.93z" />
          </svg>
          <span>Sign in with Facebook</span>
        </button>
      </li>

      {/* LinkedIn */}
      <li>
        <button
          className="social-btn linkedin-btn"
          onClick={() => handleSocialLogin("linkedin")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 34 34"
            fill="white"
          >
            <path d="M34,2.5v29A2.5,2.5,0,0,1,31.5,34h-29A2.5,2.5,0,0,1,0,31.5v-29A2.5,2.5,0,0,1,2.5,0h29A2.5,2.5,0,0,1,34,2.5ZM10,29V13H5V29ZM7.5,11a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,7.5,11ZM29,29V20.5c0-4.5-2.4-6.5-5.6-6.5-1.9,0-2.9,1.1-3.5,1.9V13H14V29h5V21.5c0-2,1.5-3.5,3.4-3.5s2.6,1.2,2.6,3.5V29Z" />
          </svg>
          <span>Sign in with LinkedIn</span>
        </button>
      </li>
    </ul>
  );
};

export default SocialLoginButtons;
