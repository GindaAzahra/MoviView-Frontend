export default function AdminNavbar({ title }) {
    return (
        <nav className="navbar navbar-expand-lg admin-navbar sticky-top px-4" style={{ height: '64px' }}>
            <div className="container-fluid p-0">
                <div className="d-flex w-100 justify-content-between align-items-center">
                    <div className="d-flex align-items-center flex-grow-1 gap-4">
                        <h4 className="mb-0 fw-bold text-white">{title ?? 'Admin Dashboard'}</h4>

                    </div>

                </div>
            </div>
        </nav>
    );
}
