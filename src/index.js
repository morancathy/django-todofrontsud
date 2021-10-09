import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// Import Milligram for Some Default Styling
import "milligram";
// Import the BrowserRouter Component and Rename it Router
import { BrowserRouter as Router, Route } from "react-router-dom";


ReactDOM.render(
  // Wrap our App Component inside router so App and children can use router
  // Pass the app component into Route to give it access to router props
  <Router>
    <React.StrictMode>
      <Route component={App} />
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

//reactDOM.render  ...if not called, nothing happens
//first arguement is react component,,,that we want to insert into dom
// second is the anchor of where we want to put cdoe
