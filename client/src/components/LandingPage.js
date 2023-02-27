import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h1 className="app-name">Want to create more content?</h1>
      <p className="app-description">Harness the power of AI to create great content faster than ever!</p>
      <div className="call-to-action-container">
        <Link to="/prompt" className="button primary-btn orange-btn">Crush your Content Goals</Link>
      </div>
    </div>
  )
}

export default LandingPage;
