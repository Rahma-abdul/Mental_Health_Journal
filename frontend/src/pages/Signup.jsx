import { useState } from "react";  
import '../styles/Login.css'; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setError(null);

    //     // Perform signup logic here
    //     // Backend API call 
    //     console.log("Signing up....");
    //     navigate("/history");

    // };

       const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:8000/users/register", {
                username,
                email,
                password
            });

            console.log("Signup successful:", response.data);
            navigate("/login");

        } catch (err) {
            const message = err.response?.data?.detail || "Signup failed.";
            setError(message);
        }
    };
    return (
        <div className="title">
            <h1>Mental Health Journal</h1>
            <div className="login-container">
                {/* <h2>Sign Up To Your Journal</h2> */}
                {/* {error && <p className="error">{error}</p>} */}
                <form onSubmit={handleSubmit} className="login-form">
                     <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit">Signup</button>
                </form>


                <p className='signup-link'>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );

}

export default Signup;
