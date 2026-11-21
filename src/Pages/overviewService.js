import { getLoggedInUser } from "../RegisterLoginComponents/AuthService";
import { courses, upcoming, activity } from "../data/courseData";

const API_BASE_URL = "http://localhost:8080/api/overview";

// Synchronous default / offline data
export const getOverviewData = () => {
    const user = getLoggedInUser();
    const studentName = user?.fullName || "Student";

    const currentHour = new Date().getHours();
    let greeting = "Good evening";

    if (currentHour < 12) {
        greeting = "Good morning";
    } else if (currentHour < 17) {
        greeting = "Good afternoon";
    }

    const enrolledCourses = courses.length;
    const inProgressCourses = courses.filter(
        c => c.progress > 0 && c.progress < 100
    ).length;
    const completedCourses = courses.filter(
        c => c.progress === 100
    ).length;

    const totalProgress = enrolledCourses > 0
        ? Math.round(courses.reduce((t, c) => t + (c.progress || 0), 0) / enrolledCourses)
        : 0;

    const learningCourses = courses.filter(
        c => c.progress > 0 && c.progress < 100
    ).slice(0, 3);

    return {
        user,
        studentName,
        greeting,
        enrolledCourses,
        inProgressCourses,
        completedCourses,
        totalProgress,
        attendanceRate: "92%",
        testsCompleted: 8,
        averageScore: "84%",
        learningCourses: learningCourses.length > 0 ? learningCourses : courses.slice(0, 2),
        upcomingActivities: upcoming || [],
        recentActivities: activity || []
    };
};

// Asynchronous fetch from Spring Boot backend (OverviewController)
export const fetchOverviewFromApi = async () => {
    const user = getLoggedInUser();
    const token = localStorage.getItem("token");

    const userId = user?.userId || 1;

    try {
        const response = await fetch(`${API_BASE_URL}?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });

        if (response.ok) {
            const apiData = await response.json();
            return {
                ...getOverviewData(),
                ...apiData,
                studentName: apiData.studentName || user?.fullName || "Student",
                learningCourses: apiData.learningCourses && apiData.learningCourses.length > 0
                    ? apiData.learningCourses
                    : courses.slice(0, 3),
                upcomingActivities: apiData.upcomingActivities && apiData.upcomingActivities.length > 0
                    ? apiData.upcomingActivities
                    : upcoming,
                recentActivities: apiData.recentActivities && apiData.recentActivities.length > 0
                    ? apiData.recentActivities
                    : activity
            };
        }
    } catch {
        // Backend not running -> fallback smoothly to local data
    }

    return getOverviewData();
};

// Mark lesson as finished via Spring Boot backend
export const finishLessonApi = async (courseId) => {
    const user = getLoggedInUser();
    const token = localStorage.getItem("token");
    const userId = user?.userId || 1;

    try {
        const response = await fetch(`${API_BASE_URL}/lesson/finish?userId=${userId}&courseId=${courseId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(token ? { "Authorization": `Bearer ${token}` } : {})
            }
        });

        if (response.ok) {
            return await response.json();
        }
    } catch {
        // Return simulated success if offline
    }

    return { message: "Lesson marked as finished successfully!" };
};
