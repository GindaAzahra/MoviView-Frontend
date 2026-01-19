import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAccessToken, getUserLogged } from '../api';

const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const token = getAccessToken();

    useEffect(() => {
        const checkAuth = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const { error, data } = await getUserLogged();
                if (!error && data.is_admin === 1) {
                    setIsAdmin(true);
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

    if (!token || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
