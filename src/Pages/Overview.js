const API_URL = "http://localhost:8080/api/overview";

// GET AUTHENTICATION DETAILS
const getAuthDetails = () => {

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (!token) {
        throw new Error("JWT token not found. Please login again.");
    }

    if (!user || !user.userId) {
        throw new Error("Student details not found. Please login again.");
    }

    return {
        user,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
};


// COMMON API RESPONSE HANDLER
const handleResponse = async (response) => {

    const contentType = response.headers.get("content-type");

    let data;

    if (contentType && contentType.includes("application/json")) {
        data = await response.json();
    } else {
        const text = await response.text();
        data = { message: text };
    }

    console.log("API Status:", response.status);
    console.log("API Response:", data);

    if (response.status === 401) {
        throw new Error("Session expired. Please login again.");
    }

    if (response.status === 403) {
        throw new Error("Access denied. You don't have permission.");
    }

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
    }

    return data;
};


// ==========================================
// GET STUDENT OVERVIEW
// ==========================================

export const fetchOverviewFromApi = async () => {

    try {

        const { user, headers } = getAuthDetails();

        const url = `${API_URL}?userId=${encodeURIComponent(user.userId)}`;

        console.log("GET Overview Request:", url);

        const response = await fetch(url, {
            method: "GET",
            headers
        });

        const data = await handleResponse(response);

        console.log("Overview Data Loaded Successfully:", data);

        return data;

    } catch (error) {

        console.error("GET Overview Error:", error);

        throw error;
    }
};


// ==========================================
// FINISH LESSON
// ==========================================

export const finishLessonApi = async (courseId) => {

    try {

        if (!courseId) {
            throw new Error("Course ID is required.");
        }

        const { user, headers } = getAuthDetails();

        const url =
            `${API_URL}/lesson/finish?userId=${encodeURIComponent(user.userId)}` +
            `&courseId=${encodeURIComponent(courseId)}`;

        console.log("POST Finish Lesson Request:", url);

        const response = await fetch(url, {
            method: "POST",
            headers
        });

        const data = await handleResponse(response);

        console.log("Lesson Completed Successfully:", data);

        return data;

    } catch (error) {

        console.error("POST Finish Lesson Error:", error);

        throw error;
    }
};


// ==========================================
// GET LOGGED-IN STUDENT
// ==========================================

export const getOverviewStudent = () => {

    try {

        return JSON.parse(localStorage.getItem("user") || "null");

    } catch (error) {

        console.error("Student Details Error:", error);

        return null;
    }
};