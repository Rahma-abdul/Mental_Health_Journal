import { useState } from "react";  
import '../styles/Login.css'; 
import { useNavigate } from "react-router-dom";
// import axios from "axios";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        
        // Perform login logic here
        // Backend API call 
        console.log("Logging in....");
        navigate("/history");

    };
//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);

//     const formData = new URLSearchParams();
//     formData.append("username", email);     // or username if using that field
//     formData.append("password", password);

//     try {
//         const response = await axios.post(
//             "http://localhost:8000/token",
//             formData,
//             {
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded"
//                 }
//             }
//         );

//         localStorage.setItem("token", response.data.access_token);
//         navigate("/history");

//     } catch (error) {
//         setError("Login failed: " + (error.response?.data?.detail || "Unknown error"));
//     }
// };

    return (
        <div className="title">
            <h1>Mental Health Journal</h1>
            <div className="login-container">
                {/* <h2>Login To Your Journal</h2> */}
                {/* {error && <p className="error">{error}</p>} */}
                <form onSubmit={handleSubmit} className="login-form">
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

                    <button type="submit">Login</button>
                </form>


                <p className='signup-link'>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
    );

}

export default Login;
