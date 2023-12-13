import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HomePage } from "./Pages/HomePage";
import { EventPage } from "./Pages/EventPage";
import { SignIn } from "./Components/SignIn";
import { EventInfo } from "./Components/EventInfo";
import { AddEvent } from "./Pages/AddEvent";
import { Cart } from "./Pages/Cart";
import { CheckOut } from "./Pages/CheckOut";
import { Profile } from "./Pages/Profile";

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/EventInfo" element={<EventInfo />} />
        <Route path="/AddEvent" element={<AddEvent />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
