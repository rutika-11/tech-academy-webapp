import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import "./Profile.css";

const ENROLLMENTS_KEY = "techAcademyEnrollments";

const Profile = () => {
    const navigate = useNavigate();
    const [user] = useState(() => {
        const token = localStorage.getItem("token");
        return token ? jwtDecode(token) : null;
    });
    const [enrollments, setEnrollments] = useState(() =>
        JSON.parse(localStorage.getItem(ENROLLMENTS_KEY) || "[]"),
    );

    const handleRemoveEnrollment = (courseTitle) => {
        const updatedEnrollments = enrollments.filter(
            (enrollment) => enrollment.title !== courseTitle,
        );
        setEnrollments(updatedEnrollments);
        localStorage.setItem(ENROLLMENTS_KEY, JSON.stringify(updatedEnrollments));
    };

    const displayName = user?.name || "Learner";
    const displayEmail = user?.email || "No email available";
    const displayId = user?.id || "N/A";
    const initials = displayName.slice(0, 1).toUpperCase();

    return (
        <div className="profile-page">
            <Navbar />

            <div className="profile-container">
                <section className="profile-hero">
                    <h1>
                        Welcome back, <span>{displayName}</span>!
                    </h1>
                    <p>Manage your profile, track your learning and achievements in one place.</p>
                </section>

                <section className="profile-grid">
                    <div className="profile-user-card">
                        <div className="profile-avatar">{initials}</div>
                        <h2>{displayName}</h2>
                        <p className="profile-badge">Learner</p>
                        <p className="member-since">Member since May 2024</p>
                    </div>

                    <div className="profile-info-card">
                        <div className="card-header">
                            <h3>Profile Information</h3>
                            <button type="button">Edit Profile</button>
                        </div>
                        <div className="profile-row">
                            <span>User ID</span>
                            <strong>{displayId}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Name</span>
                            <strong>{displayName}</strong>
                        </div>
                        <div className="profile-row">
                            <span>Email</span>
                            <strong>{displayEmail}</strong>
                        </div>
                    </div>

                    <div className="stats-card">
                        <h3>Your Stats</h3>
                        <div className="stats-grid">
                            <div className="stat-box">
                                <p className="stat-number">{enrollments.length}</p>
                                <p>Courses Enrolled</p>
                            </div>
                            <div className="stat-box">
                                <p className="stat-number">0</p>
                                <p>Certificates</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="enrollment-section">
                    <h3>My Enrollments</h3>
                    <p className="enrollment-subtitle">Courses you are currently enrolled in</p>
                    {enrollments.length === 0 ? (
                        <p className="empty-text">You have not enrolled in any courses yet.</p>
                    ) : (
                        <ul className="enrollment-list">
                            {enrollments.map((enrollment) => (
                                <li key={enrollment.title} className="enrollment-item">
                                    <div className="enrollment-thumb">
                                        {enrollment.provider.slice(0, 1).toUpperCase()}
                                    </div>
                                    <div className="enrollment-content">
                                        <p className="enrollment-title">{enrollment.title}</p>
                                        <p className="enrollment-meta">
                                            {enrollment.provider} | {enrollment.type}
                                        </p>
                                        <p className="enrollment-meta">
                                            Timeline: {enrollment.timeline}
                                        </p>
                                        <div className="progress-row">
                                            <span>Progress</span>
                                            <div className="progress-track">
                                                <div className="progress-fill" />
                                            </div>
                                            <span>25%</span>
                                        </div>
                                    </div>
                                    <div className="enrollment-actions">
                                        <button
                                            type="button"
                                            className="view-btn"
                                            onClick={() => navigate("/courses")}
                                        >
                                            View Course
                                        </button>
                                        <button
                                            type="button"
                                            className="remove-btn"
                                            onClick={() => handleRemoveEnrollment(enrollment.title)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <p className="profile-footer">© 2024 Tech Academy. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Profile;