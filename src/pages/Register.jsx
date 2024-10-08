import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import { FaEye, FaEyeSlash, FaUserPlus } from "react-icons/fa";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/homepage");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="register">
            <div className="register-content">
                <div className="register-title">
                    <div className="register-title--content">
                        <h2>Let's Be Awesome!</h2>
                        <p>Life's better when you know you get to be awesome.</p>
                        <p>Let's get started!</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        placeholder="Email"
                        aria-label="Your Email"
                        autoComplete="email"
                    />
                    <div className="password-input-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            aria-label="Your Password"
                            autoComplete="current-password"
                            className="password-input" />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="eye-icon">
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    <div className="register-btns">
                        <button type="submit" className="btn btn--dark">
                            <span>Create Account</span>
                            <FaUserPlus width={20} />
                        </button>
                        {error && <p className="error-message">{error}</p>}
                    </div>
                </form>
                <div className="page-switch">
                    <p>Going back to awesome login?</p>
                    <Link to="/">
                        <h6>Return to Login</h6>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
