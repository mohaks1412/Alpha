import React from 'react';

const LoadingScreen = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap');

          :root {
              --primary-color: #3498db; /* A bright, clean blue for accent */
              --background-color: #f0f4f8; /* A very soft, light background */
              --text-color: #333; /* Dark text for contrast */
          }

          .body-wrapper {
              height: 100vh;
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: var(--background-color);
              font-family: 'Poppins', sans-serif;
              overflow: hidden;
          }

          .loading-container {
              text-align: center;
          }

          .spinner {
              width: 80px;
              height: 80px;
              border: 5px solid rgba(52, 152, 219, 0.2);
              border-top: 5px solid var(--primary-color);
              border-radius: 50%;
              animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite, fade-in 1s ease-in;
              position: relative;
              margin: 0 auto 20px;
              box-shadow: 0 0 15px rgba(52, 152, 219, 0.4);
          }

          .spinner::before,
          .spinner::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              border-radius: 50%;
          }

          .spinner::before {
              width: 60px;
              height: 60px;
              border: 3px solid rgba(52, 152, 219, 0.3);
              border-top: 3px solid #63b3ed;
              animation: spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite;
          }

          .spinner::after {
              width: 40px;
              height: 40px;
              background-color: rgba(52, 152, 219, 0.1);
              animation: pulse 2s ease-in-out infinite;
          }
          
          .loading-text {
              color: var(--text-color);
              font-size: 1.2rem;
              font-weight: 300;
              letter-spacing: 2px;
              text-transform: uppercase;
          }
          
          @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
          }

          @keyframes fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
          }

          @keyframes pulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); }
              50% { transform: translate(-50%, -50%) scale(1.1); }
          }

          /* Responsive adjustments */
          @media (max-width: 600px) {
              .spinner {
                  width: 60px;
                  height: 60px;
                  border-width: 4px;
              }
              .spinner::before {
                  width: 45px;
                  height: 45px;
                  border-width: 2px;
              }
              .spinner::after {
                  width: 30px;
                  height: 30px;
              }
              .loading-text {
                  font-size: 1rem;
              }
          }
        `}
      </style>
      <div className="body-wrapper">
        <div className="loading-container">
          <div className="spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
