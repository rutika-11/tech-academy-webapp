import Navbar from "../components/Navbar";
import { FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact-page">
            <Navbar />

            <section className="contact-content">
                <h1>Contact Us</h1>
                <p className="contact-subtitle">
                    We would love to hear from you. Send us a message or reach us through the
                    details alongside.
                </p>

                <div className="contact-card">
                    <div className="contact-block">
                        <h3>Address</h3>
                        <p>New Panvel, Navi Mumbai</p>
                    </div>

                    <div className="contact-block">
                        <h3>Email</h3>
                        <p>support@techacademy.com</p>
                    </div>

                    <div className="contact-block">
                        <h3>Open Timings</h3>
                        <p>Monday - Friday, 10:00 AM - 7:00 PM IST</p>
                    </div>

                    <div className="contact-socials">
                        <a href="#" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="#" aria-label="LinkedIn">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </section>

            <div className="contact-bottom-strip" />
        </div>
    );
};

export default Contact;
