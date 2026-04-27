import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleExploreCourses = () => {
        navigate("/courses");
    };

    return (
        <div className="home-page">
            <Navbar />
            <main className="hero-section">
                <div className="hero-content">
                    <h1>
                        Build <span>EXPERTISE</span>,<br />
                        Not Just a Portfolio
                    </h1>
                    <p>
                        Bridge the gap between learning and production. Master the technologies
                        top-tier companies actually use. Build production-level projects, learn
                        from veterans, and create applications that solve real problems.
                    </p>
                    <button className="explore-btn" onClick={handleExploreCourses}>
                        Explore Courses
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Home;