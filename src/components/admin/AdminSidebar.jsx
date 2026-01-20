import { Link, useLocation } from 'react-router-dom';
import { getAccessToken, getUserLogged, logoutUser } from '../../api';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminSidebar({ isOpen }) {
  const [user, setUser] = useState(null);
  const location = useLocation();

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
      window.location.href = '/';
  };

  const isActive = (to) => location.pathname === to;

  return (
    <aside className={`admin-sidebar-container d-flex flex-column flex-shrink-0 p-3 bg-dark text-white border-end ${isOpen ? 'show' : ''}`}>
      <Link to="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none gap-2">
        <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
          <span className="material-symbols-outlined">movie</span>
        </div>
        <div className="d-flex flex-column">
          <span className="fs-5 fw-bold">MoviView</span>
          <span className="text-white-50 text-uppercase" style={{ fontSize: '0.75rem' }}>Admin Panel</span>
        </div>
      </Link>
      <hr className="text-white-50" />
      <ul className="nav nav-pills flex-column gap-3 mb-auto">
        <li className="nav-item">
          <Link
            to="/movie-reviews"
            className={`nav-link d-flex align-items-center gap-2 ${isActive('/movie-reviews') ? 'active' : ''}`}
            aria-current={isActive('/movie-reviews') ? 'page' : undefined}
          >
            <span className="material-symbols-outlined">reviews</span>
            Movie Reviews
          </Link>
        </li>
      </ul>
      <hr className="text-white-50" />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center link-light text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
          <div className="bg-primary-custom bg-opacity-20 text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-2" style={{ width: '32px', height: '32px' }}>
            {user?.name?.substring(0, 1).toUpperCase() || 'A'}
          </div>
          <strong className="text-truncate" style={{ maxWidth: '150px' }}>{user?.name ?? 'Admin'}</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser2">
          <li><button className="dropdown-item text-white hover-primary" onClick={logout}>Logout</button></li>
        </ul>
      </div>
    </aside>
  );
}
