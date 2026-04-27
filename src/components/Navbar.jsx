import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const token = localStorage.getItem("token");

    return (
        <nav className="navbar">
            <Link to="/" className="brand">
                TECH ACADEMY
            </Link>

            <div className="nav-center-links">
                <Link to="/" className="nav-link-item">
                    Home
                </Link>
                <span className="divider">|</span>

                <Link to="/courses" className="nav-link-item">
                    Courses
                </Link>
                <span className="divider">|</span>

                <Link to="/profile" className="nav-link-item">
                    Profile
                </Link>
                <span className="divider">|</span>

                <Link to="/about" className="nav-link-item">
                    About
                </Link>
                <span className="divider">|</span>

                <Link to="/contact" className="nav-link-item">
                    Contact Us
                </Link>
            </div>

            <div className="nav-right-actions">
                {!token ? (
                    <>
                        <Link to="/login" className="btn-login">
                            Login
                        </Link>
                        <Link to="/signup" className="btn-signup">
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="btn-signup">
                        Logout
                    </button>
                )}
                {token && (
                    <Link to="/profile" className="btn-login">
                        My Profile
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;