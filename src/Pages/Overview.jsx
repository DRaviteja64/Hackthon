import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    BookOpen,
    CalendarCheck,
    ClipboardList,
    ArrowRight,
    Clock,
    Flame,
    Target,
    X,
    CheckCircle2,
    Play,
    RefreshCw
} from "lucide-react";

import PageHeader from "../Components/PageHeader";
import StatCard from "../Components/StatCard";
import CourseCard from "../Components/CourseCard";

import {
    fetchOverviewFromApi,
    finishLessonApi
} from "./overviewService.js";

import "./Overview.css";

export default function Overview() {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [activeLessonCourse, setActiveLessonCourse] = useState(null);
    const [lessonFinished, setLessonFinished] = useState(false);
    const [finishingLesson, setFinishingLesson] = useState(false);

    // Fetch Overview Data
    const loadOverview = async () => {

        try {
            setError("");

            const response = await fetchOverviewFromApi();

            setData(response);

        } catch (err) {

            setError(err.message || "Unable to load dashboard data.");

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        let isMounted = true;
        fetchOverviewFromApi()
            .then((res) => {
                if (isMounted) {
                    setData(res);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message || "Unable to load dashboard data.");
                }
            })
            .finally(() => {
                if (isMounted) {
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    // Continue Course
    const handleContinueCourse = (course) => {

        setActiveLessonCourse(course);
        setLessonFinished(false);
    };

    // Finish Lesson
    const handleFinishLesson = async () => {

        if (!activeLessonCourse || finishingLesson) return;

        try {

            setFinishingLesson(true);

            await finishLessonApi(activeLessonCourse.id);

            setLessonFinished(true);

            // Refresh Dashboard
            await loadOverview();

        } catch (err) {

            alert(err.message || "Unable to complete lesson.");

        } finally {

            setFinishingLesson(false);
        }
    };

    // Loading
    if (loading) {
        return (
            <div className="overview-loading">
                <RefreshCw className="loading-icon" size={30} />
                <h3>Loading your dashboard...</h3>
                <p>Please wait while we fetch your learning data.</p>
            </div>
        );
    }

    // Error
    if (error) {
        return (
            <div className="overview-error">
                <h2>Unable to load dashboard</h2>

                <p>{error}</p>

                <button onClick={() => {
                    setLoading(true);
                    loadOverview();
                }}>
                    <RefreshCw size={16} />
                    Try Again
                </button>
            </div>
        );
    }

    if (!data) return null;

    const {
        studentName,
        greeting,
        enrolledCourses = 0,
        inProgressCourses = 0,
        completedCourses = 0,
        totalProgress = 0,
        attendanceRate = "0%",
        testsCompleted = 0,
        learningCourses = [],
        upcomingActivities = [],
        recentActivities = []
    } = data;

    return (

        <div className="overview-page">

            {/* Page Header */}

            <PageHeader
                title={`${greeting || "Welcome"}, ${studentName || "Student"} 👋`}
                subtitle="Here's your learning snapshot. Keep up the great work!"
            />

            {/* Welcome Banner */}

            <section className="welcome-banner">

                <div className="welcome-content">

                    <span className="banner-kicker">
                        YOUR LEARNING JOURNEY
                    </span>

                    <h2>
                        Consistency is your
                        <br />
                        superpower.
                    </h2>

                    <p>
                        Make today count. You're building industry-ready skills
                        one lesson at a time.
                    </p>

                    <Link to="/explore-courses" className="banner-button">
                        Explore new courses
                        <ArrowRight size={17} />
                    </Link>

                </div>

                <div className="banner-illustration">

                    <div className="banner-circle">
                        <BookOpen size={64} />
                    </div>

                    <div className="floating-note">
                        ✦ Keep growing!
                    </div>

                </div>

            </section>

            {/* Statistics */}

            <div className="stats-grid">

                <StatCard
                    icon={BookOpen}
                    label="Enrolled Courses"
                    value={enrolledCourses}
                    caption={`${inProgressCourses} in progress`}
                    tone="blue"
                />

                <StatCard
                    icon={Target}
                    label="Overall Progress"
                    value={`${totalProgress}%`}
                    caption={`${completedCourses} completed`}
                    tone="violet"
                />

                <StatCard
                    icon={CalendarCheck}
                    label="Attendance Rate"
                    value={attendanceRate}
                    caption="Your attendance summary"
                    tone="green"
                />

                <StatCard
                    icon={ClipboardList}
                    label="Tests Completed"
                    value={testsCompleted}
                    caption="Your completed assessments"
                    tone="orange"
                />

            </div>

            {/* Continue Learning */}

            <div className="section-row">

                <div>
                    <h2>Continue learning</h2>
                    <p>Pick up where you left off</p>
                </div>

                <Link to="/my-learning">
                    View all
                    <ArrowRight size={16} />
                </Link>

            </div>

            <div className="course-grid">

                {learningCourses.length > 0 ? (

                    learningCourses.map((course) => (

                        <CourseCard
                            key={course.id}
                            course={course}
                            onAction={handleContinueCourse}
                        />

                    ))

                ) : (

                    <div className="overview-empty">
                        No courses currently in progress.
                    </div>

                )}

            </div>

            {/* Dashboard Columns */}

            <div className="dashboard-columns">

                {/* Upcoming Activities */}

                <section className="panel">

                    <div className="panel-heading">

                        <div>
                            <h2>Upcoming activities</h2>
                            <p>Stay ahead of your academic schedule</p>
                        </div>

                        <CalendarCheck size={20} />

                    </div>

                    {upcomingActivities.length > 0 ? (

                        upcomingActivities.map((item, index) => (

                            <div className="activity-row" key={item.id || index}>

                                <div className="activity-date">

                                    <b>{item.day || "--"}</b>

                                    <span>
                                        {item.month || ""}
                                    </span>

                                </div>

                                <div className="activity-info">

                                    <b>{item.title}</b>

                                    <span>{item.course}</span>

                                </div>

                                <span className="activity-time">

                                    <Clock size={14} />

                                    {item.time}

                                </span>

                            </div>

                        ))

                    ) : (

                        <div className="overview-empty">
                            No upcoming activities.
                        </div>

                    )}

                </section>

                {/* Recent Activities */}

                <section className="panel">

                    <div className="panel-heading">

                        <div>
                            <h2>Recent activity</h2>
                            <p>Your latest learning milestones</p>
                        </div>

                        <Flame size={20} />

                    </div>

                    {recentActivities.length > 0 ? (

                        recentActivities.map((item, index) => (

                            <div className="recent-row" key={item.id || index}>

                                <div className={`recent-icon ${item.type}`}>

                                    {item.type === "test" ? (
                                        <ClipboardList size={18} />
                                    ) : (
                                        <BookOpen size={18} />
                                    )}

                                </div>

                                <div>

                                    <b>{item.title}</b>

                                    <span>
                                        {item.course} · {item.time}
                                    </span>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="overview-empty">
                            No recent activities.
                        </div>

                    )}

                </section>

            </div>

            {/* Lesson Modal */}

            {activeLessonCourse && (

                <div
                    className="modal-backdrop"
                    onClick={() => setActiveLessonCourse(null)}
                >

                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="modal-header">

                            <div>

                                <span className="modal-kicker">
                                    {activeLessonCourse.category}
                                </span>

                                <h3>{activeLessonCourse.title}</h3>

                            </div>

                            <button
                                className="modal-close-btn"
                                onClick={() => setActiveLessonCourse(null)}
                            >
                                <X size={20} />
                            </button>

                        </div>

                        <div className="modal-body">

                            <div className="lesson-player-preview">

                                <div className="lesson-player-screen">

                                    <Play size={44} className="player-icon" />

                                    <span>
                                        Lesson: Core Architecture & Hands-on Implementation
                                    </span>

                                </div>

                            </div>

                            <div className="lesson-details">

                                <h4>Module 4: Practical Coding & Best Practices</h4>

                                <p>
                                    In this lesson, you will work through architecture
                                    design, error handling, and practical implementations.
                                </p>

                                <div className="lesson-checklist">

                                    <div className="check-item checked">
                                        <CheckCircle2 size={16} />
                                        <span>
                                            Part 1: Concept Overview & Diagram Walkthrough
                                        </span>
                                    </div>

                                    <div className="check-item checked">
                                        <CheckCircle2 size={16} />
                                        <span>
                                            Part 2: Setting up project structure
                                        </span>
                                    </div>

                                    <div className={`check-item ${lessonFinished ? "checked" : ""}`}>
                                        <CheckCircle2 size={16} />
                                        <span>
                                            Part 3: Interactive Coding Exercise
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="outline-button"
                                onClick={() => setActiveLessonCourse(null)}
                            >
                                Close
                            </button>

                            <button
                                type="button"
                                className="primary-modal-btn"
                                onClick={handleFinishLesson}
                                disabled={lessonFinished || finishingLesson}
                            >

                                {finishingLesson
                                    ? "Updating..."
                                    : lessonFinished
                                    ? "✓ Lesson Completed"
                                    : "Mark as Finished"}

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}