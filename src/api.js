const BASE_URL = "/api";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";

function getAccessToken() {
    return localStorage.getItem("accessTokenMoviView");
}

function putAccessToken(accessToken) {
    return localStorage.setItem("accessTokenMoviView", accessToken);
}

function removeAccessToken() {
    return localStorage.removeItem("accessTokenMoviView");
}

async function register({name, email, password, password_confirmation}) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password,
            password_confirmation

        }),
    });
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
        return {error: true, message: responseJson.message};
    }
    return responseJson;
}

async function login({email, password}) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });


    const responseJson = await response.json();
    if (responseJson.status !== "success") {
        return {error: true, data: null, message: responseJson.message};
    }
    return {error: false, data: responseJson.data};
}

async function getUserLogged() {
    const response = await fetch(`${BASE_URL}/user`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, data: null};
    }

    return {error: false, data: responseJson.data};
}

async function logoutUser() {
    const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, data: null};
    }

    removeAccessToken();
    return {error: false, data: responseJson.data};
}


async function getAllMovies(type, numberPage) {
    const response = await fetch(`${BASE_URL}/movies/${type}?page=${numberPage}`, {});
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
        return {error: true, data: null};
    }

    console.log(responseJson);
    return {
        error: false,
        data: responseJson.data,
        total_pages: responseJson.total_pages,
        current_page: responseJson.current_page
    };
}


async function getMovieById(id) {
    const response = await fetch(`${BASE_URL}/movie/${id}`);
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
        return {error: true, data: null};
    }
    return {error: false, data: responseJson.data};
}


async function submitReview({id_movie, rating, review}) {
    const response = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
            id_movie,
            rating,
            review,
        }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, message: responseJson.message};
    }

    return {error: false, data: responseJson.data};
}


async function getReviewsByMovieId(movieId) {
    const response = await fetch(`${BASE_URL}/reviews/movie/${movieId}`);
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, data: []};
    }

    return {error: false, data: responseJson.data};
}


async function updateReview({id, id_movie, rating, review}) {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${getAccessToken()}`,
        },
        body: JSON.stringify({
            id_movie,
            rating,
            review,
        }),
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, message: responseJson.message};
    }

    return {error: false, data: responseJson.data};
}

async function deleteReview(id) {
    const response = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, message: responseJson.message};
    }

    return {error: false, data: responseJson.data};
}

async function getMyReviews() {
    const response = await fetch(`${BASE_URL}/my-reviews`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, data: []};
    }

    return {error: false, data: responseJson.data};
}

async function searchMovies(query) {
    const response = await fetch(`${BASE_URL}/movies/search?q=${query}`);
    const responseJson = await response.json();
    if (responseJson.status !== "success") {
        return {error: true, data: null};
    }

    return {error: false, data: responseJson.data};
}

async function getAllReviews(page = 1) {
    const response = await fetch(`${BASE_URL}/reviews?page=${page}`, {
        headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            Accept: "application/json",
        },
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
        return {error: true, data: null, message: responseJson.message};
    }

    return {
        error: false,
        data: {
            data: responseJson.data ?? [],
            meta: responseJson.meta ?? null,
        },
    };
}

function getFilenameFromContentDisposition(contentDisposition, fallback) {
    if (!contentDisposition) return fallback;

    // handles: attachment; filename="file.xlsx"
    const match = /filename\*?=(?:UTF-8'')?("?)([^";]+)\1/i.exec(contentDisposition);
    if (!match) return fallback;

    try {
        return decodeURIComponent(match[2]);
    } catch {
        return match[2];
    }
}

async function exportReviews(type, movieIds = []) {
    const normalizedType = String(type || "").toLowerCase();
    if (normalizedType !== "excel" && normalizedType !== "pdf") {
        return {error: true, data: null, message: "Invalid export type."};
    }

    const qs = new URLSearchParams();
    // optional filter: ?id_movie=1&id_movie=2 ...
    if (movieIds?.length) movieIds.forEach((id) => qs.append("id_movie", String(id)));

    const response = await fetch(
        `${BASE_URL}/reviews/export/${normalizedType}${qs.toString() ? `?${qs.toString()}` : ""}`,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                Accept: "application/octet-stream",
            },
        }
    );

    if (!response.ok) {
        // Laravel will typically send JSON on error
        let message = "Failed to export reviews.";
        try {
            const j = await response.json();
            message = j?.message || message;
        } catch {
            // ignore
        }
        return {error: true, data: null, message};
    }

    const blob = await response.blob();
    const suggested =
        normalizedType === "excel" ? "reviews.xlsx" : "reviews.pdf";
    const filename = getFilenameFromContentDisposition(
        response.headers.get("content-disposition"),
        suggested
    );

    return {error: false, data: {blob, filename}};
}

async function exportReviewsExcel(movieIds = []) {
    return exportReviews("excel", movieIds);
}

async function exportReviewsPdf(movieIds = []) {
    return exportReviews("pdf", movieIds);
}

export {
    BASE_URL,
    TMDB_IMG,
    getAccessToken,
    putAccessToken,
    removeAccessToken,
    register,
    login,
    getUserLogged,
    logoutUser,
    getAllMovies,
    getMovieById,
    submitReview,
    getReviewsByMovieId,
    updateReview,
    deleteReview,
    searchMovies,
    getMyReviews,
    getAllReviews,
    exportReviewsExcel,
    exportReviewsPdf,
};
