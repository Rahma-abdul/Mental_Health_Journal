// import { useState } from "react";  
// import '../styles/Login.css'; 
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// function Login() {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);

//         const formData = new URLSearchParams();
//         formData.append("username", username);  
//         formData.append("password", password);

//         try {
//             const response = await axios.post(
//                 "http://localhost:8000/token", 
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "application/x-www-form-urlencoded"
//                     }
//                 }
//             );
//             localStorage.setItem("token", response.data.access_token);
//             navigate("/history");

//         } catch (error) {
//             setError("Login failed: " + (error.response?.data?.detail || "Unknown error"));
//         }
//     };
//     return (
//         <div className="title">
//             <h1>Mental Health Journal</h1>
//             <div className="login-container">
//                 {/* <h2>Login To Your Journal</h2> */}
//                 {/* {error && <p className="error">{error}</p>} */}
//                 <form onSubmit={handleSubmit} className="login-form">
//                     <div className="form-group">
//                         <label>Username</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button type="submit">Login</button>
//                 </form>


//                 <p className='signup-link'>Don't have an account? <a href="/signup">Sign up</a></p>
//             </div>
//         </div>
//     );

// }



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

            // **IMPORTANT FRONTEND MODIFICATION START**
            let userId = null;
            try {
                const decodedToken = jwtDecode(token);
                // Assuming 'user_id' is a claim in your JWT payload
                // Or sometimes it's 'sub' (subject), and you can parse it if it's the ID
                userId = decodedToken.user_id || decodedToken.sub; // Try user_id first, then sub

                // If 'sub' is a username and you need the ID, you might need another backend call
                // If your 'sub' is the actual ID, then this is sufficient.
                // You MUST confirm what your backend puts in the JWT claims.
            } catch (decodeError) {
                console.error("Error decoding JWT:", decodeError);
                setError("Login successful, but could not decode user ID from token.");
                return; // Stop here if user ID is critical
            }

            if (userId) {
                localStorage.setItem("user_id", userId);
                console.log(userId)
                navigate("/history");
            } else {
                // This case handles if the token decoded, but didn't have user_id or sub claim as expected
                console.warn("User ID claim not found in decoded token.");
                setError("Login successful, but user ID not found in token. Please contact support.");
                // navigate("/some-other-page-or-stay-on-login"); // Or handle as appropriate
            }
            // **IMPORTANT FRONTEND MODIFICATION END**

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