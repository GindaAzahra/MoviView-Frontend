import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminNavbar from '../../components/admin/AdminNavbar';
import DashboardTable from '../../components/admin/DashboardTable';

export default function AdminDashboard() {
    return (
        <div className="d-flex bg-admin-dark min-vh-100 font-sans text-white">
            <AdminSidebar />
            <div className="d-flex flex-column flex-grow-1" style={{ marginLeft: '280px' }}>
                <AdminNavbar />
                <main className="p-4">
                    

                    <DashboardTable />
                    
                    {/* Footer */}
                    <div className="mt-5 text-center text-white-50 small">
                         <p className="mb-0">© 2024 Cine Hall Analytics Dashboard. Hak cipta dilindungi undang-undang.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
