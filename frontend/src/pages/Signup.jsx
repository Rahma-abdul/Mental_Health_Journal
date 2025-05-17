import { useState } from "react";  
import '../styles/Login.css'; 

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Perform signup logic here
        // Backend API call 
        console.log("Signing up....");
        navigate("/history");

    };

    return (
        <div className="title">
            <h1>Mental Health Journal</h1>
            <div className="login-container">
                <h2>Sign Up To Your Journal</h2>
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

                    <button type="submit">Signup</button>
                </form>


                <p className='signup-link'>Already have an account? <a href="/login">Login</a></p>
            </div>
        </div>
    );

}

export default Signup;
