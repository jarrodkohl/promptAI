import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <h1 className="app-name">Want to become a better writer?</h1>
      <p className="app-description">Get inspired for your next great story with our Creative Writing Tool!</p>
      <div className="call-to-action-container">
        <Link to="/prompt" className="button primary-btn orange-btn">Go Forth and Generate</Link>
      </div>
    </div>
  )
}

export default LandingPage;
