import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });

            console.log(res.data);

            alert("Login Successful ✅");

            // store token (important)
            localStorage.setItem("token", res.data.token);

            // ✅ redirect to courses page
            navigate("/courses");

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Login Failed ❌");
        }
    };

    return (
        <div>
            <Navbar />

            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;