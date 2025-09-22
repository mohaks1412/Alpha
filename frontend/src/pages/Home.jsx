import React, { useEffect } from 'react';

const Homepage = () => {
    useEffect(() => {
        const cards = document.querySelectorAll('.tech-card');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(card => {
            observer.observe(card);
        });
    }, []);

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                
                :root {
                    --primary-color: #007bff;
                    --secondary-color: #555;
                    --background-color: #f0f4f8;
                    --card-bg-color: #ffffff;
                    --text-color: #333;
                    --title-color: #004085;
                }

                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    font-family: 'Inter', sans-serif;
                    background-color: var(--background-color);
                    color: var(--text-color);
                    line-height: 1.6;
                    -webkit-font-smoothing: antialiased;
                    overflow-x: hidden;
                }
                
                /* Animations */
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                
                .tech-card {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                
                .tech-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                }

                /* Layout & Structure */
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }
                
                /* Hero Section */
                .hero {
                    text-align: center;
                    padding: 8rem 0 4rem;
                    background: linear-gradient(180deg, var(--background-color), #e9eff4);
                }
                
                .hero-title {
                    font-size: 3rem;
                    font-weight: 700;
                    color: var(--title-color);
                    margin-bottom: 1rem;
                    animation: fadeIn 1s ease-in-out;
                }
                
                .hero-subtitle {
                    font-size: 1.25rem;
                    color: var(--secondary-color);
                    max-width: 600px;
                    margin: 0 auto;
                    animation: fadeIn 1.2s ease-in-out 0.2s;
                    animation-fill-mode: forwards;
                }
                
                /* Tech Stack Section */
                .tech-section {
                    padding: 4rem 0;
                    background-color: var(--card-bg-color);
                }
                
                .section-title {
                    text-align: center;
                    font-size: 2rem;
                    color: var(--title-color);
                    margin-bottom: 3rem;
                }
                
                .tech-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                }
                
                .tech-card {
                    background: var(--card-bg-color);
                    border: 1px solid #e0e6ef;
                    border-radius: 12px;
                    padding: 2.5rem;
                    text-align: center;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .tech-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }
                
                .tech-icon {
                    width: 60px;
                    height: 60px;
                    margin-bottom: 1rem;
                }
                
                .tech-card h3 {
                    font-size: 1.5rem;
                    color: var(--text-color);
                    margin-bottom: 0.5rem;
                }
                
                .tech-card p {
                    font-size: 1rem;
                    color: var(--secondary-color);
                }
                
                /* SVG Icon Colors */
                .mongodb-logo circle, .mongodb-logo path { stroke: #47a248; }
                .express-logo path { stroke: #333333; }
                .react-logo path { stroke: #61dafb; }
                .node-logo path { stroke: #8cc84b; }
                .socketio-logo circle, .socketio-logo path { stroke: #000000; }
                .supabase-logo circle, .supabase-logo path { stroke: #28d179; }
                
                /* Footer */
                .footer {
                    text-align: center;
                    padding: 2rem 0;
                    background-color: var(--background-color);
                    border-top: 1px solid #e0e6ef;
                    color: var(--secondary-color);
                    font-size: 0.9rem;
                }
                
                /* Responsive adjustments */
                @media (max-width: 768px) {
                    .hero-title { font-size: 2.5rem; }
                    .hero-subtitle { font-size: 1.1rem; }
                    .section-title { font-size: 1.75rem; }
                    .tech-card { padding: 2rem; }
                }

                `}
            </style>
            <div>
                {/* Hero Section */}
                <header className="hero">
                    <h1 className="hero-title">Connecting the World, One Message at a Time</h1>
                    <p className="hero-subtitle">
                        Leveraging the power of MERN + Supabase to create a real-time, scalable chat application.
                    </p>
                </header>

                {/* Tech Stack Section */}
                <section className="tech-section">
                    <div className="container">
                        <h2 className="section-title">Our Core Technologies</h2>
                        <div className="tech-grid">
                            {/* MongoDB Card */}
                            <div className="tech-card">
                                <svg className="tech-icon mongodb-logo" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#47a248" strokeWidth="2"/>
                                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#47a248" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <h3>MongoDB</h3>
                                <p>Our database solution for storing user profiles, chat history, and media attachments.</p>
                            </div>

                            {/* Express.js Card */}
                            <div className="tech-card">
                                <svg className="tech-icon express-logo" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2L5 6V18L12 22L19 18V6L12 2Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 2V22" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5 6L12 10L19 6" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <h3>Express.js</h3>
                                <p>A robust back-end framework for building the API that handles user authentication and chat message routing.</p>
                            </div>

                            {/* React Card */}
                            <div className="tech-card">
                                <svg className="tech-icon react-logo" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 10L12 14" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14 12L10 12" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 12H2M8.5 20L15.5 4M15.5 20L8.5 4" stroke="#61dafb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <h3>React</h3>
                                <p>The core of our front-end, building a real-time, responsive, and intuitive chat user interface.</p>
                            </div>

                            {/* Node.js Card */}
                            <div className="tech-card">
                                <svg className="tech-icon node-logo" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" stroke="#8cc84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M12 8L12 16" stroke="#8cc84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 12L16 12" stroke="#8cc84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 8L16 16M16 8L8 16" stroke="#8cc84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <h3>Node.js</h3>
                                <p>The high-performance runtime that enables real-time messaging and handles thousands of concurrent connections.</p>
                            </div>

                            {/* Socket.IO Card */}
                            <div className="tech-card">
                                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#000000" strokeWidth="2" />
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 4.5L12 19.5M4.5 12L19.5 12M8.5 20L15.5 4M15.5 20L8.5 4" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <h3>Socket.IO</h3>
                                <p>Enables real-time, bidirectional, and event-based communication between the client and server for instant messaging.</p>
                            </div>


                            {/* Supabase Card */}
                            <div className="tech-card">
                                <svg className="tech-icon supabase-logo" width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="10" stroke="#28d179" strokeWidth="2"/>
                                    <path d="M12 2L12 22M12 7L6 13M12 7L18 13M12 17L6 11M12 17L18 11" stroke="#28d179" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <h3>Supabase</h3>
                                <p>Our solution to keep the primary database light weighted by providing a storage for files and media.</p>
                            </div>

                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="footer">
                    <p>Built with passion and the latest web technologies for seamless communication.</p>
                </footer>
            </div>
        </>
    );
};

export default Homepage;