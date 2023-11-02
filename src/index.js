import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HomePage } from "./Pages/HomePage";
import { EventPage } from "./Pages/EventPage";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventPage />} />
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
