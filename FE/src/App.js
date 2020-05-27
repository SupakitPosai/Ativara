import React, { useEffect, useContext } from "react";
import "./App.css";
import IndexUser from "./frontend/views/index";
import IndexAdmin from "./admin/views/index";
import { withRouter, Route, Switch, Link } from "react-router-dom";
import Confirmationpage from "./frontend/views/confirmationpage";
import Upload from "./frontend/views/upload";
import Chatbot from "./frontend/views/Chatbot";
const NotFoundPage = () => <h1>NotFoundPage</h1>;
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={IndexUser} />
        <Route path="/Admin" component={IndexAdmin} />
        <Route path="/Confirmationpage" component={Confirmationpage} />
        <Route path="/upload" component={Upload} />
        <Route path="/Chatbot" component={Chatbot} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default App;
