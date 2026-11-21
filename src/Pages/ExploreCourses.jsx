import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import PageHeader from "../Components/PageHeader";
import CourseCard from "../Components/CourseCard";

import {
    Search,
    Compass,
    BookOpen,
    Star,
    Clock,
    CheckCircle2,
    X
} from "lucide-react";

const API_URL = "http://localhost:8080/api/courses";

export default function ExploreCourses() {

    const [searchParams] = useSearchParams();

    const initialQuery = searchParams.get("q") || "";

    const [q, setQ] = useState(initialQuery);
    const [category, setCategory] = useState("All");
    const [level, setLevel] = useState("All");

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const [enrolledCourses, setEnrolledCourses] = useState({});

    const [loading, setLoading] = useState(true);
    const [enrollLoading, setEnrollLoading] = useState(false);
    const [error, setError] = useState("");
    const [enrollError, setEnrollError] = useState("");

    // =====================================
    // GET LOGGED-IN USER
    // =====================================

    const getLoggedInUser = () => {

        const storedUser = localStorage.getItem("user");

        console.log("========== LOGGED-IN USER ==========");
        console.log("Stored User:", storedUser);

        if (!storedUser) {
            throw new Error("User information not found. Please login again.");
        }

        let user;

        try {
            user = JSON.parse(storedUser);
        } catch {
            throw new Error("Invalid user information. Please login again.");
        }

        console.log("User Details:", user);

        // Support both id and userId
        const userId = user?.id ?? user?.userId;

        if (userId === undefined || userId === null) {
            throw new Error(
                "User ID not found in login response. Please check your login API."
            );
        }

        console.log("Logged-in User ID:", userId);

        return userId;
    };

    // =====================================
    // FETCH COURSES FROM BACKEND
    // =====================================

    useEffect(() => {

        const fetchCourses = async () => {

            try {

                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                console.log("========== EXPLORE COURSES API ==========");
                console.log("API URL:", `${API_URL}/explore`);
                console.log("JWT Token Available:", !!token);

                if (!token) {
                    throw new Error("Please login to explore courses.");
                }

                const response = await fetch(`${API_URL}/explore`, {

                    method: "GET",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }

                });

                console.log("Explore API Status:", response.status);

                const responseText = await response.text();

                let data;

                try {
                    data = responseText ? JSON.parse(responseText) : {};
                } catch {
                    data = responseText;
                }

                console.log("Explore API Response:", data);

                if (response.status === 401) {
                    throw new Error(
                        "Your session has expired. Please login again."
                    );
                }

                if (response.status === 403) {
                    throw new Error(
                        "You don't have permission to access courses."
                    );
                }

                if (!response.ok) {
                    throw new Error(
                        data?.message || "Unable to load courses."
                    );
                }

                const courseList = Array.isArray(data)
                    ? data
                    : Array.isArray(data.courses)
                        ? data.courses
                        : [];

                console.log("Total Courses:", courseList.length);
                console.table(courseList);

                setCourses(courseList);

            } catch (err) {

                console.error("Explore Courses Error:", err);

                setError(
                    err.message ||
                    "Something went wrong while loading courses."
                );

            } finally {

                setLoading(false);

            }

        };

        fetchCourses();

    }, []);

    // =====================================
    // DYNAMIC CATEGORIES
    // =====================================

    const cats = [
        "All",
        ...new Set(courses.map((c) => c.category).filter(Boolean))
    ];

    const levels = [
        "All",
        "Beginner",
        "Intermediate",
        "Advanced"
    ];

    // =====================================
    // SEARCH AND FILTER COURSES
    // =====================================

    const list = courses.filter((c) => {

        const matchesCategory =
            category === "All" || c.category === category;

        const matchesLevel =
            level === "All" || c.level === level;

        const searchText = q.toLowerCase();

        const matchesSearch =
            (c.title || "").toLowerCase().includes(searchText) ||
            (c.description || "").toLowerCase().includes(searchText) ||
            (c.category || "").toLowerCase().includes(searchText);

        return matchesCategory && matchesLevel && matchesSearch;

    });

    // =====================================
    // ENROLLMENT REQUEST API
    // =====================================

    const handleEnroll = async (courseId) => {

        try {

            setEnrollLoading(true);
            setEnrollError("");

            const token = localStorage.getItem("token");

            console.log("========== ENROLLMENT REQUEST ==========");

            if (!token) {
                throw new Error("Please login to enroll in courses.");
            }

            if (!courseId) {
                throw new Error("Course ID is missing.");
            }

            // GET USER ID
            const userId = getLoggedInUser();

            console.log("User ID:", userId);
            console.log("Course ID:", courseId);

            const requestBody = {
                userId: userId,
                courseId: courseId
            };

            console.log("Enrollment Request Body:", requestBody);

            // =====================================
            // POST API REQUEST
            // =====================================

            const response = await fetch(
                `${API_URL}/enroll-request`,
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },

                    body: JSON.stringify(requestBody)

                }
            );

            console.log("Enrollment API Status:", response.status);

            const responseText = await response.text();

            let data;

            try {
                data = responseText ? JSON.parse(responseText) : {};
            } catch {
                data = responseText;
            }

            console.log("Enrollment API Response:", data);

            if (response.status === 401) {
                throw new Error(
                    "Your session has expired. Please login again."
                );
            }

            if (response.status === 403) {
                throw new Error(
                    "You don't have permission to send an enrollment request."
                );
            }

            if (!response.ok) {

                throw new Error(
                    data?.message || "Enrollment request failed."
                );

            }

            // =====================================
            // UPDATE UI AFTER SUCCESS
            // =====================================

            setEnrolledCourses((prev) => ({
                ...prev,
                [courseId]: true
            }));

            console.log("Enrollment Request Successfully Submitted!");

            alert(
                data.message ||
                "Enrollment request sent successfully!"
            );

            setSelectedCourse(null);

        } catch (err) {

            console.error("========== ENROLLMENT REQUEST ERROR ==========");
            console.error(err);

            setEnrollError(
                err.message ||
                "Something went wrong while sending your request."
            );

        } finally {

            setEnrollLoading(false);

        }

    };

    // =====================================
    // RETRY FETCH COURSES
    // =====================================

    const retryFetchCourses = () => {
        window.location.reload();
    };

    // =====================================
    // UI
    // =====================================

    return (

        <div className="explore-page">

            <PageHeader
                title="Explore Courses"
                subtitle="Discover new industry-aligned technologies, expand your knowledge, and enroll in certified programs."
            />

            {/* EXPLORE CONTROLS */}

            <div className="explore-controls">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        type="text"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search courses, skills, frameworks..."
                    />

                </div>

                <div className="filter-group-container">

                    {/* CATEGORY FILTER */}

                    <div className="filter-pills">

                        {cats.map((c) => (

                            <button
                                key={c}
                                type="button"
                                className={`pill ${category === c ? "selected" : ""}`}
                                onClick={() => setCategory(c)}
                            >
                                {c}
                            </button>

                        ))}

                    </div>

                    {/* LEVEL FILTER */}

                    <div className="level-pills">

                        {levels.map((l) => (

                            <button
                                key={l}
                                type="button"
                                className={`pill level-pill ${level === l ? "selected" : ""}`}
                                onClick={() => setLevel(l)}
                            >
                                {l}
                            </button>

                        ))}

                    </div>

                </div>

            </div>

            {/* LOADING STATE */}

            {loading && (

                <div className="empty-state">

                    <Compass size={40} />

                    <h3>Loading Courses...</h3>

                    <p>
                        Please wait while we fetch courses from the server.
                    </p>

                </div>

            )}

            {/* ERROR STATE */}

            {!loading && error && (

                <div className="empty-state">

                    <X size={40} />

                    <h3>Unable to Load Courses</h3>

                    <p>{error}</p>

                    <button
                        type="button"
                        className="primary-modal-btn"
                        onClick={retryFetchCourses}
                    >
                        Try Again
                    </button>

                </div>

            )}

            {/* COURSES GRID */}

            {!loading && !error && (

                <>

                    <div className="course-grid">

                        {list.map((c) => (

                            <CourseCard
                                key={c.id}
                                course={c}
                                explore
                                onAction={(course) => {
                                    setEnrollError("");
                                    setSelectedCourse(course);
                                }}
                            />

                        ))}

                    </div>

                    {/* EMPTY STATE */}

                    {list.length === 0 && (

                        <div className="empty-state">

                            <Compass size={44} />

                            <h3>No Matching Courses Found</h3>

                            <p>
                                Try modifying your keyword search or selecting another category.
                            </p>

                        </div>

                    )}

                </>

            )}

            {/* COURSE DETAIL MODAL */}

            {selectedCourse && (

                <div
                    className="modal-backdrop"
                    onClick={() => {

                        if (!enrollLoading) {
                            setSelectedCourse(null);
                            setEnrollError("");
                        }

                    }}
                >

                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* MODAL HEADER */}

                        <div className="modal-header">

                            <div>

                                <span className="modal-kicker">
                                    {selectedCourse.category}
                                </span>

                                <h3>{selectedCourse.title}</h3>

                            </div>

                            <button
                                type="button"
                                className="modal-close-btn"
                                disabled={enrollLoading}
                                onClick={() => {
                                    setSelectedCourse(null);
                                    setEnrollError("");
                                }}
                            >
                                <X size={20} />
                            </button>

                        </div>

                        {/* MODAL BODY */}

                        <div className="modal-body">

                            <div className="course-modal-banner">

                                <div className="banner-badge-row">

                                    <span className="course-level">
                                        {selectedCourse.level}
                                    </span>

                                    <span className="rating-pill">

                                        <Star
                                            size={14}
                                            className="star-icon"
                                        />

                                        {selectedCourse.rating} / 5.0

                                    </span>

                                </div>

                                <p className="modal-description">
                                    {selectedCourse.description}
                                </p>

                            </div>

                            {/* COURSE STATS */}

                            <div className="modal-stats-row">

                                <div className="modal-stat">

                                    <Clock size={16} />

                                    <div>
                                        <small>Duration</small>
                                        <b>{selectedCourse.duration}</b>
                                    </div>

                                </div>

                                <div className="modal-stat">

                                    <BookOpen size={16} />

                                    <div>
                                        <small>Total Lessons</small>
                                        <b>{selectedCourse.lessons} Lessons</b>
                                    </div>

                                </div>

                                <div className="modal-stat">

                                    <Compass size={16} />

                                    <div>
                                        <small>Certificate</small>
                                        <b>Included</b>
                                    </div>

                                </div>

                            </div>

                            {/* CURRICULUM */}

                            <div className="modal-curriculum">

                                <h4>What you'll master:</h4>

                                <ul>
                                    <li>
                                        Industry best practices and architectural patterns
                                    </li>

                                    <li>
                                        Real-world hands-on project implementations
                                    </li>

                                    <li>
                                        Interview preparation questions and practice assessments
                                    </li>

                                    <li>
                                        End-to-end deployment and testing methodologies
                                    </li>
                                </ul>

                            </div>

                            {/* ENROLLMENT ERROR */}

                            {enrollError && (

                                <div className="error-message">
                                    {enrollError}
                                </div>

                            )}

                        </div>

                        {/* MODAL FOOTER */}

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="outline-button"
                                disabled={enrollLoading}
                                onClick={() => {
                                    setSelectedCourse(null);
                                    setEnrollError("");
                                }}
                            >
                                Back to Courses
                            </button>

                            <button
                                type="button"
                                className={`primary-modal-btn ${
                                    enrolledCourses[selectedCourse.id] ||
                                    selectedCourse.progress > 0
                                        ? "enrolled"
                                        : ""
                                }`}
                                disabled={
                                    enrollLoading ||
                                    enrolledCourses[selectedCourse.id] ||
                                    selectedCourse.progress > 0
                                }
                                onClick={() => handleEnroll(selectedCourse.id)}
                            >

                                {enrollLoading ? (

                                    "Sending Request..."

                                ) : enrolledCourses[selectedCourse.id] ||
                                  selectedCourse.progress > 0 ? (

                                    <>
                                        <CheckCircle2 size={17} />
                                        <span>Enrollment Requested</span>
                                    </>

                                ) : (

                                    "Enroll for Free"

                                )}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}