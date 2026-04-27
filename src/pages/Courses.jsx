import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import CourseCard from "../components/CourseCard";
import "./Courses.css";

const ENROLLMENTS_KEY = "techAcademyEnrollments";

const techCourses = [
    {
        provider: "Google",
        title: "Google Project Management",
        type: "Professional Certificate",
        chips: ["AI Skills", "Build toward a degree"],
    },
    {
        provider: "Google",
        title: "Google Digital Marketing & E-commerce",
        type: "Professional Certificate",
        chips: ["AI Skills", "Build toward a degree"],
    },
    {
        provider: "IBM",
        title: "Key Technologies for Business",
        type: "Specialization",
        chips: ["Credit offered"],
    },
    {
        provider: "IBM",
        title: "Generative AI for Digital Marketing",
        type: "Specialization",
        chips: ["Credit offered"],
    },
    {
        provider: "Meta",
        title: "Frontend Development with React",
        type: "Professional Certificate",
        chips: ["Hands-on Projects", "Beginner Friendly"],
    },
    {
        provider: "Microsoft",
        title: "Azure Fundamentals for Developers",
        type: "Certification Path",
        chips: ["Cloud", "Credit offered"],
    },
    {
        provider: "AWS",
        title: "AWS Cloud Practitioner Essentials",
        type: "Certification Prep",
        chips: ["Cloud", "Build toward a degree"],
    },
    {
        provider: "DeepLearning.AI",
        title: "Prompt Engineering for Developers",
        type: "Short Course",
        chips: ["AI Skills", "Trending"],
    },
    {
        provider: "NVIDIA",
        title: "Applied Generative AI",
        type: "Specialization",
        chips: ["AI Skills", "Intermediate"],
    },
    {
        provider: "Google",
        title: "Android App Development with Kotlin",
        type: "Professional Certificate",
        chips: ["Mobile Development", "Beginner Friendly"],
    },
    {
        provider: "Oracle",
        title: "Java Programming Mastery",
        type: "Specialization",
        chips: ["Backend Development", "Build toward a degree"],
    },
    {
        provider: "MongoDB",
        title: "MongoDB for Modern Applications",
        type: "Professional Certificate",
        chips: ["Database", "Practical Labs"],
    },
    {
        provider: "Linux Foundation",
        title: "DevOps and CI/CD Foundations",
        type: "Specialization",
        chips: ["DevOps", "Career Ready"],
    },
    {
        provider: "Cisco",
        title: "Network Security Essentials",
        type: "Certification Prep",
        chips: ["Cybersecurity", "Credit offered"],
    },
    {
        provider: "JetBrains",
        title: "TypeScript and Node.js in Production",
        type: "Specialization",
        chips: ["Backend Development", "Intermediate"],
    },
    {
        provider: "Databricks",
        title: "Data Engineering with Apache Spark",
        type: "Professional Certificate",
        chips: ["Data Engineering", "Advanced"],
    },
    {
        provider: "Red Hat",
        title: "Kubernetes and Container Orchestration",
        type: "Specialization",
        chips: ["DevOps", "Cloud Native"],
    },
    {
        provider: "Postman",
        title: "API Testing and Automation",
        type: "Short Course",
        chips: ["API Development", "Practical Labs"],
    },
];

const Courses = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedTimeline, setSelectedTimeline] = useState("3 months");
    const [enrollmentConfirmed, setEnrollmentConfirmed] = useState(false);
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    const filteredCourses = useMemo(() => {
        const normalizedTerm = searchTerm.trim().toLowerCase();
        if (!normalizedTerm) {
            return techCourses;
        }

        return techCourses.filter(
            (course) =>
                course.title.toLowerCase().includes(normalizedTerm) ||
                course.provider.toLowerCase().includes(normalizedTerm),
        );
    }, [searchTerm]);

    const saveEnrollment = () => {
        if (!selectedCourse) {
            return;
        }

        const existingEnrollments = JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || "[]");
        const updatedEnrollment = {
            title: selectedCourse.title,
            provider: selectedCourse.provider,
            type: selectedCourse.type,
            timeline: selectedTimeline,
            enrolledAt: new Date().toISOString(),
        };

        const filteredExisting = existingEnrollments.filter(
            (enrollment) => enrollment.title !== selectedCourse.title,
        );

        localStorage.setItem(
            ENROLLMENTS_KEY,
            JSON.stringify([updatedEnrollment, ...filteredExisting]),
        );
    };

    return (
        <div className="courses-page">
            <header className="courses-header">
                <Link to="/" className="courses-brand">
                    TECH ACADEMY
                </Link>
                <div className="search-wrapper">
                    <input
                        type="text"
                        className="course-search"
                        placeholder="Search Tech and Coding Courses..."
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                    <button type="button" className="search-btn" aria-label="search">
                        🔍
                    </button>
                </div>

                {!isLoggedIn && (
                    <Link to="/login" className="header-login">
                        Log In
                    </Link>
                )}
            </header>

            <div className="courses">
                {filteredCourses.length === 0 ? (
                    <p className="empty-courses">No courses matched your search.</p>
                ) : (
                    filteredCourses.map((course) => (
                        <CourseCard
                            key={course.title}
                            provider={course.provider}
                            title={course.title}
                            type={course.type}
                            chips={course.chips}
                            onEnroll={() => {
                                setSelectedCourse(course);
                                setSelectedTimeline("3 months");
                                setEnrollmentConfirmed(false);
                            }}
                        />
                    ))
                )}
            </div>

            {selectedCourse && (
                <div className="enroll-modal-overlay" role="dialog" aria-modal="true">
                    <div className="enroll-modal">
                        <div className="enroll-modal-header">
                            <div>
                                <h2>Enroll in this 7-course Professional Certificate</h2>
                                <p>
                                    {selectedCourse.title} is a 7-course Professional Certificate.
                                </p>
                            </div>
                            <button
                                type="button"
                                className="close-modal-btn"
                                aria-label="Close enroll popup"
                                onClick={() => {
                                    setSelectedCourse(null);
                                    setEnrollmentConfirmed(false);
                                }}
                            >
                                ×
                            </button>
                        </div>

                        <div className="enroll-modal-body">
                            {enrollmentConfirmed ? (
                                <div className="confirmation-box">
                                    <h3>Enrollment Confirmed</h3>
                                    <p>
                                        You are enrolled in <strong>{selectedCourse.title}</strong> with a{" "}
                                        <strong>{selectedTimeline}</strong> plan.
                                    </p>
                                    <button
                                        type="button"
                                        className="continue-btn"
                                        onClick={() => {
                                            setSelectedCourse(null);
                                            setEnrollmentConfirmed(false);
                                        }}
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <p className="features-title">This Professional Certificate includes:</p>
                                    <div className="feature-grid">
                                        <p>✓ Unlimited access to all 7 courses</p>
                                        <p>✓ EMI payment options</p>
                                        <p>✓ Certificate upon completion</p>
                                        <p>✓ 7 day refund period</p>
                                    </div>

                                    <h3>How much time do you need to finish?</h3>
                                    <div className="timeline-options">
                                        {["1 month", "3 months", "6 months"].map((option) => (
                                            <button
                                                key={option}
                                                type="button"
                                                className={`timeline-btn ${selectedTimeline === option ? "active" : ""}`}
                                                onClick={() => setSelectedTimeline(option)}
                                            >
                                                <span className="radio-dot" />
                                                {option}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        className="continue-btn"
                                        onClick={() => {
                                            saveEnrollment();
                                            setEnrollmentConfirmed(true);
                                        }}
                                    >
                                        Continue
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Courses;