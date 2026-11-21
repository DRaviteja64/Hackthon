import React, { useState } from "react";

import {
    User,
    Mail,
    Phone,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    GraduationCap,
    CheckCircle,
    Sparkles
} from "lucide-react";

import "./Register.css";

import { registerUser } from "./AuthService";

function Register() {

    const [form, setForm] = useState({
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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


    // PASSWORD STRENGTH
    const passwordStrength = () => {

        const password = form.password;

        if (!password) return "";

        if (password.length < 6) return "Weak";

        if (
            password.length >= 8 &&
            /[A-Z]/.test(password) &&
            /[0-9]/.test(password) &&
            /[^A-Za-z0-9]/.test(password)
        ) {
            return "Strong";
        }

        return "Medium";
    };


    // VALIDATE FORM
    const validateForm = () => {

        if (!form.fullName.trim()) {
            setError("Please enter your full name.");
            return false;
        }

        if (!/^\d{10}$/.test(form.mobile)) {
            setError("Please enter a valid 10-digit mobile number.");
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            setError("Please enter a valid email address.");
            return false;
        }

        if (form.password.length < 8) {
            setError("Password must contain at least 8 characters.");
            return false;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        return true;
    };


    // REGISTER USER
    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setMessage("");

        if (!validateForm()) {
            return;
        }

        try {

            setLoading(true);

            const userData = {
                fullName: form.fullName.trim(),
                mobile: form.mobile,
                email: form.email.trim(),
                password: form.password
            };

            const response = await registerUser(userData);

            setMessage(response.message || "Registration successful!");

            setForm({
                fullName: "",
                mobile: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        } catch (err) {

            setError(err.message || "Registration failed.");

        } finally {

            setLoading(false);

        }
    };


    return (

        <div className="register-page">

            <div className="register-container">

                {/* LEFT SECTION */}

                <div className="register-left">

                    {/* BRAND */}

                    <div className="brand-logo">

                        <div className="brand-icon">
                            <GraduationCap size={25} />
                        </div>

                        <span>
                            Skill<span className="brand-highlight">Up</span>
                        </span>

                    </div>


                    {/* LEFT CONTENT */}

                    <div className="left-content">

                        <div className="welcome-badge">
                            <Sparkles size={15} />
                            <span>YOUR LEARNING JOURNEY STARTS HERE</span>
                        </div>

                        <h1>
                            Learn Today.
                            <br />
                            Grow Tomorrow.
                            <br />
                            <span>Achieve More.</span>
                        </h1>

                        <p>
                            Join our student learning portal to explore courses,
                            learn new skills, track your progress and achieve
                            your academic goals.
                        </p>

                        <div className="feature-item">
                            <CheckCircle size={19} />
                            <span>Access courses and learning materials</span>
                        </div>

                        <div className="feature-item">
                            <CheckCircle size={19} />
                            <span>Track attendance and learning progress</span>
                        </div>

                        <div className="feature-item">
                            <CheckCircle size={19} />
                            <span>Take tests and monitor your performance</span>
                        </div>

                    </div>


                    {/* FOOTER */}

                    <div className="left-footer">
                        © 2026 SkillUp Learning Portal. All rights reserved.
                    </div>

                </div>


                {/* RIGHT SECTION */}

                <div className="register-right">

                    {/* FORM HEADING */}

                    <div className="form-heading">

                        <div className="form-icon">
                            <GraduationCap size={25} />
                        </div>

                        <h2>Create Student Account</h2>

                        <p>
                            Join SkillUp and start your learning journey.
                        </p>

                    </div>


                    <form onSubmit={handleRegister}>

                        {/* FULL NAME */}

                        <div className="input-group">

                            <label>Full Name</label>

                            <div className="input-box">

                                <User size={19} />

                                <input
                                    type="text"
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>


                        {/* MOBILE */}

                        <div className="input-group">

                            <label>Mobile Number</label>

                            <div className="input-box">

                                <Phone size={19} />

                                <input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Enter 10-digit mobile number"
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


                        {/* EMAIL */}

                        <div className="input-group">

                            <label>Email Address</label>

                            <div className="input-box">

                                <Mail size={19} />

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    value={form.email}
                                    onChange={handleChange}
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
                                    placeholder="Create your password"
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

                            {form.password && (

                                <div className={`password-strength ${passwordStrength().toLowerCase()}`}>
                                    Password strength: {passwordStrength()}
                                </div>

                            )}

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="input-group">

                            <label>Confirm Password</label>

                            <div className="input-box">

                                <Lock size={19} />

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />

                                <button
                                    type="button"
                                    className="eye-btn"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword
                                        ? <EyeOff size={19} />
                                        : <Eye size={19} />
                                    }
                                </button>

                            </div>

                        </div>


                        {/* ERROR */}

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}


                        {/* SUCCESS */}

                        {message && (
                            <div className="success-message">
                                {message}
                            </div>
                        )}


                        {/* REGISTER BUTTON */}

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={loading}
                        >

                            {loading ? "Creating Account..." : "Create Student Account"}

                            {!loading && <ArrowRight size={19} />}

                        </button>

                    </form>


                    {/* LOGIN LINK */}

                    <div className="login-link">
                        Already have an account?
                        <a href="/login"> Sign In</a>
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Register;