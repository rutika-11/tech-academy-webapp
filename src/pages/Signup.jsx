import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/api/auth/register`, {
                name,
                email,
                password,
            });

            alert("Signup Successful ✅");

            console.log(res.data);

            setName("");
            setEmail("");
            setPassword("");
            navigate("/login");

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Signup Failed ❌");
        }
    };

    return (
        <div>
            <Navbar />

            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Signup</h2>

                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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

                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;