import Navbar from "../components/Navbar";
import aboutHeroImage from "../assets/about-hero.png";
import "./About.css";

const About = () => {
    return (
        <div className="about-page">
            <Navbar />

            <section className="about-content-wrap">
                <div className="about-content">
                    <p className="about-breadcrumb">HOME &nbsp; &gt; &nbsp; ABOUT US</p>
                    <h1>About Us</h1>
                    <p>
                        TECH ACADEMY is an elite coding bootcamp and tech education platform dedicated
                        to forging the next generation of digital innovators. Our comprehensive programs
                        bridge the gap between traditional education and the rapidly evolving demands of
                        the global tech industry.
                    </p>
                    <p>
                        Founded by veteran engineers and data scientists, we provide intensive,
                        project-based curricula, world-class mentorship, and direct industry pipelines
                        in fields like Software Engineering, Data Science, Cyber Security, and AI
                        Development.
                    </p>
                    <p>
                        We are committed to launching successful and impactful careers in both
                        Technical and Strategy domains.
                    </p>
                </div>

                <div className="about-illustration">
                    <div className="illustration-shadow" />
                    <div className="illustration-card">
                        <img
                            src={aboutHeroImage}
                            alt="Tech learning illustration"
                        />
                    </div>
                </div>
            </section>

            <div className="about-bottom-strip" />
        </div>
    );
};

export default About;
