import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import GetPrompt from "./GetPrompt";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js"
import PromptIndex from "./PromptIndex";
import PromptShowPage from "./PromptShowPage";
import LandingPage from "./LandingPage";
import EntryShowPage from "./EntryShowPage";


const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch(err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/" component={LandingPage} user={currentUser} />
        <AuthenticatedRoute exact path="/prompt" component={GetPrompt} user={currentUser}/>
        <AuthenticatedRoute exact path="/prompts" component={PromptIndex} user={currentUser}/>
        <AuthenticatedRoute exact path="/prompts/:id" component={PromptShowPage} user={currentUser}/>
        <AuthenticatedRoute exact path="/prompts/:promptId/entries/:entryId" component={EntryShowPage} user={currentUser} />
        <Route exact path="/users/new" component={(props) => <RegistrationForm {...props} clientId={process.env.REACT_APP_CLIENT_ID} />} />

        <Route exact path="/register" render={(props) => <RegistrationForm {...props} clientId={process.env.REACT_APP_CLIENT_ID} />} />

        <Route exact path="/user-sessions/new" component={SignInForm} />
      </Switch>
    </Router>
  )
};

export default hot(App);
