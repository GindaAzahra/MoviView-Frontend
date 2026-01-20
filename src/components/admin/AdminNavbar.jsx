export default function AdminNavbar({ title, onToggleSidebar }) {
    return (
        <nav className="navbar navbar-expand-lg admin-navbar sticky-top px-3 px-md-4" style={{ height: '64px' }}>
            <div className="container-fluid p-0">
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <div className="d-flex align-items-center flex-grow-1 gap-2 gap-md-4">
                        {/* Toggle Sidebar Button (Mobile Only) */}
                        <button 
                            className="btn btn-dark d-lg-none p-1 d-flex align-items-center border-white border-opacity-10"
                            onClick={onToggleSidebar}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        
                        <h4 className="mb-0 fw-bold text-white fs-5 fs-md-4">{title ?? 'Dasbor Admin'}</h4>
                    </div>
                </div>
            </div>
        </nav>
    );
}
