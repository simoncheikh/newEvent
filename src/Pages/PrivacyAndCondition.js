import React from "react";
import { TopBar } from "../Components/TopBar";
import { Warning } from "../Components/Warning";
import styles from "../Styles/privacy.module.css";

export const PrivacyAndCondition = () => {
  return (
    <div>
      <div className={styles.topBarStyle}>
        <TopBar />
      </div>
      <br />
      <div className={styles.mainPage}>
        <h1>Privacy Policy</h1>
        <div className={styles.mainText}>
          <span>Introduction:</span>
          <div className={styles.bodyText}>
            Our Privacy Policy outlines the types of personal information we
            collect, how we use it, and the security measures we take to protect
            your information. By using our services, you agree to the terms of
            this Privacy Policy.
          </div>
          <span>Information We Collect:</span>
          <div className={styles.bodyText}>
            We may collect personal information, including but not limited to:
            <br />
            <span>Contact Information:</span> Name, email address, phone number.
            <br />
            <span>Log Data:</span> Information about your device, browser, and
            how you interact with our website.
          </div>
          <span>How We Use Your Information:</span>
          <div className={styles.bodyText}>
            We use the collected information for various purposes, including:
            <br />
            Providing and maintaining our services.
            <br />
            Personalizing your experience.
            <br />
            Sending promotional communications.
            <br />
            Improving our website.
          </div>
          <span>Security:</span>
          <div className={styles.bodyText}>
            We prioritize the security of your personal information and employ
            industry-standard measures to protect it.
          </div>
          <span>Third-Party Links:</span>
          <div className={styles.bodyText}>
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of these websites.
          </div>
          <span>Changes to Privacy Policy:</span>
          <div className={styles.bodyText}>
            We reserve the right to update our Privacy Policy. Any changes will
            be posted on this page.
          </div>
        </div>

        <h1>Terms and Conditions</h1>
        <div className={styles.mainText}>
          <span>Acceptance of Terms:</span>
          <div className={styles.bodyText}>
            By accessing or using our services, you agree to comply with these
            Terms and Conditions.
          </div>
          <span>User Conduct:</span>
          <div className={styles.bodyText}>
            You agree not to engage in any activity that may:
            <br />
            Violate any laws or regulations.
            <br />
            Infringe upon our intellectual property rights.
            <br />
            Interfere with the proper functioning of our services.
          </div>
          <span>Intellectual Property:</span>
          <div className={styles.bodyText}>
            All content on our website is the property of [Your Company Name] and
            is protected by intellectual property laws.
          </div>
          <span>Limitation of Liability:</span>
          <div className={styles.bodyText}>
            We are not liable for any direct, indirect, or consequential damages
            arising from your use of our services.
          </div>
          <span>Termination:</span>
          <div className={styles.bodyText}>
            We reserve the right to terminate or suspend your access to our
            services for any reason.
          </div>
          <span>Governing Law:</span>
          <div className={styles.bodyText}>
            These Terms and Conditions are governed by and construed in
            accordance with the laws .
          </div>
        </div>
      </div>
    </div>
  );
};
