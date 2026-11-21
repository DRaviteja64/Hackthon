import React, { useState } from "react";

import {
    User,
    Phone,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    GraduationCap,
    Sparkles,
    CheckCircle
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import "./Login.css";

import { loginUser } from "./AuthService";


function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        mobile: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [message, setMessage] = useState("");


    // HANDLE INPUT CHANGE

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setMessage("");
    };


    // VALIDATE FORM

    const validateForm = () => {

        if (!/^\d{10}$/.test(form.mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!form.password.trim()) {
            setError("Please enter your password.");
            return false;
        }

        return true;
    };


    // LOGIN USER

    const handleLogin = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            const loginData = {
                mobile: form.mobile,
                password: form.password
            };

            const response = await loginUser(loginData);

            setMessage(response.message || "Login successful!");

            // Navigate after successful login
            setTimeout(() => {

                const role = response.user?.role?.toUpperCase();
                if (role === "ADMIN") {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/overview");
                }

            }, 500);

        } catch (err) {

            setError(err.message || "Login failed. Please try again.");

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="login-page">

            <div className="login-container">


                {/* LEFT SECTION */}

                <div className="login-left">

                    <div className="brand-logo">

                        <div className="brand-icon">
                            <GraduationCap size={25} />
                        </div>

                        <span>
                            Skill<span className="brand-highlight">Up</span>
                        </span>

                    </div>


                    <div className="left-content">

                        <div className="welcome-badge">

                            <Sparkles size={15} />

                            <span>
                                WELCOME BACK TO SKILLUP
                            </span>

                        </div>


                        <h1>
                            Continue
                            <br />

                            Your Learning
                            <br />

                            <span>Journey.</span>
                        </h1>


                        <p>
                            Sign in to access your courses, track your
                            progress, attend classes and achieve your
                            learning goals.
                        </p>


                        <div className="feature-item">

                            <CheckCircle size={19} />

                            <span>
                                Continue your enrolled courses
                            </span>

                        </div>


                        <div className="feature-item">

                            <CheckCircle size={19} />

                            <span>
                                Track your academic performance
                            </span>

                        </div>


                        <div className="feature-item">

                            <CheckCircle size={19} />

                            <span>
                                Access your learning dashboard
                            </span>

                        </div>

                    </div>


                    <div className="left-footer">

                        © 2026 SkillUp Learning Portal. All rights reserved.

                    </div>

                </div>


                {/* RIGHT SECTION */}

                <div className="login-right">


                    {/* FORM HEADING */}

                    <div className="form-heading">

                        <div className="form-icon">

                            <GraduationCap size={25} />

                        </div>

                        <h2>Welcome Back!</h2>

                        <p>
                            Sign in to continue your learning journey.
                        </p>

                    </div>


                    {/* LOGIN FORM */}

                    <form onSubmit={handleLogin}>


                        {/* MOBILE NUMBER */}

                        <div className="input-group">

                            <label>Mobile Number</label>

                            <div className="input-box">

                                <Phone size={19} />

                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter your mobile number"
                                    value={form.mobile}
                                    onChange={(e) => {

                                        const value = e.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 10);

                                        setForm((previous) => ({
                                            ...previous,
                                            mobile: value
                                        }));

                                        setError("");
                                    }}
                                    maxLength="10"
                                    required
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div className="input-group">

                            <label>Password</label>

                            <div className="input-box">

                                <Lock size={19} />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() => setShowPassword(!showPassword)}
                                >

                                    {showPassword
                                        ? <EyeOff size={19} />
                                        : <Eye size={19} />
                                    }

                                </button>

                            </div>

                        </div>


                        {/* ERROR MESSAGE */}

                        {error && (

                            <div className="error-message">
                                {error}
                            </div>

                        )}


                        {/* SUCCESS MESSAGE */}

                        {message && (

                            <div className="success-message">
                                {message}
                            </div>

                        )}


                        {/* LOGIN BUTTON */}

                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Signing In..."
                                : "Sign In"
                            }

                            {!loading && <ArrowRight size={19} />}

                        </button>


                    </form>


                    {/* REGISTER LINK */}

                    <div className="register-link">

                        Don't have an account?

                        <a href="/register">
                            Create Account
                        </a>

                    </div>


                </div>

            </div>

        </div>

    );

}

export default Login;