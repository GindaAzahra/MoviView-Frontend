import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getUserLogged } from '../api';

const ProtectedRoute = ({ children, adminOnly = true }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const token = getAccessToken();

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const { error, data } = await getUserLogged();
                if (!error) {
                    setUser(data);
                }
            } catch (err) {
                console.error("Auth check failed", err);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [token]);

    if (isLoading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
                <div className="spinner-border text-primary-custom" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Role-based filtering
    if (adminOnly && user?.is_admin !== 1) {
        // Non-admin trying to access admin pages -> redirect to home
        return <Navigate to="/" replace />;
    }

    if (!adminOnly && user?.is_admin === 1) {
        // Admin trying to access user pages (profile, movies, etc) -> redirect to admin dashboard
        return <Navigate to="/movie-reviews" replace />;
    }

    return children;
};

export default ProtectedRoute;
