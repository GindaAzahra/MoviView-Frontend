const BASE_URL = "http://localhost:8000/api";
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

async function register({name, email, password, password_confirmation }) {
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
    return { error: true, message: responseJson.message };
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
    return { error: true, data: null, message: responseJson.message };
  }
  return { error: false, data: responseJson.data };
}

async function getUserLogged() {
  const response = await fetch(`${BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
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
    return { error: true, data: null };
  }

  removeAccessToken();
  return { error: false, data: responseJson.data };
}


async function getAllMovies(type, numberPage) {
  const response = await fetch(`${BASE_URL}/movies/${type}?page=${numberPage}`, {
  });
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

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
      return { error: true, data: null };
    }
    return { error: false, data: responseJson.data };
  }


async function submitReview({ id_movie, rating, review }) {
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
    return { error: true, message: responseJson.message };
  }
  
  return { error: false, data: responseJson.data };
}


async function getReviewsByMovieId(movieId) {
  const response = await fetch(`${BASE_URL}/reviews/movie/${movieId}`);
  const responseJson = await response.json();
  
  if (responseJson.status !== "success") {
    return { error: true, data: [] };
  }
  
  return { error: false, data: responseJson.data };
}


async function updateReview({ id, id_movie, rating, review }) {
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
    return { error: true, message: responseJson.message };
  }
  
  return { error: false, data: responseJson.data };
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
    return { error: true, message: responseJson.message };
  }
  
  return { error: false, data: responseJson.data };
}

async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/movies/search?q=${query}`);
  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

export {
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
 searchMovies
}