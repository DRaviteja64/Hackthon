const AUTH_API_URL = "http://localhost:8080/api/auth";
const OVERVIEW_API_URL = "http://localhost:8080/api/overview";


// ==========================================
// REGISTER USER
// ==========================================

export const registerUser = async (userData) => {

    try {

        const response = await fetch(`${AUTH_API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Registration failed.");
        }

        return data;

    } catch (error) {

        console.error("Registration API Error:", error);
        throw error;
    }
};


// ==========================================
// LOGIN USER
// ==========================================

export const loginUser = async (loginData) => {

    try {

        const response = await fetch(`${AUTH_API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        const data = await response.json();

        console.log("Login Status:", response.status);
        console.log("Login Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Invalid mobile number or password.");
        }

        // Store JWT Token
        if (!data.token) {
            throw new Error("Login successful, but JWT token was not received.");
        }

        localStorage.setItem("token", data.token);

        // Store User Information
        if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
        }

        return data;

    } catch (error) {

        console.error("Login API Error:", error);
        throw error;
    }
};


// ==========================================
// GET AUTHORIZATION HEADERS
// ==========================================

const getAuthHeaders = () => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Authentication required. Please login again.");
    }

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
};


// ==========================================
// GET OVERVIEW DATA
// ==========================================

export const fetchOverviewFromApi = async () => {

    try {

        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!user || !user.userId) {
            throw new Error("Student information not found. Please login again.");
        }

        const response = await fetch(
            `${OVERVIEW_API_URL}?userId=${user.userId}`,
            {
                method: "GET",
                headers: getAuthHeaders()
            }
        );

        const data = await response.json();

        console.log("Overview Status:", response.status);
        console.log("Overview Response:", data);

        if (response.status === 401) {
            throw new Error("Session expired. Please login again.");
        }

        if (response.status === 403) {
            throw new Error("You don't have permission to access this page.");
        }

        if (!response.ok) {
            throw new Error(data.message || "Failed to fetch overview data.");
        }

        return data;

    } catch (error) {

        console.error("Overview API Error:", error);
        throw error;
    }
};


// ==========================================
// FINISH LESSON API
// ==========================================

export const finishLessonApi = async (courseId) => {

    try {

        const user = JSON.parse(localStorage.getItem("user") || "null");

        if (!user || !user.userId) {
            throw new Error("Student information not found.");
        }

        const response = await fetch(
            `${OVERVIEW_API_URL}/lesson/finish?userId=${user.userId}&courseId=${courseId}`,
            {
                method: "POST",
                headers: getAuthHeaders()
            }
        );

        const data = await response.json();

        console.log("Finish Lesson Status:", response.status);
        console.log("Finish Lesson Response:", data);

        if (response.status === 401) {
            throw new Error("Session expired. Please login again.");
        }

        if (!response.ok) {
            throw new Error(data.message || "Unable to finish lesson.");
        }

        return data;

    } catch (error) {

        console.error("Finish Lesson API Error:", error);
        throw error;
    }
};


// ==========================================
// GET LOGGED IN USER
// ==========================================

export const getLoggedInUser = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch {
        return null;
    }
};


// ==========================================
// LOGOUT USER
// ==========================================

export const logoutUser = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.clear();
};