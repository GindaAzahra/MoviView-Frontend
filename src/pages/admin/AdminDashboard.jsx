import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';

export default function AdminDashboard({ children, title }) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const content = children ?? '';

    return (
        <div className="d-flex bg-admin-dark min-vh-100 font-sans text-white position-relative overflow-hidden">
            {/* Overlay for mobile */}
            <div 
                className={`admin-sidebar-overlay ${isSidebarOpen ? 'show' : ''}`} 
                onClick={() => setSidebarOpen(false)}
            ></div>

            <AdminSidebar isOpen={isSidebarOpen} />
            
            <div className="admin-content-wrapper d-flex flex-column flex-grow-1 min-vh-100">
                <AdminNavbar title={title} onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <main className="p-3 p-md-4 flex-grow-1">
                    <div className="container-fluid p-0">
                        {content}
                    </div>

                    {/* Footer */}
                    <div className="mt-5 text-center text-white-50 small pb-3">
                         <p className="mb-0">&copy; Copyright by 23552011281_Ginda Azahra_TIF RP 23 CNS B_UASWEB1</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
