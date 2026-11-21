
import React, { useState, useEffect } from "react";

import PageHeader from "../Components/PageHeader";
import CourseCard from "../Components/CourseCard";
import StatCard from "../Components/StatCard";

import {
    BookOpen,
    CheckCircle,
    Clock,
    Search,
    X,
    Play,
    CheckCircle2
} from "lucide-react";

const API_URL = "http://localhost:8080/api/courses";

export default function MyLearning() {

    const [filter, setFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    const [activeCourse, setActiveCourse] = useState(null);

    const [courses, setCourses] = useState([]);
    const [completedLessons, setCompletedLessons] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================
    // SAFE JSON RESPONSE
    // =====================================

    const readResponse = async (response) => {

        const responseText = await response.text();

        if (!responseText) {
            return {};
        }

        try {
            return JSON.parse(responseText);
        } catch {
            return responseText;
        }

    };

    // =====================================
    // GET COURSE LIST
    // =====================================

    const fetchCourseDetails = async (token) => {

        try {

            const response = await fetch(`${API_URL}/explore`, {

                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

            });

            console.log("COURSE DETAILS API STATUS:", response.status);

            if (!response.ok) {
                console.warn("Unable to fetch course details.");
                return [];
            }

            const data = await readResponse(response);

            const courseList = Array.isArray(data)
                ? data
                : Array.isArray(data.courses)
                    ? data.courses
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

            console.log("COURSE DETAILS:", courseList);

            return courseList;

        } catch (err) {

            console.error("Course Details Error:", err);

            return [];

        }

    };

    // =====================================
    // FETCH MY ENROLLMENTS
    // =====================================

    const fetchMyLearning = async () => {

        try {

            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");
            const storedUser = localStorage.getItem("user");

            console.log("========== MY LEARNING API ==========");

            console.log("JWT Token Available:", !!token);
            console.log("Stored User:", storedUser);

            if (!token) {
                throw new Error("Please login to view your enrolled courses.");
            }

            if (!storedUser) {
                throw new Error("User information not found. Please login again.");
            }

            let user;

            try {
                user = JSON.parse(storedUser);
            } catch {
                throw new Error("Invalid user information. Please login again.");
            }

            console.log("Logged-in User:", user);

            const userId = user?.id ?? user?.userId;

            if (userId === undefined || userId === null) {
                throw new Error("User ID not found. Please login again.");
            }

            const requestURL =
                `${API_URL}/my-enrollments?userId=${encodeURIComponent(userId)}`;

            console.log("API URL:", requestURL);
            console.log("User ID:", userId);

            // =====================================
            // ENROLLMENT API REQUEST
            // =====================================

            const response = await fetch(requestURL, {

                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

            });

            console.log("ENROLLMENT API STATUS:", response.status);

            const data = await readResponse(response);

            console.log("BACKEND ENROLLMENT RESPONSE:", data);

            if (response.status === 401) {
                throw new Error("Your session has expired. Please login again.");
            }

            if (response.status === 403) {
                throw new Error("You don't have permission to view your enrollments.");
            }

            if (!response.ok) {
                throw new Error(
                    data?.message || `Request failed with status ${response.status}`
                );
            }

            // =====================================
            // EXTRACT ENROLLMENT ARRAY
            // =====================================

            const enrollmentList = Array.isArray(data)
                ? data
                : Array.isArray(data.enrollments)
                    ? data.enrollments
                    : Array.isArray(data.data)
                        ? data.data
                        : [];

            console.log("TOTAL ENROLLMENTS:", enrollmentList.length);

            console.table(enrollmentList);

            // =====================================
            // FETCH COURSE DETAILS
            // =====================================

            const courseList = await fetchCourseDetails(token);

            // =====================================
            // MATCH ENROLLMENTS WITH COURSES
            // =====================================

            const formattedCourses = enrollmentList.map((enrollment) => {

                const course = courseList.find((item) =>

                    Number(item.id) === Number(enrollment.courseId)

                ) || enrollment.course || {};

                return {

                    id: course.id ?? enrollment.courseId,

                    enrollmentId: enrollment.enrollmentId,

                    userId: enrollment.userId,

                    courseId: enrollment.courseId,

                    title: course.title || `Course #${enrollment.courseId}`,

                    category: course.category || "General",

                    color: course.color || "blue",

                    description: course.description || "Course details are not available.",

                    duration: course.duration || "Not specified",

                    lessons: course.lessons || 0,

                    level: course.level || "Beginner",

                    rating: course.rating || 0,

                    progress: course.progress || 0,

                    status: enrollment.status || "PENDING",

                    enrollmentDate: enrollment.enrollmentDate

                };

            });

            console.log("========== MY LEARNING COURSES ==========");
            console.table(formattedCourses);

            setCourses(formattedCourses);

            console.log("MY LEARNING API COMPLETED");

        } catch (err) {

            console.error("MY LEARNING ERROR:", err);

            setCourses([]);

            setError(
                err.message || "Something went wrong while loading your courses."
            );

        } finally {

            setLoading(false);

        }

    };

    // =====================================
    // USE EFFECT
    // =====================================

    useEffect(() => {

        fetchMyLearning();

    }, []);

    // =====================================
    // ENROLLMENT COUNTS
    // =====================================

    const enrolledCount = courses.length;

    const pendingCount = courses.filter(
        (course) => course.status === "PENDING"
    ).length;

    const approvedCount = courses.filter(
        (course) => course.status === "APPROVED"
    ).length;

    const rejectedCount = courses.filter(
        (course) => course.status === "REJECTED"
    ).length;

    const cancelledCount = courses.filter(
        (course) => course.status === "CANCELLED"
    ).length;

    // =====================================
    // FILTER COURSES
    // =====================================

    const filtered = courses.filter((course) => {

        const matchesFilter =
            filter === "ALL" ||
            course.status === filter;

        const matchesSearch =
            (course.title || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||

            (course.category || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;

    });

    // =====================================
    // STATUS COLORS
    // =====================================

    const getStatusStyle = (status) => {

        const styles = {

            PENDING: {
                background: "#fff7e6",
                color: "#b7791f"
            },

            APPROVED: {
                background: "#e6ffed",
                color: "#15803d"
            },

            REJECTED: {
                background: "#fee2e2",
                color: "#dc2626"
            },

            CANCELLED: {
                background: "#f1f5f9",
                color: "#64748b"
            }

        };

        return styles[status] || styles.PENDING;

    };

    // =====================================
    // UI
    // =====================================

    return (

        <div className="learning-page">

            <PageHeader
                title="My Learning"
                subtitle="Manage your enrolled courses, track enrollment requests, and continue your learning journey."
            />

            {/* STATISTICS */}

            <div className="stats-grid">

                <StatCard
                    icon={BookOpen}
                    label="Total Enrollments"
                    value={enrolledCount}
                    caption="All course requests"
                    tone="blue"
                />

                <StatCard
                    icon={Clock}
                    label="Pending Approval"
                    value={pendingCount}
                    caption="Waiting for admin approval"
                    tone="violet"
                />

                <StatCard
                    icon={CheckCircle}
                    label="Approved Courses"
                    value={approvedCount}
                    caption="Ready for learning"
                    tone="green"
                />

            </div>

            {/* SEARCH AND FILTER */}

            <div className="learning-toolbar">

                <div className="search-box">

                    <Search size={18} />

                    <input
                        type="text"
                        placeholder="Search enrolled courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

                <div className="filter-pills">

                    <button
                        type="button"
                        className={`pill ${filter === "ALL" ? "selected" : ""}`}
                        onClick={() => setFilter("ALL")}
                    >
                        All ({enrolledCount})
                    </button>

                    <button
                        type="button"
                        className={`pill ${filter === "PENDING" ? "selected" : ""}`}
                        onClick={() => setFilter("PENDING")}
                    >
                        Pending ({pendingCount})
                    </button>

                    <button
                        type="button"
                        className={`pill ${filter === "APPROVED" ? "selected" : ""}`}
                        onClick={() => setFilter("APPROVED")}
                    >
                        Approved ({approvedCount})
                    </button>

                    <button
                        type="button"
                        className={`pill ${filter === "REJECTED" ? "selected" : ""}`}
                        onClick={() => setFilter("REJECTED")}
                    >
                        Rejected ({rejectedCount})
                    </button>

                    <button
                        type="button"
                        className={`pill ${filter === "CANCELLED" ? "selected" : ""}`}
                        onClick={() => setFilter("CANCELLED")}
                    >
                        Cancelled ({cancelledCount})
                    </button>

                </div>

            </div>

            {/* LOADING */}

            {loading && (

                <div className="empty-state">

                    <BookOpen size={44} />

                    <h3>Loading Your Courses...</h3>

                    <p>Please wait while we fetch your enrollments.</p>

                </div>

            )}

            {/* ERROR */}

            {!loading && error && (

                <div className="empty-state">

                    <X size={44} />

                    <h3>Unable to Load Your Courses</h3>

                    <p>{error}</p>

                    <button
                        type="button"
                        className="primary-modal-btn"
                        onClick={fetchMyLearning}
                    >
                        Try Again
                    </button>

                </div>

            )}

            {/* COURSE GRID */}

            {!loading && !error && (

                <>

                    <div className="course-grid">

                        {filtered.map((course) => (

                            <div
                                key={course.enrollmentId}
                                style={{
                                    position: "relative"
                                }}
                            >

                                {/* ENROLLMENT STATUS */}

                                <div
                                    style={{
                                        display: "inline-block",
                                        padding: "6px 12px",
                                        borderRadius: "20px",
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        marginBottom: "10px",
                                        ...getStatusStyle(course.status)
                                    }}
                                >
                                    {course.status}
                                </div>

                                <CourseCard
                                    course={course}
                                    onAction={(selected) => {

                                        if (course.status !== "APPROVED") {

                                            alert(
                                                course.status === "PENDING"
                                                    ? "Your enrollment request is waiting for admin approval."
                                                    : `This course enrollment is ${course.status.toLowerCase()}.`
                                            );

                                            return;
                                        }

                                        setActiveCourse(selected);

                                    }}
                                />

                            </div>

                        ))}

                    </div>

                    {/* EMPTY STATE */}

                    {filtered.length === 0 && (

                        <div className="empty-state">

                            <BookOpen size={44} />

                            <h3>
                                {courses.length === 0
                                    ? "No Enrollments Found"
                                    : "No Courses Found"}
                            </h3>

                            <p>
                                {courses.length === 0
                                    ? "Explore courses and submit your enrollment requests."
                                    : "Try changing your filter or search query."}
                            </p>

                        </div>

                    )}

                </>

            )}

            {/* LESSON MODAL */}

            {activeCourse && (

                <div
                    className="modal-backdrop"
                    onClick={() => setActiveCourse(null)}
                >

                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="modal-header">

                            <div>

                                <span className="modal-kicker">
                                    {activeCourse.category}
                                </span>

                                <h3>{activeCourse.title}</h3>

                            </div>

                            <button
                                type="button"
                                className="modal-close-btn"
                                onClick={() => setActiveCourse(null)}
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <div className="modal-body">

                            <div className="lesson-player-preview">

                                <div className="lesson-player-screen">

                                    <Play
                                        size={44}
                                        className="player-icon"
                                    />

                                    <span>
                                        Interactive Lesson: Practical Exercises & Code Walkthrough
                                    </span>

                                </div>

                            </div>

                            <div className="lesson-details">

                                <h4>Course Curriculum & Current Lesson</h4>

                                <p>{activeCourse.description}</p>

                                <div className="lesson-checklist">

                                    <div className="check-item checked">

                                        <CheckCircle2 size={16} />

                                        <span>
                                            Module 1: Foundations and Architecture Setup
                                        </span>

                                    </div>

                                    <div className="check-item checked">

                                        <CheckCircle2 size={16} />

                                        <span>
                                            Module 2: Core Concepts & Hands-on Implementation
                                        </span>

                                    </div>

                                    <div
                                        className={`check-item ${
                                            completedLessons[activeCourse.id]
                                                ? "checked"
                                                : ""
                                        }`}
                                    >

                                        <CheckCircle2 size={16} />

                                        <span>
                                            Module 3: Advanced Optimization & Project Capstone
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="outline-button"
                                onClick={() => setActiveCourse(null)}
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="primary-modal-btn"
                                onClick={() => {

                                    setCompletedLessons((prev) => ({
                                        ...prev,
                                        [activeCourse.id]: true
                                    }));

                                }}
                            >

                                {completedLessons[activeCourse.id]
                                    ? "✓ Lesson Progress Saved"
                                    : "Mark as Completed"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}
