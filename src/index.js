import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom"; // Import BrowserRouter
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./AuthContext";
import { HomePage } from "./Pages/HomePage";
import { EventPage } from "./Pages/EventPage";
import { SignIn } from "./Components/SignIn";
import { EventInfo } from "./Components/EventInfo";
import { AddEvent } from "./Pages/AddEvent";
import { Cart } from "./Pages/Cart";
import { CheckOut } from "./Pages/CheckOut";
import { Profile } from "./Pages/Profile";
import { HomeAdmin } from "./Pages/Admin/HomeAdmin";
import { Users } from "./Pages/Admin/Users";
import { Events } from "./Pages/Admin/Events";
import { MethodPayment } from "./Pages/Admin/MethodPayment";
import { Order } from "./Pages/Admin/Order";
import { Receipt } from "./Pages/Admin/Receipts";
import { HomeClient } from "./Pages/Client/HomeClient";
import { PrivacyAndCondition } from "./Pages/PrivacyAndCondition";
import { Contact } from "./Pages/Contact";

ReactDOM.render(
  <Router>
    <AuthProvider>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/newEvent/event" element={<EventPage />} />
          <Route path="/newEvent/SignIn" element={<SignIn />} />
          <Route path="/newEvent/EventInfo" element={<EventInfo />} />
          <Route path="/newEvent/AddEvent" element={<AddEvent />} />
          <Route path="/newEvent/Cart" element={<Cart />} />
          <Route path="/newEvent/CheckOut" element={<CheckOut />} />
          <Route path="/newEvent/Profile" element={<Profile />} />
          <Route path="/newEvent/Privacy" element={<PrivacyAndCondition />} />
          <Route path="/newEvent/Contact" element={<Contact />} />
          {/* admin */}
          <Route path="/newEvent/admin/Home" element={<HomeAdmin />} />
          <Route path="/newEvent/admin/users" element={<Users />} />
          <Route path="/newEvent/admin/events" element={<Events />} />
          <Route
            path="/newEvent/admin/methodPayment"
            element={<MethodPayment />}
          />
          <Route path="/newEvent/admin/Order" element={<Order />} />
          <Route path="/newEvent/admin/Receipt" element={<Receipt />} />
          {/*Client*/}
          <Route path="/newEvent/client/Home" element={<HomeClient />} />
        </Routes>
      </React.StrictMode>
    </AuthProvider>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
