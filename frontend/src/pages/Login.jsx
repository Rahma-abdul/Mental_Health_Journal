import { useState } from "react";
import '../styles/Login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await axios.post(
                "http://localhost:8000/token",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            const token = response.data.access_token;
            localStorage.setItem("token", token);
            let userId = null;
            try {
                const decodedToken = jwtDecode(token);
                userId = decodedToken.user_id || decodedToken.sub;
            } catch (decodeError) {
                console.error("Error decoding JWT:", decodeError);
                setError("Login successful, but could not decode user ID from token.");
                return; 
            }

            if (userId) {
                localStorage.setItem("user_id", userId);
                navigate("/Daily");
            } else {
                console.warn("User ID claim not found in decoded token.");
                setError("Login successful, but user ID not found in token. Please contact support.");
            }

        } catch (error) {
            if (error.response) {
                console.error("Login error response:", error.response.data);
                console.error("Login error status:", error.response.status);
                setError("Login failed: " + (error.response.data.detail || "Invalid credentials"));
            } else if (error.request) {
                console.error("Login error request:", error.request);
                setError("Login failed: No response from server. Please try again later.");
            } else {
                console.error("Login error message:", error.message);
                setError("Login failed: An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="title">
            <h1>Mental Health Journal</h1>
            <div className="login-container">
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Login</button>
                </form>


                <p className='signup-link'>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    );
}

export default Login;