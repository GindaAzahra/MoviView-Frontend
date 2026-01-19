import { Link, useLocation } from 'react-router-dom';
import { getAccessToken, getUserLogged, logoutUser } from '../../api';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function AdminSidebar() {
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
      window.location.reload();

  };

  const isActive = (to) => location.pathname === to;

  return (
    <aside className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-white border-end" style={{ width: '280px', height: '100vh', position: 'fixed' }}>
      <Link to="/admin" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-light text-decoration-none gap-2">
        <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
          <span className="material-symbols-outlined">movie</span>
        </div>
        <div className="d-flex flex-column">
          <span className="fs-5 fw-bold">Cine Hall</span>
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
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2hFyg_KrBsJPElmfWpjBC3O3wYJtwvOtnURkuQKP7RCVqTaUcSczfBRhM2EHdyQURrnrP8D1jKaQInpuBVjRJ28hkoEUac3dGmSKrNUZ3sXMzyoqh18NRsscpSlsTAdR0CBJNGPtcVYeKxl_ucZNA8lkC7rN7_MH06afVTHYMCtjpMJVRkfAJKdaa88A6YC2NyoUmNYn63Vk-U2qFH9zies8EHGL7FPMqCqwGieW3_eUCFwZOPSCxm3XRgBAHa7ATaiWQViuWwTY" alt="" width="32" height="32" className="rounded-circle me-2" />
          <strong>{user?.name ?? 'Admin'}</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser2">
          <li><hr className="dropdown-divider" /></li>

          <li><button className="dropdown-item text-white hover-primary" onClick={logout}>Logout</button></li>
        </ul>
      </div>
    </aside>
  );
}
