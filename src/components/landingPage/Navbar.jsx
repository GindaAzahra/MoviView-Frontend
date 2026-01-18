import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getAccessToken, getUserLogged, logoutUser } from '../../api';

export default function Navbar() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = getAccessToken();
            if (token) {
                const { error, data } = await getUserLogged();
                if (!error) {
                    setUser(data);                  
                }
            }
        };
        fetchUser();
    }, []);

    const logout = async () => {
       const { error, data } = await logoutUser();
                if (!error) {
                    setUser(null);                  
                }
                 toast.success("Logout berhasil!");
        window.location.reload(); 
        
    };

    return (
        <header className="navbar navbar-expand-md sticky-top py-3">
            <div className="container-xl">
                <div className="d-flex align-items-center gap-5">
                    {/* Logo */}
                    <Link className="navbar-brand d-flex align-items-center gap-2 text-primary-custom" to="/">
                        <div style={{ width: '32px', height: '32px' }}>
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fillRule="evenodd" />
                            </svg>
                        </div>
                        <span className="h4 mb-0 fw-black text-uppercase fw-bold" style={{ letterSpacing: '-1px' }}>MoviView</span>
                    </Link>

                    {/* Nav Links (Desktop) */}
                    <div className="d-none d-md-flex align-items-center gap-4">
                        <Link className="nav-link active" to="/">Home</Link>
                        <Link className="nav-link" to="/movies">Movies</Link>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3 ms-auto">
                    {user ? (
                         <div className="dropdown">
                            <button className="btn btn-primary-custom rounded-3 px-4 py-2 text-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.name}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">
                                <li><button className="dropdown-item text-white hover-primary" onClick={logout}>Logout</button></li>
                            </ul>
                            <ul className="dropdown-menu dropdown-menu-end bg-dark border-secondary">
                                <li><button className="dropdown-item text-white hover-primary" >Profile</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary-custom rounded-3 px-4 py-2 text-sm">Login</Link>
                    )}
                </div>
            </div>
        </header>
    );
}
